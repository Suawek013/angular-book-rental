const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const book_by_categoryRoutes = require("./routes/book_by_category");
const configurationRoutes = require("./routes/configuration");
const mailRoutes = require("./routes/mail");
const books_dataRoutes = require("./routes/books_data");
const borrowRoutes = require("./routes/borrow");

const db = require("./config/database");

const app = express();

db.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err));

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname,'/public/index.html')));
app.get("/api", (req, res) => res.send("Server API"));

app.use("/api/books", booksRoutes);
app.use("/api/books_data", books_dataRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/book_by_category", book_by_categoryRoutes);
app.use("/api/configuration", configurationRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/borrow", borrowRoutes)

module.exports = app;
