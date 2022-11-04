const express = require("express");
const router = express.Router();
const usersData = require("../data/users");
function hasWhiteSpace(pass) {
  return pass.indexOf(" ") >= 0;
}

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/private");
  } else {
    res.render("pages/login", {
      title: "Log In",
    });
  }
});

router.post("/login", async (req, res) => {
  const getData = req.body;
  let username = getData.username;
  let password = getData.password;
  if (username == null || password == null) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Input should not be empty",
    });
    return;
  }
  if (typeof username !== "string") {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: `Input username not a string`,
    });
    return;
  }
  if (typeof password !== "string") {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: `Input password is not a string`,
    });
    return;
  }
  if (username.trim() === "") {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: `Empty username`,
    });
    return;
  }
  if (password.trim() === "") {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: `Empty password`,
    });
    return;
  }

  username = username.trim();
  username = username.toLowerCase();
  password = password.trim();
  if (!username.match(/^[0-9a-z]+$/)) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Username should only contain alphanumeric characters",
    });
    return;
  }

  if (hasWhiteSpace(username)) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Username should not contain spaces",
    });
    return;
  }

  if (hasWhiteSpace(password)) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Password should not contain spaces",
    });
    return;
  }
  if (username.length < 4) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Username should be atleast 4 characters long",
    });
    return;
  }
  if (password.length < 6) {
    res.status(400);
    res.render("pages/login", {
      title: "Login Page",
      error: "Password should be at least 6 characters",
    });
    return;
  }
  try {
    const userValidate = await usersData.checkUser(username, password);
    if (userValidate["authenticated"] === true) {
      req.session.user = { username: username };
      return res.redirect("/private");
    } else {
      res.status(500).json({ error: "Internal Server error" });
      return;
    }
  } catch (e) {
    res.status(400);
    res.render("pages/login", { title: "Login Page", error: e });
    return;
  }
});

router.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/private");
  } else {
    res.render("pages/signup", {
      title: "Sign Up",
    });
    return;
  }
});
router.post("/signup", async (req, res) => {
  const getData = req.body;
  let username = getData.username;
  let password = getData.password;
  if (username == null || password == null) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Input should not be empty",
    });
    return;
  }
  if (typeof username !== "string") {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: `Input username not a string`,
    });
    return;
  }
  if (typeof password !== "string") {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: `Input password is not a string`,
    });
    return;
  }
  if (username.trim() === "") {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: `Empty username`,
    });
    return;
  }
  if (password.trim() === "") {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: `Empty password`,
    });
    return;
  }

  username = username.trim();
  username = username.toLowerCase();
  password = password.trim();
  if (!username.match(/^[0-9a-z]+$/)) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Username should only contain alphanumeric characters",
    });
    return;
  }

  if (hasWhiteSpace(username)) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Username should not contain spaces",
    });
    return;
  }

  if (hasWhiteSpace(password)) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Password should not contain spaces",
    });
    return;
  }
  if (username.length < 4) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Username should be atleast 4 characters long",
    });
    return;
  }
  if (password.length < 6) {
    res.status(400);
    res.render("pages/signup", {
      title: "Signup Page",
      error: "Password should be at least 6 characters",
    });
    return;
  }
  try {
    const userCreate = await usersData.createUser(username, password);
    if (userCreate["userInserted"] === true) {
      res.redirect("/");
    } else {
      res.status(500);
      res.render("pages/error", {
        title: "Error",
        error: "Internal server error",
      });
      return;
    }
  } catch (e) {
    if (e === "Internal Server Error") {
      res.status(500);
      res.render("pages/error", {
        title: "Error",
        error: "Internal server error",
      });
      return;
    } else {
      res.status(400);
      res.render("pages/signup", {
        title: "Signup Page",
        error: e,
      });
      return;
    }
  }
});

router.get("/private", (req, res) => {
  if (req.session.user) {
    return res.render("pages/private", {
      title: "Private",
      user: req.session.user.username,
    });
  } else {
    return res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("AuthCookie");
  res.render("pages/logout", {title: "Logged out"});
});
module.exports = router;
