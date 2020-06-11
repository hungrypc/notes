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

## Docstrings
```py
def productOfThree(a, b, c):
    '''
    Info: This function returns product of three
    '''
    return a * b * c

# basically a multiline comment that the IDE will actually show when you use the function

# if you're not sure what a function does, you could do
help(productOfThree)
# or
print(productOfThree.__doc__)
# these 
```

##  *args **kwargs
```py
def super_func(*args, **kwargs):
    kw_total = 0
    for items in kwargs.values():
        total += items
    return sum(args) + total

super_func(1,2,3,4,5, num1=6, num2=10)
# basically like the spread operator
# but *args sorta takes the arguments as a tuple
# and **kwargs sorta takes the arguments like a dict, which is why we loop .values()

# rule: params, *args, default params, **kwargs
```

## Mini Exercise
Function that returns the highest even number in a list

```py
def highest_even(list):
    highest = 0
    for item in list:
        if item % 2 == 0:
            highest = max(highest, item)
    return highest

some_list = [1, 2, 3, 10, 5, 6, 7, 8]

print(highestEven(some_list))
```

## Scope Rules

1. Local
2. Parent
3. Global
4. Python

## global Keyword

```py
total = 0

def count():
    total += 1    # this actually can't use the defined total above
    return total

# we have to tell the function that we're using a global variable

def count():
    global total
    total += 1
    return total

# now, this function can use total

# however, a "better" way to do this is something called dependency injection

total = 0

def count(total):
    total += 1
    return total

count(count(count(total)))   # 3

# i dont think this is a better way tbh
```

## nonlocal Keyword
nonlocal is used to refer to a parent local

```py
def outer():
    x = "local"
    def inner():
        nonlocal x      # saying look at the parent and use the local var x
        x = "nonlocal"
        print("innder:", x)

    inner()
    print("outer:", x)

outer()
# returns inner: "nonlocal", outer: "nonlocal"

# because they're using the same variable rather than creating a new var per scope
```
