const express = require("express");
const session = require("express-session");
const firebase = require("firebase-admin");
const serviceAccount = require("./config/database.json");

const firebaseConfig = {
  apiKey: "AIzaSyDQi2ZHifcmKsJ-SH8ob9u4eSqiLmbLSF0",
  authDomain: "testhaachihuu.firebaseapp.com",
  databaseURL: "https://testhaachihuu-default-rtdb.firebaseio.com",
  projectId: "testhaachihuu",
  storageBucket: "testhaachihuu.appspot.com",
  messagingSenderId: "657750028304",
  appId: "1:657750028304:web:90e15be08c59551c531a95",
  measurementId: "G-8GYK754DDL"
};

const app = express();
const PORT = 3000;

// Initialize Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://testhaachihuu-default-rtdb.firebaseio.com/"
});

// Middleware for handling sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/notes/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const doc = await firebase.firestore().collection("notes").doc(title).get();
    if (!doc.exists) {
      res.status(404).send("Note not found");
      return;
    }
    res.send(doc.data());
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).send("Title and contents are required");
    return;
  }

  try {
    await firebase.firestore().collection("notes").doc(title).set({ contents });
    res.status(201).send("Note created successfully");
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/comments/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const snapshot = await firebase.firestore().collection("comments").where("title", "==", title).get();
    const comments = snapshot.docs.map(doc => doc.data());
    res.send(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/comments", async (req, res) => {
  const { title, comment } = req.body;
  if (!title || !comment) {
    res.status(400).send("Title and comment are required");
    return;
  }

  try {
    await firebase.firestore().collection("comments").add({ title, comment });
    res.status(201).send("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});