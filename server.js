/** @format */

const express = require("express");
const usersRouter = require("./routes/screenshot");
const bodyParser = require("body-parser");
const app = express();
const port = 5000; // or any other port you prefer
const cors = require("cors"); // Import the cors middleware

// Use the cors middleware
app.use(cors());
// const corsOptions = {
//   origin: "https://example.com" // Replace with the allowed origin URL
// };

// app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ message: "Hello, this is your API!" });
});

app.use("/screenshot", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
