const express = require('express');
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json")
const User = require("../models/User");

const router = express.Router();

function tokenGeneration(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}


//router register
router.post("/register", async (req, res) => {
  const { user_id } = req.body;

  try {
    if (await User.findOne({ user_id }))
      return res.status(400).send({ error: "User already registered" });

    const user = await User.create(req.body);

    user.user_secret_key = undefined;

    return res.send({ user, token: tokenGeneration({ id: user.id }) });
  } catch (error) {
    return res.status(400).send({ error: "Falha no registro" + error});
  }

});

//router autenticate
router.post("/authenticate", async (req, res) => {
    const { user_id, user_secret_key } = req.body;
  
    const user = await User.findOne({ user_id }).select("+user_secret_key");
  
    if (!user) return res.status(400).send({ Error: "User not found" });
  
    if (!(await bcrypt.compare(user_secret_key, user.user_secret_key)))
      return res.status(400).send({ error: "senha nao encontrada! " });
  
    user.user_secret_key = undefined;
  
 

    res.send({ user, token: tokenGeneration({ id: user.id }) });
});

module.exports = app => app.use("/auth", router);