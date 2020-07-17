const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const authorization = require("./middleware/authorization");

app.use(cors());
app.use(express.json());

//auth routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/home", require("./routes/todos"));

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
