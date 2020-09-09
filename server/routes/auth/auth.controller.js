const { executeQuery } = require("../../database");
const { passwordService } = require("../../utils");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      res
        .status(400)
        .send({ status: "failure", message: "Passwords don't match" });
    } else {
      const userData = await executeQuery(
        `SELECT * FROM  Users WHERE Name = '${name}' OR Email = '${email}'`
      );

      if (userData.length) {
        userData.forEach((item) => {
          if (item.Name === name) {
            res.status(400).send({
              status: "failure",
              message: `Name ${name} already taken.`,
            });
          } else
            res.status(400).send({
              status: "failure",
              message: `Account with email ${email} already exists.`,
            });
        });
      } else {
        const passwordHash = await passwordService.hashPassword(password);
        await executeQuery(
          `INSERT INTO Users (Name, Email, Password) VALUES ('${name}', '${email}', '${passwordHash}')`
        );
        res.status(200).send({
          status: "success",
          message: "User account created.",
        });
      }
    }
  } catch (e) {
    console.log("Error: ", e);
    res
      .status(500)
      .send({ status: "failure", message: "Internal server error" });
  }
};

const loginController = (req, res, next) => {};

module.exports = registerController;
