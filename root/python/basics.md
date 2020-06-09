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

## Built-in Functions and Methods
There's a ton, but here's a few to remember:

```py
quote = 'abcdefg'
len(quote)              # length (7)
quote.upper()           # upper case ('ABCDEFG')
quote.capitalize()      # capitalize ('Abcdefg')
quote.find('c')         # find first occurance (2)
quote.replace('c', 'i') # replace all occurances ('abidefg')

# note: strings are immutable
```

## Boolean
```py
am_i_cool = False
am_i_boring = True

bool(1)     # True
bool(0)     # False
```

## Input and Type Conversion
```py
birth_year = input('what year were you born?')

age = 2020 - birth_year

print(f'your age is {age}')
# this little program would cause an error
# thats because input() stores birth_year as a str
# SO

birth_year = input('what year were you born?')

age = 2020 - int(birth_year)

print(f'your age is {age}')
```

## Exercise: Password Checker
```py
username = input('Enter username')
password = input('Enter password')
password_length = len(password)
hidden = '*' * password_length

print(f"Hey {username}, your password {hidden}' is {password_length} chars long")
```

## Lists
Behaves as you expect tbh, pretty much arrays. Index, slice, all that jazz EXCEPT:
```py
amazon_cart = ['notebook', 'pen', 'highlighter']

new_cart = amazon_cart
new_cart[0] = 'gum'
print(new_cart)     # ['gum', 'pen', 'highlighter']
print(amazon_cart)  # ['gum', 'pen', 'highlighter']

# these are pointers, new_cart = amazon_cart means: 
# new_cart points to whatevers in the memory that amazon_cart points to

# new_cart is NOT a copy! to copy a list, we do this:
new_cart = amazon_cart[:]
```

## Matrix
A matrix is a way to describe multi-dimensional lists.

```py
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
# follow the white rabbit 🐇
```

## List Methods

```py
basket = [1, 2, 3, 4, 5]

len(basket)             # length (5)
basket.append(6)        # push() ([1, 2, 3, 4, 5, 6])
basket.insert(3, 100)   # [1, 2, 3, 100, 5]
basket.extend([6, 7])   # [1, 2, 3, 4, 5, 6, 7]
basket.pop()            # [1, 2, 3, 4]
basket.remove(3)        # [1, 2, 3, 5]
basket.clear()          # []

basket = ['a', 'b', 'c', 'd', 'e']
basket.index('b')       # indexOf() (1)
basket.index('d', 0, 4) # indexOf(el, start, stop)
basket.count('d')       # 1
print('d' in basket)    # True

basket = [4, 2, 3, 5, 1]
basket.sort()           # [1, 2, 3, 4, 5]
sorted(basket)          # same as sort except it returns a sorted array (copy)
                        # whereas, basket.sort() returns None but still sorts the array
new_basket = basket.copy()
basket.reverse()        # [1, 5, 3, 2, 4]
basket[::-1]            # same as reverse but returns a copy

list(range(1, 5))       # returns [1, 2, 3, 4]
```

## Some List Patterns

```py
sentence = '!'
new_sentence = sentence.join(['hi', 'there', 'friend'])
# new_sentence = 'hi!there!friend'
```










































