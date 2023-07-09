import express from "express";
import mysql2 from "mysql2";
import "dotenv/config";
import { login, register } from "./routes/auth.js";
import { router as usersRouter } from "./routes/users.js";
import bodyParser from "body-parser";
import swaggerDocs from "./swagger.js";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

app.use(login, usersRouter);
app.use(register, usersRouter);

export const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server başarıyla bağlandı");
  }
});

app.listen(PORT, () => {
  console.log(`server ${PORT} portunda başlatıldı`);
  swaggerDocs(app, PORT);
});
