## Introduction to Ruby
```cli
<!-- run a ruby file -->
ruby main.rb

<!-- opens interactive ruby -->
irb
```

ctl+ l clears irb console

```ruby
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
```ruby
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
```ruby
puts "What is your first name?"
first_name = gets.chomp
puts "Your response was #{first_name}"
# gets.chomp takes user's input on terminal
# note: inputs are by default strings
```

### Numbers
```ruby
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

10 == 10       # true
10 == 10.0     # true
10 === 10.0    # true
10.eql?(10.0)  # false, eql?() compares types
```

### Methods
```ruby
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


while true
  # do something
end
```

### Arrays
```ruby
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
```ruby
simple_hash = {
  'a' => 1,
  'b' => 2,
  'c' => 3
}
simple_hash['a']    # 1

symbol_hash = {
  a: 1,
  b: 2,
  c: 3
}
symbol_hash[:a]     # 1
# : indicates symbol

simple_hash.keys    # ["a", "b", "c"]
simple_hash.values  # [1, 2, 3]

simple_hash.each {|key, value|
  puts "key is #{key} and value is #{value}"
}
# when iterating through hashes, need to grab both variables (key, value)

symbol_hash[:d] = 4   # 4
symbol_hash           # {:a=>1, :b=>2, :c=>3, :d=>4}

symbol_hash[:c] = "a" # "ah"
symbol_hash           # {:a=>1, :b=>2, :c=>"ah", :d=>4}

symbol_hash.select {|k, v| v.is_a?(String)}
# {:c=>"ah"}

symbol_hash.each {|k, v| symbol_hash.delete(k) if v.is_a?(String)}
# {:a=>1, :b=>2, :d=>4}
```

### Authenticator Project (Homework)
```ruby
# users array where username and password are stored
users = [
  { username: "mashur", password: "pass1" },
  { username: "phil", password: "pass2" },
  { username: "arya", password: "pass3" },
  { username: "jonsnow", password: "pass4" },
  { username: "heisenberg", password: "pass5" },
]

# authentication method to check and verify if username/password combination exists
def auth_user(username, password, list_of_users)
  list_of_users.each do |user_record|
    if user_record[:username] == username && user_record[:password] == password
      return user_record
    end
  end
  "Credentials were not correct"    # no need to type return here - with ruby, the last return is implied
end

# program execution flow
puts "Welcome to the authenticator"
25.times { print "-" }
puts
puts "This program will tak iput from the user and compare password"
puts "If password is correct, you will get back the user object"

attempts = 1
while attempts < 4
  print "Username: "
  username = gets.chomp
  print "Password: "
  password = gets.chomp

  auth = auth_user(username, password, users)
  puts auth

  puts "Press n to quit or any other key to continue: "
  input = gets.chomp.downcase

  break if input = "n"
  attempts += 1
end


puts "You have exceeded the number of attempts" if attempts == 4
```

### Area Code Dictionary (Homework)
```ruby
dial_book = {
  "newyork" => "212",
  "newbrunswick" => "732",
  "edison" => "908",
  "plainsboro" => "609",
  "sanfrancisco" => "301",
  "miami" => "305",
  "paloalto" => "650",
  "evanston" => "847",
  "orlando" => "407",
  "lancaster" => "717"
}

# Get city names from the hash
def get_city_names(somehash)
  # somehash.keys.each {|city| puts city }
  somehash.keys
end

# Get area code based on given hash and key
def get_area_code(somehash, key)
  if somehash.keys.include?(key)
    return "the area code for #{key} is #{somehash[key]}."
  else
    return "invalid city"
  end
end

# Execution flow
loop do
# Write your program execution code here
  puts "area code dictionary"
  20.times { print '-' }
  puts

  puts "would you like to look up an area code based on a city name? (y/n)"
  answer = gets.chomp.downcase
  break if answer != "y"

  puts "which city's area code would you like to know?"
  10.times { print '-' }
  puts get_city_names(dial_book)
  10.times { print '-' }
  puts
  city = gets.chomp
  res = get_area_code(dial_book, city)
  3.times { print "." }
  puts
  puts res

  20.times { print '-' }
  puts
end
```

### Object Oriented Programming
> A programming paradigm that uses objects and their interactions to design and program applications

We use Classes as a blueprint to define our Objects. Specified in that blueprint are features of the object, called Attributes. For example:

- Class: Student
  - Attribute: first name
  - Attribute: last name
  - Attribute: email

```ruby
class Student
  attr_accessor :first_name, :last_name # allows get and set
  attr_reader :email # only allows get, no set

  @first_name
  @last_name
  @email
  # @ indicates an instance variable

  def initialize(first_name, last_name, email)
    @first_name = first_name
    @last_name = last_name
    @email = email
  end
  # initializes values when creating object

  def to_s
    "first name: #{@first_name}"
  end
  # classes default to this method

  def set_email

end

philip = Student.new("phil", "chan", "phil@email.com")

puts philip.first_name
puts philip.last_name
puts philip.email
```

### Classes, Modules, and Mixins
Adding a gem:

```cli
gem install bcrypt
```
** OR **

```ruby
require 'bundler/inline'

gemfile true do
  source 'http://rubygems.org'
  gem 'bcrypt'
end
```
Using bcrypt:

```ruby
# read up on bcrypt docs, udemy course is a little outdated
require 'bcrypt'

#  Using Bcrypt in general

my_password = BCrypt::Password.create("my password")
#=> "$2a$12$K0ByB.6YI2/OYrB4fQOYLe6Tv0datUVf6VZ/2Jzwm879BW5K1cHey"

my_password.version              #=> "2a"
my_password.cost                 #=> 12
my_password == "my password"     #=> true
my_password == "not my password" #=> false

my_password = BCrypt::Password.new("$2a$12$K0ByB.6YI2/OYrB4fQOYLe6Tv0datUVf6VZ/2Jzwm879BW5K1cHey")
my_password == "my password"     #=> true
my_password == "not my password" #=> false


users = [
  { username: "mashur", password: "pass1" },
  { username: "phil", password: "pass2" },
  { username: "arya", password: "pass3" },
  { username: "jonsnow", password: "pass4" },
  { username: "heisenberg", password: "pass5" },
]

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

def verify_hash_digest(password)
  BCrypt::Password.new(password)
end

def create_secure_users(user_list)
  user_list.each do |user_record|
    user_record[:password] = create_hash_digest(user_record[:password])
  end
  user_list
end

secure_users_list = create_secure_users(users)

def autheticate_user(username, password, user_list)
  user_list.each do |user_record|
    if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
      return user_record
    end
  end
  "invalid credentials"
end

p authenticate("phil", "pass2", secure_users_list)
# should work, returns user_record

p authenticate("phil", "badpass", secure_users_list)
# should not work, returns "invalid credentials"
```



































