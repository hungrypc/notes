## Introduction to Ruby
```cli
<!-- run a ruby file -->
ruby main.rb

<!-- opens interactive ruby -->
irb
```
```rb
## printing strings to the console:

puts 'Hello world'
# returns nil

p 'Hello world'
# returns 'Hello world'

print 'Hello world'
# returns nil as well but doesnt output on a new line

def say_hello(thing)
  puts thing
end
# defining a simple method

say_hello 'hello'
# calling the method

'hello'.class   # returns String
10.class        # returns Integer
10.0.class      # returns Float
```

### Strings
```rb
## basic string work

# string concat
first_name = 'Phil'
last_name = 'Chan'

puts first_name + ' ' + last_name

# string interpolation
puts "My first name is #{first_name} and my last name is #{last_name}"

full_name = "#{first_name}  #{last_name}"
# note: this does NOT work with single quotes ''

10.to_s
# converts to string, returns '10'

full_name.length
full_name.reverse
full_name.capitalize  # returns Phil chan
full_name.empty?      # returns false
"".nil?               # returns false

sentence = 'welcome to the jungle'
sentence.sub('the jungle', 'utopia')
# replaces 'the jungle' with 'utopia'
# 'welcome to utopia'
```

### Getting Input from the User
```rb
puts "What is your first name?"
first_name = gets.chomp
puts "Your response was #{first_name}"
# gets.chomp takes user's input on terminal
# note: inputs are by default strings
```

### Numbers
```rb
# they mainly work the same as most languages, BUT

10 / 4        # returns 2 (ruby rounds down)
10.0 / 4      # 2.5
10 / 4.to_f   # 2.5 (converts 4 to float)
(10 / 4).to_f # 2.0 (brackets are evaluated first)

"5" * "5"     # error, cant multiply two strings
"5" * 2       # 55 (able to multiply a string by a number)
2 * "5"       # error, can't multiply a number by a string

20.times{ puts 'hi' }
# prints hi 20 times

rand()        # generates a random number between 0 - 1
rand(10)      # generates a random number between 0 - 10

'10'.to_i     # converts to integer, returns 10
'10'.to_f     # converts to float, returns 10.0

19.modulo(4)  # prints 19 % 4, returns 3

10 == 10      # true
10 == 10.0    # true
10 === 10.0    # true
10.eql?(10.0) # false, eql?() compares types
```

### Methods
```rb
def multiply(num1, num2)
  num1 * num2
end
# here, return is implied so there's no need to type 'return' (since there's only one operation being done and it is the last line before end)

name = 'Phil'
if name == 'Phil'
  puts 'name is phil'
elsif name == 'Jack'
  puts 'name is jack'
else
  puts 'name is other'
end
```

### Arrays
```rb
a = [1, 2, 3, 4, 5]
puts a
# prints each element on a new line

print a         # [1, 2, 3, 4, 5]
p a             # [1, 2, 3, 4, 5], new line
puts a.last     # 5
a.first         # 1

a.push(10) # or
a << 10 # or
a.append(10)
# pushes 10 into array, [1, 2, 3, 4, 5, 10]

a.unshift(10)   # [10, 1, 2, 3, 4, 5, 10]
a.uniq!         # [10, 1, 2, 3, 4, 5], removes duplicate

a.pop           # 5, pops 5 (last el)

a.empty?        # false
[].empty?       # true

a.include?(5)   # true

a.join          # 101234
a.join('-')     # 10-1-2-3-4

b = "1-2-3-4-5"
b.split('-')    # ["1", "2", "3", "4", "5"]

x = 1..7        # makes a Range between 1 ~ 7
x.class         # Range
x.to_a          # creates an array, [1, 2, 3, 4, 5, 6, 7]
x.to_a.shuffle  # [2, 7, 4, 1, 3, 6, 5]

j = x.to_a
j.reverse       # [7, 6, 5, 4, 3, 2, 1]
j               # [1, 2, 3, 4, 5, 6, 7]
# created an array with Range x, assigned to variable j
# calling reverse on j reverses BUT it does not mutate
# calling j again after reverse shows that j is still its original form

j.reverse!      # [7, 6, 5, 4, 3, 2, 1]
j               # [7, 6, 5, 4, 3, 2, 1]
# using ! mutates the variable

alphabet = "a".."z"
alphabet.to_a   # creates an array of the letters of the alphabet

%w(1 2 3 4 5)   # ["1", "2", "3", "4", "5"]
z = _           # _ takes the last expression ^
z               # ["1", "2", "3", "4", "5"]

z[0]            # "1"

for i in z
  print i
end             # 12345

z.each do |i|
  print i + " "
end             # 1 2 3 4 5

z.each {|i| print i + " "}
# 1 2 3 4 5

h = (1..5).to_a
h.select {|i| i.odd?}
# [1, 3, 5], looped through array and tested for condition odd? => select if true

[].methods      # lists out all the methods available for arrays
```

### Hashes
```rb

```





































