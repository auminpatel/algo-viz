from transpile import transform
from astunparse import unparse
from proxy_types import TYPES

funcs = {
    'friends': '''
class Solution:
    def findCircleNum(self, M) -> int:
        N = len(M)
        union = {n:n for n in range(N)}
        self.circles = N

        def merge(x,y):
            a,b = find(x), find(y)

            if a != b:
                union[a] = b
                self.circles -= 1

        def find(x):
            if union[x] != x:
                union[x] = find(union[x])
            return union[x]

        for i in range(N):
            for j in range(N):
                if M[i][j] == 1:
                    merge(i,j)

        return self.circles

Solution().findCircleNum([[1,1],[1,1]])


    ''',


    'loop': '''

for a,b, (c,d) in [[1,2, [3,4]]]:
    a + b + c + d


    ''',
    'assignments': '''

def g():
    a = 1
    b = 6

    a = b = 10

    (a,b,(c,d)) = [1,2,[3,4]]


g()
''',
    'func': '''
class K:
    def func(self,a,b,c=5,*d):
        self = 5
        return self
K().func(1,2,3,4,5,6)
''',
    'class': '''
class S:
    z = 1
    def __init__(self):
        1 + 1
''',
    'generator': '''
(a): int = 1

a += 1+1
# b = f"sin({a})"
''',
    'lambda': '''

a = lambda x,y,*z : x + y + sum(z)

a(1,2,3,4,5,6,7,8,9,10)
''',
    'DNA': '''

def findRepeatedDnaSequences(s: str):
        seen = {}
        output = []
        for i in range(len(s) - 9):
            
            seq = s[i:i+10]
            if seq in seen and seen[seq] == 1:
                output.append(seq)
                seen[seq] += 1
            elif seq not in seen:
                seen[seq] = 1
         
            
        return output
findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT")
'''
}


for name, code in funcs.items():

    try:
        tree = transform(code)
        transpiled = unparse(tree)

        open('transpiled.py', "w+").write(transpiled)

        def _WRAPPER(val, info):
            assert hasattr(TYPES, info['type'])
            if info['type'] == TYPES.PROGRAM:
                assert info['scope'] == (None, 0)
            else:
                inst = isinstance(info['scope'], tuple)
                l = len(info['scope']) == 3
                assert inst and l

            if info['type'] == TYPES.DECLARATION:
                assert isinstance(info['block'], bool)
                assert info['block'] == False
            if info['type'] == TYPES.ASSIGNMENT:
                assert isinstance(info['name'], tuple)
                assert isinstance(info['varName'], str)
            if info['type'] in [TYPES.FUNC, TYPES.RETURN]:
                assert isinstance(info['funcName'], str)
                assert isinstance(info['funcID'], str)

            # start, end = info.get('name', (0, 0))

            # print(info['type'], ':', code[start:end] or info.get('funcName'))
            # print('>>>', val)
            return val

        exec(transpiled)
        print(f"✔ {name}")
    except Exception as e:
        print(f"✖ {name} -> {e}")
