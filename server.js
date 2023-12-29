const express = require("express");
const session = require("express-session");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const db = require("./config/database.js");
const routes = require("./routes/route.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/component"));
app.use(express.static(__dirname + "/zurag"));
app.use(express.static(__dirname + "/jsmodule"));
app.use(express.static(__dirname + "/backend"));


app.use("/", routes);


const connectToDatabase = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Can't connect to the database" + "\n" + err.message);
  }
};


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
    const [rows] = await db.query("SELECT * FROM notes WHERE title = ?", [title]);
    res.send(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/notes", async (req, res) => {
  const { title, contents} = req.body;
  const username=req.session.username;
  if (!title || !contents || !username) {
    return res.status(400).send("Title and contents are required");
  }

  try {
    const [result] = await db.query(
      "INSERT INTO notes (title, contents, username) VALUES (?, ?, ?)",
      [title, contents, username]
    );
    const id = result.insertId;
    const newNote = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
    res.status(201).send(newNote[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.get("/comment/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const [rows] = await db.query("select title, AVG(stars) as stars from stars where title=? group by title", [title]);
    res.send(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.post("/comment", async (req, res) => {
  const { title, stars} = req.body;
  const username=req.session.username;
  if (!title || !stars || !username) {
    return res.status(400).send("Title and contents are required");
  }

  try {
    const [result] = await db.query(
      "INSERT INTO stars (title, stars, username) VALUES (?, ?, ?)",
      [title, stars, username]
    );
    const id = result.insertId;
    const newNote = await db.query("SELECT * FROM stars WHERE id = ?", [id]);
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

connectToDatabase();

app.use((req, res, next) => {
  if (req.session.username || config.local === true) {
   next();
  } else {
   res.redirect('/');
  }
});


