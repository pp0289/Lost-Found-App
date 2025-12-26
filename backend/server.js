require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const addItemRouter = require("./routes/additem-router");
const homeRoute = require("./routes/home-router");
const connectDb = require("./utils/db")
const errorMiddleWare = require("./middleware/error-middleware");

const app = express();

const corsOption = {
  origin: "https://lost-found-app-nine.vercel.app",
  methods: "POST, GET, PUT, DELETE, PATCH, HEAD",
  credentials: true
}

// Add this block
let isDbConnected = false;

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectDb();
      isDbConnected = true;
      console.log('DB connection ready for all requests');
    } catch (err) {
      console.error('DB connection failed in middleware:', err.message);
      return res.status(503).json({ error: 'Database temporarily unavailable' });
    }
  }
  next();
});


app.get('/', (req, res) => {
  res.status(200).send('Backend is alive! 🚀');
  // or res.json({ message: 'API root working', status: 'ok' });
});

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/form", addItemRouter);
app.use("/api/data", homeRoute);
app.use(errorMiddleWare);

module.exports = app;

// const PORT = 5000;

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server is running at port: ${PORT}`);
//   });
// });


// if (process.env.NODE_ENV !== 'production') {
//     const PORT = 5000;
//     connectDb().then(() => {
//         app.listen(PORT, () => {
//             console.log(`Local server running at port: ${PORT}`);
//         });
//     });
// } else {
//     // On Vercel, just connect to the DB
//     connectDb();
// }