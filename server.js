require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const movies = require("./movies")


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//middleware in callback
app.use((req, res, next) => {
  console.log("Request Timestamp", new Date().toLocaleString());
  console.log("Request Made", req.method, ":", req.url)
  next();
});

// main api endpoint to test if server is up
app.get("/", (req, res) => {
  res.json("Welcome to Movies API .... Server is online ...");
});

// get list of all movies
app.get("/movies/list/all", (req, res) => {
  res.status(200).json(movies);
});

app.get(`/movies/list/by/:slug`, (req, res) => {
    // slug could be title or director name
   const query = req.params.slug.toLowerCase();

   const movieResults = movies.filter((movie) =>
     movie.title.toLowerCase().includes(query)
   );

   const directorResults = movies.filter((movie) => {
     for (director of movie.directors) {
       if (director.toLowerCase().includes(query)) {
         return movie;
       }
     }
   });

   const combinedResults = movieResults.concat(directorResults);

   res.send(combinedResults);
  
});


app.post("/movies/add/movie", (req, res) => {
    const data = req.body;
    const movie = {
      title: data.name,
      directors: [data.director],
      releaseDate: data.date,
      rating: data.rate,
      runTime: data.duration,
      genres: [data.genre],
    };
  movies.push(movie);
  console.log("We added the following movie,...", movie)
  console.log("complete ok...")
  res.status(200).json(movies);

});

app.listen(PORT, () => {
  console.log(`Your API server running on http://localhost:${PORT}`);
});
