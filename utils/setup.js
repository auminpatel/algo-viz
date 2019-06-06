const TYPES = require('./types')

const {
    concat,
    copyWithin,
    entries,
    every,
    fill,
    filter,
    find,
    findIndex,
    forEach,
    includes,
    indexOf,
    join,
    keys,
    lastIndexOf,
    map,
    pop,
    push,
    reduce,
    reduceRight,
    reverse,
    shift,
    slice,
    some,
    sort,
    splice,
    unshift,
    values,
} = Array.prototype

module.exports = {
    setup: function (_name) {
        if (!global[_name]) {
            global[_name] = {
                __(val) {
                    return val
                }
            }
        }
        let allow = true
        const { __: _inspector, map: objMap } = global[_name]
        const __ = (...args) => allow ? _inspector.call(global[_name], ...args) : args[0]
        const __concat = function (..._args) {
            return __(concat.call(this, ..._args), {
                type: TYPES.ACTION,
                method: 'concat',
                object: this,
                arguments: [..._args]
            })
        }
        const __copyWithin = function (..._args) {
            return __(copyWithin.call(this, ..._args), {
                type: TYPES.ACTION,
                method: 'copyWithin',
                object: this,
                arguments: [..._args]
            })

        };
        const __every = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return every.call(this, ..._args)
        }
        const __findIndex = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return findIndex.call(this, ..._args)
        }
        const __fill = function (..._args) {
            return __(fill.call(this, ..._args), {
                type: TYPES.ACTION,
                method: 'fill',
                object: this,
                arguments: [..._args]
            })
        };
        const __find = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return find.call(this, ..._args)
        }
        const __forEach = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return forEach.call(this, ..._args)
        }
        const __includes = function (valueToFind, fromIndex) {
            // MDN
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            let o = Object(this);

            let len = o.length >>> 0;

            if (len === 0) {
                return false;
            }

            let n = fromIndex | 0;


            let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            let found = false

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            while (k < len) {
                if (sameValueZero(o[k], valueToFind)) {
                    found = true;
                }
                __(null, {
                    type: TYPES.ITERATE,
                    scope: null,
                    object: this,
                    access: [k],
                    result: found
                })
                if (found) break;
                k++;
            }


            return found;

        };
        const __filter = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return filter.call(this, ..._args)
        }
        const __indexOf = function (searchElement, fromIndex) {
            // MDN
            let k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            let o = Object(this);
            let len = o.length >>> 0;

            if (len === 0) {
                return -1;
            }

            let n = fromIndex | 0;


            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            let result = false
            while (k < len) {

                if (k in o && o[k] === searchElement) {
                    result = true
                }
                __(null, {
                    type: TYPES.ITERATE,
                    scope: null,
                    object: this,
                    access: [k],
                    result
                })
                if (result) break;
                k++;
            }

            return k === len ? -1 : k;
        };
        const __lastIndexOf = function (searchElement /*, fromIndex*/) {
            //MDN
            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            let n, k,
                t = Object(this),
                len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }

            n = len - 1;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0;
                }
                else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            let result = false
            for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
                if (k in t && t[k] === searchElement) {
                    result = true
                }
                __(null, {
                    type: TYPES.ITERATE,
                    scope: null,
                    object: this,
                    access: [k],
                    result
                })
                if (result) break
            }
            return -1;
        };
        const __reverse = function () {
            return __(reverse.call(this), {
                type: TYPES.ACTION,
                method: 'reverse',
                object: this,
                arguments: []
            })
        }
        const __map = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return map.call(this, ..._args)
        }
        const __reduce = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (el, i, ...args) => {
                    const result = cb.call(_args[1] || null, el, i, ...args)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }

            return reduce.call(this, ..._args)
        }
        const __reduceRight = function (..._args) {
            if (_args[0]) {
                const [cb] = _args
                _args[0] = (a, el, i, arr) => {
                    const result = cb.call(_args[1] || null, a, el, i, arr)
                    __(null, {
                        type: TYPES.ITERATE,
                        scope: null,
                        object: this,
                        access: [i],
                        result
                    })
                    return result
                }
            }
            return reduceRight.call(this, ..._args)
        }
        Array.prototype.concat = __concat
        Array.prototype.copyWithin = __copyWithin
        Array.prototype.every = __every
        Array.prototype.fill = __fill
        Array.prototype.filter = __filter
        Array.prototype.find = __find
        Array.prototype.findIndex = __findIndex
        Array.prototype.forEach = __forEach
        Array.prototype.includes = __includes
        Array.prototype.indexOf = __indexOf
        Array.prototype.lastIndexOf = __lastIndexOf
        Array.prototype.map = __map
        Array.prototype.reduce = __reduce
        Array.prototype.reduceRight = __reduceRight
        Array.prototype.reverse = __reverse


        return bool => allow = bool
    },
    reset: function () {
        Array.prototype.copyWithin = copyWithin
        Array.prototype.every = every
        Array.prototype.fill = fill
        Array.prototype.filter = filter
        Array.prototype.find = find
        Array.prototype.findIndex = findIndex
        Array.prototype.forEach = forEach
        Array.prototype.includes = includes
        Array.prototype.indexOf = indexOf
        Array.prototype.lastIndexOf = lastIndexOf
        Array.prototype.map = map
        Array.prototype.reduce = reduce
        Array.prototype.reduceRight = reduceRight
        Array.prototype.reverse = reverse
    }
}


function toInteger(arg) {
    let n = Number(arg);
    if (n === Infinity || n === -Infinity) {
        return n;
    }
    return n | 0;
}