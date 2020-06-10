# Python Basics I

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

## List Unpacking
```py
a, b, c, *other, d = [1, 2, 3, 4, 5, 6, 7, 8]
print(a)        # 1
print(b)        # 2
print(c)        # 3
print(other)    # [4, 5, 6, 7]
print(d)        # 8
```

## Dictionaries
Objects/hash table/hash map.

```py
dictionary = {
    'a': 1,
    'b': 2,
    555: True
}
print(dictionary['b'])  # 2
print(dictionary[555])  # True
```

## Dictionary Methods
```py
user = {
    'name': 'Phil',
    'age': 26
}

user.get('age')        # 26 (note: user.get(key, default_value))
# if key doesn't exist, usually returns None
# different to something like user['missing_key'] which causes an error
'name' in user          # True
'name' in user.keys()   # True
'Phil' in user.values() # True
user.items()    # returns a list of tuples [('name', 'Phil'), ('age', 26)]
user.pop('age') # removes and returns value
user.popitem()  # random pop(), returns tuple
user.update({'name': 'John'})  # updates 'name' to 'John'
user.clear()    # clears object
user2 = user.copy()

user3 = dict(name = 'Jill')
# user3 = {'name': 'Jill'}
```

## Tuples
> Like lists, but we cannot modify them (immutable)

```py
my_tuple = (1, 2, 3, 4, 5)
# just like a list, we can use a lot of the same methods other than modifying ones

new_tuple = my_tuple[1:2]
print(new_tuple)    # (2,)

new_tuple = my_tuple[1:4]
print(new_tuple)    # (2, 3, 4)

x,y,z, *other = (1, 2, 3, 4, 5)
# same stuff as lists

# you can actually use tuples as keys in dicts
user = {
    (1, 2): [1, 2, 3]
} 

# methods
my_tuple = (1, 2, 3, 4, 4, 5, 5, 5)
my_tuple.count(4)   # counts number of occurance (2)
my_tuple.index(5)   # index of first occurance (5)     
len(my_tuple )
```
Why tuples? Makes things easier and safer, signals that we want the tuple to stay consistent because they're less flexible.

## Sets
Unordered collections of unique elements.

```py
my_set = {1, 2, 3, 4, 5}
my_set.add(100)

my_list = [1, 2, 2, 3, 4, 5, 5]
set(my_list)    # {1, 2, 3, 4, 5}

# set objects don't support indexing
1 in my_set    
len(my_set)
new_set = my_set.copy()
my_set.clear()

# methods
my_set = {1, 2, 3, 4, 5}
new_set = {4, 5, 6, 7, 8}

my_set.difference(new_set)      # returns {1, 2 ,3} (new_set doesn't have 1, 2, 3)
my_set.discard(5)                  # my_set = {1, 2, 3, 4} (discards 5)
my_set.difference_update(new_set)  # my_set = {1, 2, 3} (remove similarities)
my_set.intersection(new_set)       # returns {4, 5}
# my_set & new_set does the same as intersection
my_set.isdisjoint(new_set)         # returns False (intersect ? False : True)
my_set.union(new_set)              # returns {1, 2, 3, 4, 5, 6, 7, 8}
# my_set | new_set does the same as union

my_set = {4, 5}
new_set = {2, 3, 4, 5, 6}
my_set.issubset(new_set)           # True
new_set.issuperset(my_set)         # True
```