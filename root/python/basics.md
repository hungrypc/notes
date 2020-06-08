# Python Basics

## Python Data Types
Fundamental Data Types
- int: Integer
- float: Float
- bool: Boolean
- str: String
- list: Series of values (like an array)
- tuple: Group of values 
    + fixed in size once they are assigned
    + eg ('Apple', 'Orange', 'Melon')
- set: Unordered collection
- dict: Lists of KEY:VALUE pairs (like an object)

Specialized Data Types: special packages and modules that we can use from libraries

None: null

## Numbers
```py
2 ** 2      # 2^2
10 / 3      # 3.333...
10 // 3     # 3 (basically Math.floor(10/3))
5 % 1       # 1 (remainder)
# etc
```
Everything else works as we expect it to.

### Math Functions
```py
round(3.1)  # round(number, ndigit): rounding the number
abs(-5)     # absolute value
# there's a ton
```
[Math functions as of Python 3.8](https://docs.python.org/3/library/math.html)

## Variables
```py
iq = 190
genius = true
who = 'me'
```

## Expressions vs Statements
> Expression: a piece of code that produces a value
> Statement: an entire line of code that performs some sort of action

## Strings
```py
name = 'Phil'
long_string = '''
Wow
multi
line
'''
# long_string actually also gets printed in multiple lines
```

## Type Conversion
```py
str(100)    # '100'
int('100')  # 100
```

## Formatted Strings
```py
name = 'Phil'
age = 26

print(f'hi {name}. You are {age} years old')                # Python 3
print('hi {0}. You are {1} years old'.format(name, age))    # Python 2
```

## String Indexes
```py
numbers = '01234567'

print(numbers[3])       # '3'
print(numbers[2:5])     # [start:stop] '234'
print(numbers[0:8:2])   # [start:stop:step] '0246'
print(numbers[1:])      # '1234567'
print(numbers[:5])      # '01234'
print(numbers[::3])     # '036'
print(numbers[-1])      # '7'
```






































