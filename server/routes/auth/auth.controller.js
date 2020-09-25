const { executeQuery } = require("../../database");
const {
  hashPassword,
  comparePasswords,
} = require("../../utils").passwordService;
const { signJwtLoginToken } = require("../../jwtService");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword)
      res.status(400).send({ status: "error", message: "Missing credentials" });
    else if (password != confirmPassword) {
      res
        .status(400)
        .send({ status: "error", message: "Passwords don't match" });
    } else {
      const userData = await executeQuery(
        `SELECT * FROM  users WHERE Name = '${name}' OR Email = '${email}'`
      );

      if (userData.length) {
        userData.forEach((item) => {
          if (item.Name === name) {
            res.status(400).send({
              status: "error",
              message: `Name ${name} already taken.`,
            });
          } else
            res.status(400).send({
              status: "failure",
              message: `Account with email ${email} already exists.`,
            });
        });
      } else {
        const passwordHash = await hashPassword(password);
        await executeQuery(
          `INSERT INTO users (Name, Email, Password) VALUES ('${name}', '${email}', '${passwordHash}')`
        );
        res.status(200).send({
          status: "success",
          message: "User account created",
        });
      }
    }
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password)
      res
        .status(400)
        .send({ status: "failure", message: "Missing credentials" });
    else {
      const userData = await executeQuery(
        `SELECT * FROM users WHERE name='${name}'`
      );
      if (userData.length === 0)
        res
          .status(401)
          .json({ status: "error", message: "User does not exists" });
      else {
        console.log(`User data: `, userData);
        userData.forEach(async (user) => {
          const { idUser, Name, Email, Password } = user;
          const compareResult = await comparePasswords(password, Password);
          console.log(`Compare results: ${compareResult}`);
          if (compareResult) {
            const authJwt = await signJwtLoginToken(idUser);
            res.cookie("Authentication", `Bearer ${authJwt}`, {
              httpOnly: true,
            });
            res.status(200).json({
              message: "Success",
              user: {
                id: idUser,
                name: Name,
                email: Email,
              },
            });
          } else {
            res
              .status(401)
              .json({ status: "error", message: "Wrong password" });
          }
        });
        return;
      }
    }
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

module.exports = { registerController, loginController };
