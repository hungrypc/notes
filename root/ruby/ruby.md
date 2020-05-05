## Introduction to Ruby
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
```

### Strings
```rb
# string concat
first_name = 'Phil'
last_name = 'Chan'

puts first_name + ' ' + last_name

# string interpolation
puts "My first name is #{first_name} and my last name is #{last_name}"

full_name = "#{first_name}  #{last_name}"
# note: this does NOT work with single quotes ''


```









































