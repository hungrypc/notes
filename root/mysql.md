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
```






























