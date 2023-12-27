
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const db = require("./config/database");

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes App API",
      version: "1.0.0",
      description: "API for managing notes",
    },
  },
  apis: ["backend/express.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/notes/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const [rows] = await db.query("SELECT * FROM notes WHERE title = ?", [
      title,
    ]);
    res.send(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).send("Title and contents are required");
  }

  try {
    const [result] = await db.query(
      "INSERT INTO notes (title, contents) VALUES (?, ?)",
      [title, contents]
    );
    const id = result.insertId;
    const newNote = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
    res.status(201).send(newNote[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).send("Title and contents are required");
  }

  try {
    const [result] = await db.query(
      "INSERT INTO notes (title, contents) VALUES (?, ?)",
      [title, contents]
    );
    const id = result.insertId;
    const newNote = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
    res.status(201).send(newNote[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});
