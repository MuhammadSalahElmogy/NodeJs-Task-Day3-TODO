const express = require("express");
const path = require("path");

const app = express();

/**
 * Serve static files from the 'public' directory
 * This allows the server to serve CSS, JS, images, etc.
 */
app.use(express.static("public"));

/**
 * GET /
 * Serves the main HTML file (index.html) from the 'public' directory
 * Response: Sends the 'index.html' file to the client
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * Start the server and listen on port 5001
 * Logs a message indicating the server is running
 */
app.listen(5001, () => {
  console.log(`Server running on port 5001`);
});
