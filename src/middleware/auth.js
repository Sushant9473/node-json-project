const auth = require("basic-auth");

const authenticate = (req, res, next) => {
  const user = auth(req);

  if (!user || user.name !== "admin" || user.pass !== "password") {
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Authentication required.");
    return;
  }

  next();
};

module.exports = authenticate;
