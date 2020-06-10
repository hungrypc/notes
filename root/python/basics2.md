# Basics II

## Conditional Logic
```py
is_old = False
is_licensed = True

if is_old and is_licensed:
    print('you old bitch, u still drivin??')
elif is_licensed:
    print('you aint old but u can drive')
else:
    print('yung buck')
print('end')

some_list = [1, 2, 3]
if 4 not in some_list
    print('aint in here chief')
```

## Ternary Operator
```py
is_true = True 
message = 'is true' if is_true else 'is false'
print(message)
```

## Logical Operators
```py
5 > 1
5 >= 1
5 < 1
5 <= 1
True and False
True or False
'hello' == 'hello'
'hello' != 'hello'

# is
True is True    # True
'1' is '1'      # True
[1, 2, 3] is [1, 2, 3]   # False, theyre actually two lists stored at diff locations
some_variable = [1, 2, 3]
new_variable = some_variable
some variable is new_variable   # True, they both point to the same memory location
```

## For Loops
```py
some_list = [1, 2, 3, 4, 5]

for item in some_list
    print(item)

some_object = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False 
}

for item in user.items()
    print(item)     # prints tuples

for item in user.values()
    print(item)     # prints values

for item in user.keys()
    print(item)     # print keys

for key, value in user.items()
    print(key, value) # prints key and value
```

## range()
```py
for number in range(10)
    print(number)

for number in range(5, 20)
    print(number)

# same thing, range(start, stop, step)
```

## enumerate()
This takes an interable and gives an index counter with the item at that index.

```py
for i, char in enumerate('HELLO')
    print(i, char)
```

## While Loops
```py
i = 0
while i < 50
    print(i)
    i += 1
else:
    print('done')
```

## Functions
```py
def say_hello(name):
    print(f'hello, {name}')

def emoji_function(emoji='🐬')    # default parameters
    print(emoji)

# keyword parameters
def hello_world(hello, world)
    print(hello, world)

hello_world(world='ok', hello='fine') # 'fine ok'
```


































