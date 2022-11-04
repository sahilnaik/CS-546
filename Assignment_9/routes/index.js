const palindromeRoute = require("./palindrome");
const constructorMethod = (app) => {
  app.use("/", palindromeRoute);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
