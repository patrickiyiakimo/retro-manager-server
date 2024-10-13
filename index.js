const express = require("express");
const app = express();
// const { sendMail } = require("./controllers/mailSend");
// const emailRouter = require("./routes/email");

const cors = require("cors");
const PORT = 2500;

app.use(express.json());
app.use(cors());

//routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
// app.use("/api", emailRouter);
// app.use("/login", require("./routes/login"));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
