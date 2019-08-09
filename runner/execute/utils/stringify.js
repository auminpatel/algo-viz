const randomString = require('./randomString')
const isNative = require('./isNative')
const checkTypedArray = require('./checkTypedArray')
// the values are specific to the Runner instance
module.exports = function (obj) {
    // these are functions that change instance methods on their respective object tyes
    if (obj && typeof obj === 'object') {
        // we want to ignore native objects


        if (this.map.has(obj)) {
            return this.map.get(obj)
        }


        checkTypedArray(obj)
        const native = isNative(obj)
        if (native) {
            return native
        }
        if (obj instanceof RegExp || obj instanceof String || obj instanceof Date) return obj.toString()
        if (!Array.isArray(obj)) {
            const objString = obj.toString()
            if (objString.includes('Iterator')) {
                const id = this.genId(5, 2)
                this.map.set(obj, id)
                this.types[id] = objString
                return id
            }
        }
        let newId = this.genId(5, 3)
        if (this.constructors.has(obj)) {
            const [flag, id] = this.constructors.get(obj)
            if (!flag) return id
            newId = id
            this.constructors.delete(obj)
        }
        this.map.set(obj, newId)
        if (obj instanceof Map) {
            // maps can have object keys, we need to stringify those too.

            // Map & Set virtualization needs a refactor
            const copy = {}
            for (const entry of obj.entries()) {
                const [key, val] = entry
                let newKey = key
                if (key && typeof key === 'object' && !(key instanceof RegExp || key instanceof String)) {
                    newKey = this.stringify(key)
                }
                let newVal = this.stringify(val)
                copy[newKey] = newVal
            }
            this.reassignMapMethods(obj)
            this.objects[newId] = copy
        } else if (obj instanceof Set) {
            // same for sets
            const copy = {}
            for (let value of obj.values()) {
                if (value && typeof value === 'object' && !(value instanceof RegExp || value instanceof String)) {
                    value = this.stringify(value)
                }
                copy[value] = value
            }
            this.reassignSetMethods(obj)
            this.objects[newId] = copy
        } else if (Array.isArray(obj)) {
            // we store arrays as hashes, they will be easier to modify when the visualizer consumes the data
            const copy = {}
            for (let i = 0; i < obj.length; i++) {
                let val = obj[i]

                copy[i] = !(i in obj) ? null : this.stringify(val)
                if (i in obj) {
                    obj[i] = this.virtualize(val)
                }
            }
            copy.length = obj.length
            this.objects[newId] = copy
        } else {
            const copy = {}
            for (const key in obj) {
                if (key[0] === '_') continue;
                copy[key] = this.stringify(obj[key])
                obj[key] = this.virtualize(obj[key])
            }
            this.objects[newId] = copy
        }
        let type = obj.constructor.name
        if (this.Viz && this.Viz[type] && this.Viz[type] === obj.constructor) type = 'Viz.' + type
        this.types[newId] = type
        return newId
    } else {
        // these falsy primitives must be encoded because they all become `null` in JSON
        if (obj === undefined) {
            return this.map.get('undefined')
        } else if (obj === null) {
            return this.map.get('null')
        } else if (Number.isNaN(obj)) {
            return this.map.get('NaN')
        } else if (obj === Infinity) {
            return this.map.get('Infinity')
        } else if (typeof obj === 'function') {
            if (this.map.has(obj)) return this.map.get(obj)
            const native = isNative(obj)
            if (native) return native
            const name = obj.name && obj.name[0] !== '_' ? obj.name : 'function'
            let id;
            while (!id || (id in this.objects)) {
                id = this.genId(5, 2)
            }
            this.types[id] = `[Function: ${name}]`
            this.map.set(obj, id)
            return id
        } else if (typeof obj === 'symbol') {
            return obj.toString()
        }
        return obj
    }
}



