const axios = require("axios");
module.exports = () => {
  return (req, res, next) => {
    if (req.path.indexOf("admin") > -1) {
      const authToken = req.headers["authorization"];
      axios
        .get("http://localhost:4000/auth/verify", {
          headers: { authorization: authToken }
        })
        .then(response => {
          var { role, username } = response.data;
          if (role.toLowerCase() === "admin") {
            req.username = username;
            next();
          } else {
            res.status(403).send({
              msg: "unauthorized"
            });
          }
        })
        .catch(error => {
          res.status(403).send({ msg: "invalid token" });
        });
    } else {
      next();
    }
  };
};
