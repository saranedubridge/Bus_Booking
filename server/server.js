const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json());

const cors = require("cors");

app.use(cors({
    origin: "https://bus-booking-frontend-gu0x.onrender.com", // Adjust based on your frontend URL
    credentials: true,
  }));

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);
const path = require("path");

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Node server listening on port ${port}!`));
