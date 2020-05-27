# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:

User.create(username: 'dolores', password: 'password')
User.create(username: 'abernathy', password: 'password')
User.create(username: 'bernardlowe', password: 'password')
User.create(username: 'rick', password: 'password')
User.create(username: 'morty', password: 'password')
User.create(username: 'richardhendricks', password: 'password')

Message.create(body: 'hi', user: User.last)
Message.create(body: 'hello', user: User.first)
Message.create(body: 'hey', user: User.second)
