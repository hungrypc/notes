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


```






















