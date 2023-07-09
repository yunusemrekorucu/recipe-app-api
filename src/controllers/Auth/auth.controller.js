import jwt from "jsonwebtoken";
import "dotenv/config";
import { db } from "../../index.js";

//#region Login
const authLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)return res.status(400).json({status: false,message: "Lütfen alanları kontrol ediniz !"}); //prettier-ignore

  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(401).json({ success: false, message: err });

    if (results.length > 0) {
      const userId = results?.[0].id;
      const token = jwt.sign(
        { userId, username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({
        success: true,
        message: "Başarıyla giriş yapıldı",
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Lütfen bilgilerinizi tekrar kontrol ediniz...",
      });
    }
  });
};
//#endregion

//#region Register
const authRegister = async (req, res) => {
  const { username, password, re_password, email, phone } = req.body;
  for (let key in req.body) if (req.body[key] === "") return res.status(400).json({status: false,message: "Lütfen boş alan bırakmayınız"}); //prettier-ignore
  if (password !== re_password)return res.status(400).json({status: false,message: "Şifreniz eşit değil !"}); //prettier-ignore

  const checkEmailSql = `SELECT COUNT(*) as count FROM users WHERE email = '${email}'`;
  const addUserSql = `INSERT INTO users (username, email, password, phone) VALUES ('${username}', '${email}', '${password}' , ${phone})`;

  db.query(checkEmailSql, (err, results) => {
    if(results[0].count === 1) return res.status(400).json({status: false,message: "Bu email ile kullanıcı mevcuttur..."}); //prettier-ignore
    db.query(addUserSql, (err, results) => {
      if (!err)
        res.status(200).json({
          success: true,
          message: "Başarıyla kayıt olundu...",
        });
    });
  });
};
//#endregion

export { authLogin, authRegister };
