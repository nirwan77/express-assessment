import express, { json } from "express";
// import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();

// You may toggle this on when developing
// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

// TODO: add your /to-celsius and /to-fahrenheit POST handlers here:
app.post("/to-celsius", (req, res) => {
  const { fahrenheit } = req.body;
  if (typeof fahrenheit !== "number") {
    return res
      .status(400)
      .json({ error: "Invalid input. Fahrenheit must be a number." });
  }

  const celsius = (fahrenheit - 32) * (5 / 9);
  return res.json({ celsius });
});

app.post("/to-fahrenheit", (req, res) => {
  const { celsius } = req.body;
  if (typeof celsius !== "number") {
    return res
      .status(400)
      .json({ error: "Invalid input. Celsius must be a number." });
  }

  const fahrenheit = (celsius * 9) / 5 + 32;
  return res.json({ fahrenheit });
});

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

export default app;
