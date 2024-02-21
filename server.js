const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express();
const port = 3008;

app.use(cors());
app.use(express.json()); // for parsing application/json

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
