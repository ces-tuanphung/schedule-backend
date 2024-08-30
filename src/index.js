import express from "express";
import cors from "cors";
import createRoutes from "./routes/scheduleRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const routes = createRoutes();
app.use("/", routes);

app
  .listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
      app.listen(PORT + 1);
    } else {
      console.error(err);
    }
  });
