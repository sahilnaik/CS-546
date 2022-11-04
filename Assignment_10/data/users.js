const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcryptjs");
const saltRounds = 16;
let { ObjectId } = require("mongodb");
function hasWhiteSpace(pass) {
  return pass.indexOf(" ") >= 0;
}
function errorHandle(pass) {
  if (typeof pass !== "string") {
    throw `${pass} not a string`;
  }
  if (pass.trim() === "") {
    throw `Empty input`;
  }
}
async function createUser(username, password) {
  if (arguments.length !== 2) {
    throw `Check arguments passed`;
  }
  if (username == null || password == null) {
    throw `Input should not be empty`;
  }
  errorHandle(username);
  errorHandle(password);
  username = username.trim();
  username = username.toLowerCase();
  password = password.trim();
  if (!username.match(/^[0-9a-z]+$/)) {
    throw `Username should only contain alphanumeric characters`;
  }

  if (hasWhiteSpace(username)) {
    throw `Username should not contain spaces`;
  }

  if (hasWhiteSpace(password)) {
    throw `Password should not contain spaces`;
  }
  if (username.length < 4) {
    throw `Username should be atleast 4 characters long`;
  }
  if (password.length < 6) {
    throw `Password should be at least 6 characters`;
  }

  const usersCollection = await users();
  const duplicateUsername = await usersCollection.findOne({
    username: username,
  });
 
  if (duplicateUsername !== null) {
    throw `Username already exists`;
  }
  const hash = await bcrypt.hash(password, saltRounds);

  let newUser = {
    username: username,
    password: hash,
    
  };
  let resObj = { userInserted: true };
  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) {
    throw `Internal Server Error`;
  } else {
    return resObj;
  }
}

async function checkUser(username, password) {
  if (arguments.length !== 2) {
    throw `Check arguments passed`;
  }
  if (username == null || password == null) {
    throw `Input should not be empty`;
  }
  errorHandle(username);
  errorHandle(password);
  username = username.trim();
  username = username.toLowerCase();
  password = password.trim();
  if (!username.match(/^[0-9a-z]+$/)) {
    throw `Username should only contain alphanumeric characters`;
  }
  if (hasWhiteSpace(username)) {
    throw `Username should not contain spaces`;
  }
  if (hasWhiteSpace(password)) {
    throw `Password should not contain spaces`;
  }
  if (username.length < 4) {
    throw `Username should be atleast 4 characters long`;
  }
  if (password.length < 6) {
    throw `Password should be at least 6 characters`;
  }
  const usersCollection = await users();
  const findUser = await usersCollection.findOne({ username: username });
  if (findUser === null) {
    throw `Either the username or password is invalid`;
  }
  const passwordCorrect = await bcrypt.compare(password, findUser.password);
  let resObj = { authenticated: true };
  if (!passwordCorrect) {
    throw `Either the username or password is invalid`;
  } else {
    return resObj;
  }
}

  



module.exports = {
  createUser,
  checkUser,
};
