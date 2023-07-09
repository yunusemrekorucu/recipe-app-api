import { db } from "../../index.js";

const getUsers = (req, res) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, results) => {
    if (err) return res.json({ success: false, message: err });
    res.json({
      success: true,
      message: "Users retrieved successfully.",
      data: results,
    });
  });
};

export { getUsers };
