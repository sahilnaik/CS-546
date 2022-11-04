const characterRoutes = require("./characters");
const searchRoutes = require("./search");

const path = require("path");

const constructorMethod = (app) => {
  app.use("/characters", characterRoutes);
  app.use("/", searchRoutes);
  app.use("/search", searchRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};


module.exports = constructorMethod;
