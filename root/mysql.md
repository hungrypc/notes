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


































