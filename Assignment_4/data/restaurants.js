const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

function errorHandle(pass) {
  if (typeof pass !== "string") {
    throw `${pass} not a string`;
  }
  if (pass.trim() === "") {
    throw `Empty input`;
  }
}
async function create(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  overallRating,
  serviceOptions
) {
  if (arguments.length !== 8) {
    throw "Check arguments passed";
  }
  if (
    name == null ||
    location == null ||
    phoneNumber == null ||
    website == null ||
    priceRange == null ||
    cuisines == null ||
    overallRating == null ||
    serviceOptions == null
  ) {
    throw `Input should not be empty`;
  }
  errorHandle(name);
  errorHandle(location);
  errorHandle(phoneNumber);
  errorHandle(website);
  errorHandle(priceRange);
  name = name.trim();
  location = location.trim();
  phoneNumber = phoneNumber.trim();
  website = website.trim();
  web = website.toLowerCase();
  priceRange = priceRange.trim();
  if (
    phoneNumber.at(3) !== "-" ||
    phoneNumber.at(7) !== "-" ||
    phoneNumber.length != 12
  ) {
    throw "Phone number invalid";
  }
  let str = "$$$$";
  if (!str.includes(priceRange)) {
    throw "Price invalid";
  }

  let checkSpaceInWebsite = website.split(" ");
  if (checkSpaceInWebsite.length > 1) {
    throw "Spaces provided in website";
  }

  let fHalf = website.substr(0, 11);

  let lhalf = website.substr(-4);
  let midStuff = website.substring(11, website.length - 4);
  if (midStuff.length < 5) {
    throw "Website length less than 5";
  }
  if (fHalf !== "http://www." || lhalf !== ".com") {
    throw `Not a valid website`;
  }

  if (!Array.isArray(cuisines)) {
    throw `Cuisines must be an array`;
  }
  if (cuisines.length === 0) {
    throw `Cuisines array is empty`;
  }

  cuisines.forEach((element) => {
    if (typeof element !== "string") {
      throw `Cuisine ${element} is not a string`;
    }
    if (element.trim().length === 0) {
      throw `Cuisines cannot be empty`;
    }
  });
  for (let i = 0; i < cuisines.length; i++) {
    cuisines[i] = cuisines[i].trim();
  }

  if (typeof overallRating !== "number") {
    throw `Rating not a number`;
  }
  if (overallRating < 0 || overallRating > 5) {
    throw `Overall rating must be from 0-5`;
  }
  if (typeof serviceOptions !== "object") {
    throw `Service options should be an object`;
  }
  if (
    typeof serviceOptions.dineIn !== "boolean" ||
    typeof serviceOptions.takeOut !== "boolean" ||
    typeof serviceOptions.delivery !== "boolean"
  ) {
    throw `Service options key-value pair invalid`;
  }
  const restaurantsCollection = await restaurants();
  const checkWebsite = await restaurantsCollection.findOne({
    website: website,
  });
  const checkPhone = await restaurantsCollection.findOne({
    phoneNumber: phoneNumber,
  });
  if (checkWebsite !== null) {
    let ch = checkWebsite.website.toLowerCase();
    // let web = website.toLowerCase();
    if (ch === web) {
      throw "Website provided already exists";
    }
  }
  if (checkPhone !== null) {
    if (checkPhone.phoneNumber === phoneNumber) {
      throw "Phone number provided already exists";
    }
  }

  let newRestaurant = {
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
  };

  // const restaurantsCollection = await restaurants();

  const insertInfo = await restaurantsCollection.insertOne(newRestaurant);
  if (insertInfo.insertedCount === 0) throw "Could not add restaurant";

  const newId = insertInfo.insertedId.toString();

  const resId = await this.get(newId.toString());
  return resId;
}
async function get(id) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }
  errorHandle(id);

  if (typeof id !== "string") throw "Id must be a string";
  let Id = ObjectId(id);

  if (!id) throw "You must provide an id to search for";
  const restaurantsCollection = await restaurants();
  const inputId = await restaurantsCollection.findOne({ _id: Id });
  if (inputId === null) {
    throw "No restaurants with that id";
  }

  inputId["_id"] = inputId["_id"].toString();

  return inputId;
}

async function getAll() {
  if (arguments.length !== 0) {
    throw "Check arguments passed";
  }
  const restaurantsCollection = await restaurants();
  const restaurantList = await restaurantsCollection.find({}).toArray();
  for (let i = 0; i < restaurantList.length; i++) {
    let temp = restaurantList[i];
    for (const key in temp) {
      if (key == "_id") {
        temp[key] = temp[key].toString();
      }
    }
  }
  return restaurantList;
}

async function remove(id) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  errorHandle(id);
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }

  id = ObjectId(id);

  if (!id) throw "You must provide an id to search for";

  const restaurantsCollection = await restaurants();
  const getName = await get(id.toString());

  const deletionInfo = await restaurantsCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete restaurant with id of ${id}`;
  }
  return `${getName.name} has been successfully deleted!`;
}

async function rename(id, newWebsite) {
  if (arguments.length !== 2) {
    throw "Check arguments passed";
  }
  if (ObjectId.isValid(id) === false) {
    throw `Error in id`;
  }
  errorHandle(id);
  errorHandle(newWebsite);
  newWebsite = newWebsite.trim();
  newWebsite = newWebsite.toLowerCase();
  let checkSpaceInWebsite = newWebsite.split(" ");
  if (checkSpaceInWebsite.length > 1) {
    throw "Spaces provided in website";
  }
  let fHalf = newWebsite.substr(0, 11);
  let lhalf = newWebsite.substr(-4);
  let midStuff = newWebsite.substring(11, newWebsite.length - 4);
  if (midStuff.length < 5) {
    throw "Website length less than 5";
  }
  if (fHalf !== "http://www." || lhalf !== ".com") {
    throw `Not a valid website`;
  }
  id = ObjectId(id);
  if (!id) throw "You must provide an id to search for";

  if (!newWebsite) throw "You must provide the new Website";

  const restaurantsCollection = await restaurants();
  const updateRestaurant = {
    website: newWebsite,
  };

  const updatedInfo = await restaurantsCollection.updateOne(
    { _id: id },
    { $set: updateRestaurant }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update restaurant successfully";
  }

  return await this.get(id.toString());
  // return `Website of Restaurant with id ${id} changed to ${newWebsite}`;
}

module.exports = {
  create,
  getAll,
  get,
  remove,
  rename,
};
