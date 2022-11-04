const searchRoutes = require("./search");

const path = require("path");

const constructorMethod = (app) => {
  app.use("/", searchRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
