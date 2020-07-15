const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    //destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //check if user exists(then throw error)
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 OR user_name = $2",
      [email, name]
    );

    if (user.rows.length > 0) {
      return res.status(401).send("User already exists!");
    }

    //bcrypt the password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter the user inside our db
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //generate web token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //destructure req.body
    const { email, password } = req.body;
    //check if user doesn't exit, if not, throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect!");
    }
    //check password == db password
    const validPassword = bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Email or password is incorrect!" });
    }

    //give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
  }

  router.get("/is-verify", authorization, async (req, res) => {
    try {
      res.json(true);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  });
});
module.exports = router;
