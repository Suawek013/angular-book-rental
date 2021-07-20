.open library.db

CREATE TABLE Books 
(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	title	text,
	description	text,
	publication_date	text,
	author	text,
	publisher	text,
	image	text
);

CREATE TABLE Books_by_category 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id)
        REFERENCES Categories (id)
		ON DELETE CASCADE,

    FOREIGN KEY (book_id)
        REFERENCES Books (id)
		 ON DELETE CASCADE
);

CREATE TABLE Categories
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT
);

CREATE TABLE Users
(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	email	TEXT,
	password	TEXT,
	firstName	TEXT,
	lastName	TEXT,
	permission TEXT
);