# MYSQL Notes

### goormIDE
```cli
mysql-ctl cli

show databases;

select database();

show tables;

use <table>;
```

### Basic Setup
```sql
CREATE DATABASE database_name;

DROP DATABASE database_name;

USE database_name;

CREATE TABLE table_name
  (
    column_name DATATYPE NOT NULL DEFAULT 'default' AUTO_INCREMENT,
    -- VARCHAR(100) / INT
    PRIMARY KEY (column_name)
  );

DROP TABLE table_name;

DESC table_name;

source filename_.sql;
```

### CRUD
```sql
-- Create
INSERT INTO table_name (column_name) VALUES (data);

INSERT INTO table_name
            (column_name, column_name)
VALUES      (value, value),
            (value, value),
            (value, value);

-- Read
SELECT * FROM table_name WHERE column_name=value;

SELECT column_name1, column_name2 FROM table_name;

SELECT column_name AS alias FROM table_name;

-- Update
UPDATE table_name SET column_name=newValue WHERE column_name=value;

-- Destroy
DELETE FROM table_name WHERE column_name=value;

DELETE FROM table_name;
-- deletes entire table, but doesn't DROP table
```

### String Functions
```sql
SELECT CONCAT(last_name, ',', first_name) FROM people;
-- returns Chan, Phil

SELECT CONCAT_WS(' - ', first_name, last_name, age) FROM people;
 -- returns Phil - Chan - 26

SELECT SUBSTRING('Hello World', 1, 4);
 -- returns Hell

SELECT SUBSTRING('Hello World', 7);
-- returns World

SELECT SUBSTRING('Hello World', -3);
-- returns rld

SELECT CONCAT(SUBSTRING(title, 1, 20), '...') AS 'short title' FROM books;
-- returns The Hitchhiker's Gui...

SELECT REPLACE('Fuck you', 'Fuck', '****');
-- returns **** you

SELECT REVERSE(first_name) FROM people;
-- returns lihP

SELECT CHAR_LENGTH(first_name) FROM people;
-- returns 4

SELECT UPPER(first_name) FROM people;
-- returns PHIL

SELECT LOWER(first_name) from people;
-- returns phil
```

### Selection Refinement

```sql
SELECT DISTINCT author_lastname FROM books;
-- selects unique values (no duplicates)

SELECT DISTINCT first_name, last_name FROM people;
-- unique ROWS, not just singular values

SELECT first_name FROM people ORDER BY age;
-- default is ascending

SELECT first_name FROM people ORDER BY age DESC;
-- orders by DESCending value

SELECT first_name, last_name, age FROM people ORDER BY 3;
-- orders by the 3rd column (age)

SELECT first_name, last_name FROM people ORDER BY first_name, last_name;
-- orders by first_name first, then sorts those with the same first name by last_name

SELECT first_name FROM people LIMIT 5;
-- limits the number of results

SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 5;
-- returns 5 most recently released books

SELECT first_name FROM people LIKE '%da%';
-- returns first names that contain 'da'
-- % is a marker for 'anything can go here', its a wildcard

SELECT stock_quantity FROM products LIKE '____';
-- each underscore represents a character, this selects products where the stock is 4 characters long
-- if you want to select values with % or _, use \% or \_
```

### Aggregate Functions
```sql
SELECT COUNT(*) FROM books;
-- counts selected data

SELECT COUNT(DISTINCT first_name) FROM people;

SELECT last_name, COUNT(*) FROM books GROUP BY last_name;
-- groups data by last name, counts number of books each author has written

SELECT first_name, last_name, COUNT(*) FROM books GROUP BY last_name, first_name;

SELECT MIN(released_year) FROM books;
-- returns the smallest value of the column

SELECT MAX(released_year) FROM books;
-- returns the largest value of the column

SELECT title, pages FROM books WHERE pages = (SELECT MIN(pages) FROM books);
-- returns title and pages of book with smallest number of pages
-- BUT this is slow because it's running two queries

SELECT * FROM books ORDER BY pages ASC LIMIT 1;
-- returns the book with the least pages (same as above)
-- this is faster because this is running just one query and chopping off the rest of the data (limit 1)

SELECT first_name, last_name, MIN(released_year) FROM books GROUP BY last_name, first_name;
-- returns firstname, lastname, and earliest year they've written a book

SELECT first_name, last_name, MAX(pages) FROM books GROUP BY last_name, first_name;
-- returns firstname, lastname, and number of pages of their longest book (most pages)

SELECT SUM(pages) FROM books;
-- sums pages

SELECT CONCAT(first_name, ' ', last_name) AS author, SUM(pages) FROM books GROUP BY last_name, first_name;

SELECT AVG(released_year) FROM books;
-- returns average year books were published
-- note: this doesn't round

SELECT released_year, AVG(stock) FROM books GROUP BY released_year;
-- returns average stock for books released in the same year
```

### Data Types
```sql
VARCHAR(10)
-- variable characters

CHAR(5)
-- fixed length characters

INT
-- useful for whole numbers

DECIMAL(13, 2)
-- first argument: total number of digits, second argument: maximum number of decimal digits

FLOAT
-- approximate numbers (uses less space but loses precision)

DOUBLE
-- same as float, but uses a little more memory

DATE
-- stores date, no time (YYYY-MM-DD)

TIME
-- stores time, no date (HH:MM:SS)

DATETIME
-- stores both date and time YYYY-MM-DD HH:MM:SS

CURDATE()
-- current date

CURTIME()
-- current time

NOW()
-- current datetime

```

### Logical Operators

```sql
NOT LIKE
-- opposite of like

AND

OR

SELECT title FROM books WHERE released_year BETWEEN 2004 AND 2015;
-- there's also NOT BETWEEN

SELECT title FROM books WHERE last_name IN ('Carver', 'Lahiri', 'Smith');
-- instead of multiple ORs, IN is cleaner and faster
-- there's also NOT IN

SELECT title, released_year,
  CASE
    WHEN released_year >= 2000 THEN 'Modern Lit'
    ELSE '20th Century Lit'
  END AS genre
FROM books;
-- case statements
```

### Joining Tables
```sql
CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100)
);
CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);
-- FOREIGN KEY

SELECT * FROM customers, orders WHERE customers.id = orders.customer_id;
-- implicit inner join

SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id;
-- explicit inner join (more commonly used)

SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;
-- left join

SELECT * FROM customers RIGHT JOIN orders ON customers.id = orders.customer_id;
-- left join

SELECT
  first_name,
  last_name,
  IFNULL(SUM(amount), 0) AS total_spent
FROM customers
LEFT JOIN orders
  ON customers.id = orders.customer_id
GROUP BY customers.id
ORDER BY total_spent;
-- IFNULL(column, value_replacement)

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    FOREIGN KEY(customer_id)
      REFERENCES customers(id)
      ON DELETE CASCADE
);
-- ON DELETE CASCADE = when a customer is deleted that has a corresponding order, delete the order as well
```

### Many to Many Practice
```sql
CREATE TABLE reviewers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE series (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  released_year YEAR(4),
  genre VARCHAR(100)
);

CREATE TABLE reviews(
  id INT AUTO_INCREMENT PRIMARY KEY,
  rating DECIMAL(2, 1),
  series_id INT,
  reviewer_id INT,
  FOREIGN KEY (series_id) REFERENCES series(id),
  FOREIGN KEY (reviewer_id) REFERENCES reviewers(id)
);

INSERT INTO series (title, released_year, genre) VALUES
    ('Archer', 2009, 'Animation'),
    ('Arrested Development', 2003, 'Comedy'),
    ("Bob's Burgers", 2011, 'Animation'),
    ('Bojack Horseman', 2014, 'Animation'),
    ("Breaking Bad", 2008, 'Drama'),
    ('Curb Your Enthusiasm', 2000, 'Comedy'),
    ("Fargo", 2014, 'Drama'),
    ('Freaks and Geeks', 1999, 'Comedy'),
    ('General Hospital', 1963, 'Drama'),
    ('Halt and Catch Fire', 2014, 'Drama'),
    ('Malcolm In The Middle', 2000, 'Comedy'),
    ('Pushing Daisies', 2007, 'Comedy'),
    ('Seinfeld', 1989, 'Comedy'),
    ('Stranger Things', 2016, 'Drama');


INSERT INTO reviewers (first_name, last_name) VALUES
    ('Thomas', 'Stoneman'),
    ('Wyatt', 'Skaggs'),
    ('Kimbra', 'Masters'),
    ('Domingo', 'Cortes'),
    ('Colt', 'Steele'),
    ('Pinkie', 'Petit'),
    ('Marlon', 'Crafford');


INSERT INTO reviews(series_id, reviewer_id, rating) VALUES
    (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
    (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
    (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
    (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
    (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
    (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
    (7,2,9.1),(7,5,9.7),
    (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
    (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
    (10,5,9.9),
    (13,3,8.0),(13,4,7.2),
    (14,2,8.5),(14,3,8.9),(14,4,8.9);

SELECT
  series.id,
  title,
  AVG(rating) AS avg_rating
FROM series
JOIN reviews
  ON series.id = reviews.series_id
GROUP BY series.id
ORDER BY avg_rating DESC;
-- joins series and reviews, gets series rating, gets average, group by series, order by descending average rating

SELECT first_name, last_name, rating
FROM reviewers
JOIN reviews
  ON reviewer.id = reviews.reviewer_id;
-- joins reviewers and reviews, gives all reviewers and their review ratings

SELECT title AS unreviewed_series
FROM series
LEFT JOIN reviews
  ON series.id = reviews.series_id
  WHERE rating IS NULL;
-- joins series and reviews, shows all titles of series where there have no been reviews.

SELECT
  genre,
  ROUND(
    AVG(rating)
  )  AS avg_rating
FROM series
INNER JOIN reviews
  ON series.id = reviews.series_id
  GROUP BY genre;
-- joins series and reviews, shows genre and average rating of genre (rounded), grouped by genre

SELECT
  first_name,
  last_name,
  COUNT(rating) AS count,
  IFNULL(MIN(rating), 0) AS min,
  IFNULL(MAX(rating), 0) AS min,
  IFNULL(AVG(rating), 0) AS avg,
  IF(COUNT(rating) >= 1, 'active', 'inactive') AS status
  -- CASE
  --   WHEN COUNT(rating) >= 10 then 'power user'
  --   WHEN COUNT(rating) > 0 then 'active'
  --   ELSE 'inactive'
  -- END AS status
FROM reviewers
LEFT JOIN reviews
  ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;
-- joins reviewers and reviews. shows reviewer, count of reviews, min review, max review, average rating, if reviews exists ? 'active' : 'inactive'

SELECT
  title,
  rating,
  CONCAT(first_name, ' ', last_name) AS reviewer
FROM reviewers
INNER JOIN reviews
  ON reviewers.id = reviews.reviewer_id
INNER JOIN series
  ON series.id = reviews.series_id
ORDER BY title;
-- joins all three tables, shows title, rating, and reviewer (only where we have reviews)
```

### Instagram Database Clone Schema
```sql
CREATE DATABASE ig_clone;
USE ig_clone;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN key(user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment_text VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  photo_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(photo_id) REFERENCES photos(id)
);

CREATE TABLE likes (
  user_id INT NOT NULL,
  photo_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(photo_id) REFERENCES photos(id),
  PRIMARY KEY (user_id, photo_id)
);

CREATE TABLE follows (
  follower_id INT NOT NULL,
  followee_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(follower_id) REFERENCES users(id),
  FOREIGN KEY(followee_id) REFERENCES users(id),
  PRIMARY KEY(follower_id, followee_id)
);

CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE photo_tags (
  photo_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY(photo_id) REFERENCES photos(id),
  FOREIGN KEY(tag_id) REFERENCES tags(id),
  PRIMARY KEY (photo_id, tag_id)
);
```

### Querying IG Clone
```sql
SELECT * FROM users ORDER BY created_at ASC LIMIT 5;
-- selecting the 5 oldest users

SELECT
  DAYNAME(created_at) AS day,
  COUNT(DAYNAME(created_at)) AS count
FROM users
GROUP BY DAYNAME(created_at)
ORDER BY count DESC;
-- selecting the day of the week most users register on

SELECT username FROM users
LEFT JOIN photos ON users.id = photos.user_id
WHERE photos.id IS NULL;
-- identify inactive users

SELECT
  username,
  photos.id AS photo_id,
  photos.image_url,
  COUNT(*) AS total_likes
FROM photos
INNER JOIN likes ON photos.id = likes.photo_id
INNER JOIN users ON users.id = photos.user_id
GROUP BY photos.id
ORDER BY total_likes DESC LIMIT 1;
-- select photo with the most likes

SELECT (SELECT COUNT(*) FROM photos) / (SELECT COUNT(*) FROM users);
-- calculate avg number of photos per user

SELECT
  tag_name,
  COUNT(*) AS instances
FROM tags
INNER JOIN photo_tags ON tags.id = photo_tags.tag_id
GROUP BY tag_name
ORDER BY instances DESC LIMIT 5;
-- select top 5 most commonly used tags

SELECT
  username,
  COUNT(*) AS liked
FROM users
INNER JOIN likes ON users.id = likes.user_id
GROUP BY username
-- ORDER BY liked DESC;
HAVING liked = (SELECT COUNT(*) FROM photos);
-- find users who have liked every photo on the site
```

### Bringing in Nodejs
JS setup:
```js
let faker = require('faker');
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us'
});

connection.query('SELECT 1 + 1 AS answer', function(err, res, fields) {
  if(err) throw err;
  console.log(res[0]);
  // returns { answer: 2 }
  console.log(res[0].answer);
  // returns 2
});

connection.end();
```

Schema.sql:
```sql
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);
```

```js
// SELECTING DATA
let q = 'SELECT COUNT(*) AS total FROM users';
connection.query(q, (err, res, fields) => {
  if (err) throw err;
  console.log(res[0].total);
  // returns total count of users
});


// INSERTING DATA
let person = {
  email: faker.internet.email ,
  created_at: faker.date.past()
};

const end_result = connection.query('INSERT INTO users SET ?', person, (err, res, fields) => {
  if (err) throw err;
  return res;
});

console.log(end_result);


// INSERTING MULTIPLE USERS
let data = [];
for (let i = 0; i <= 500; i++) {
  data.push({
    email: faker.internet.email ,
    created_at: faker.date.past()
  });
}

let j = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(j, [data], (err, res) => {
  if (err) throw err;
  console.log(res);
});

connection.end();
```

### 500 Users Exercises
```sql
SELECT
  DATE_FORMAT(MIN(created_at), "%M %D %Y") AS earliest_date
FROM users;
-- find earliest date

SELECT email FROM users WHERE created_at = (SELECT MIN(created_at) FROM users);
-- find email of earliest user

SELECT
  MONTHNAME(created_at) AS month,
  COUNT(*) AS count
FROM users
GROUP BY month
ORDER BY count DESC;
-- select month and count (number of users joined that month)

SELECT COUNT(*) AS yahoo_users FROM users WHERE email LIKE '%@yahoo.com%';
-- count number of users with yahoo emails

SELECT
  CASE
    WHEN email LIKE '%@yahoo.%' THEN 'yahoo'
    WHEN email LIKE '%@gmail.%' THEN 'gmail'
    WHEN email LIKE '%@hotmail.%' THEN 'hotmail'
    ELSE 'other'
  END AS provider
  email,
  COUNT(*) AS total_users
FROM users
GROUP BY provider
ORDER BY total_users DESC;
-- count total number of users for each email host
```

### Building the Web App
```cli
npm i express ejs faker mysql body-parser --save
```

```js
let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let app = express();

app.set('view engine', 'ejs');
// ejs looks for a directory called 'views'
// this directory will hold html

let connectionn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us'
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  // find count of users in db
  // respond with that count
  let q = 'SELECT COUNT(*) AS total FROM users';
  let total = connection.query(q, function (err, res) {
    if(err) throw err;
    return res[0].total;
  });

  // res.send(`We have ${total} users in our db`);
  res.render('home', {
    data: total
  }); // looks into views folder for home.ejs, passes variable 'total' to html with key 'data'
});

app.post('/register', function(req, res) {
  let person = {
    email: req.body.email
  };
  let q = 'INSERT INTO users SET ?';
  connection.query(q, person, function(error, result) {
    if(err) throw err;
    res.redirect('/');
  });
});


// new route
app.get('/joke', function(req, res) {
  let joke = 'joke here';
  res.send(joke);
});

app.listen(8080, function() {
  console.log('app listening on port 8080');
});
```

```html
<h1> JOIN US </h1>

<p> Enter your email to join <%=data%> others on our waitlist. </p>

<form method='POST' action='/register'>
  <input type='text' class='form' placeholder='Enter your email'>
  <button>Join Now</button>
</form>
```



















