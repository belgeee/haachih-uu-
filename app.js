const express = require("express");
const session = require("express-session");
const db = require("./config/database.js");
const app = express();
const PORT = 9090;

const routes = require("./routes/route.js");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/component"));
app.use(express.static(__dirname + "/zurag"));
app.use(express.static(__dirname + "/jsmodule"));
app.use(express.static(__dirname + "/backend"));
app.use("/", routes);

// db.query("SELECT 1")
//   .then(() => {
//     console.log("Database is connected");
//     app.listen(PORT, () => {
//       console.log(`Server is running on ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Can't connect to database" + "\n" + err.message);
//   });

  // Wrap your database connection code in an async function
  const connectToDatabase = async () => {
    try {
        await db.query("SELECT 1");
        console.log("Database is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err) {
        console.error("Can't connect to database" + "\n" + err.message);
    }
};

connectToDatabase();