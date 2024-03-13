require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/movies/list/all", (req, res) => {
  res.send("hello world");
});

app.get("/movies/list/by/director/${slug}", (req, res) => {
  res.send("hello world");
});

app.get("/movies/list/by/title/${slug}", (req, res) => {
  res.send("hello world");
});

app.post("/movies/list/add/movie", (req, res) => {
  res.send("Movie was added");
});

app.listen(PORT, () => {
  console.log(`Your API server running on http://localhost:${PORT}`);
});
