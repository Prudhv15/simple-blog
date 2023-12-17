import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/createpost", (req, res) => {
  res.render("createpost.ejs");
});

app.post("/viewposts", (req, res) => {
  const blogTitle = req.body.blogTitle;
  const createdBy = req.body.createdBy;
  const blogContent = req.body.blogContent;
  let timestamp = new Date();
  const data = { blogTitle, createdBy, blogContent, timestamp };
  posts.push(data);
  console.log(data);

  res.redirect("/");
});

// Add this route to your index.js file
app.delete("/deletepost/:index", (req, res) => {
  const index = parseInt(req.params.index);

  // Check if the index is valid
  if (!isNaN(index) && index >= 0 && index < posts.length) {
    // Remove the post at the specified index
    posts.splice(index, 1);
    // Send the updated posts array as a response
    res.json(posts);
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});

app.get("/viewposts", (req, res) => {
  res.render("viewposts.ejs", { posts });
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
