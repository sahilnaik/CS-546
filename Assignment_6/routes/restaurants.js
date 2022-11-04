const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantsData = data.restaurants;
let { ObjectId } = require("mongodb");

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  try {
    const restaurant = await restaurantsData.get(req.params.id);

    res.json(restaurant);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const restaurantList = await restaurantsData.getAll();

    res.json(restaurantList);
  } catch (e) {
    res.status(500).json({ error: "Data not found" });
  }
});

router.post("/", async (req, res) => {
  const addRes = req.body;
  if (Object.keys(addRes).length !== 7) {
    res.status(400).json({ error: `Check arguments passed` });
    return;
  }
  if (
    addRes.name === null ||
    addRes.location === null ||
    addRes.phoneNumber === null ||
    addRes.website === null ||
    addRes.priceRange === null
  ) {
    res
      .status(400)
      .json({ error: "You must provide all the details for restaurant" });
    return;
  }

  if (
    typeof addRes.name !== "string" ||
    typeof addRes.location !== "string" ||
    typeof addRes.phoneNumber !== "string" ||
    typeof addRes.website !== "string" ||
    typeof addRes.priceRange !== "string"
  ) {
    res.status(400).json({ error: "Invalid input type provided" });
    return;
  }
  if (
    addRes.name.trim() == "" ||
    addRes.location.trim() == "" ||
    addRes.phoneNumber.trim() == "" ||
    addRes.website.trim() == "" ||
    addRes.priceRange.trim() == ""
  ) {
    res.status(400).json({ error: "Empty input provided" });
    return;
  }
  addRes.name = addRes.name.trim();
  addRes.location = addRes.location.trim();
  addRes.phoneNumber = addRes.phoneNumber.trim();
  addRes.website = addRes.website.trim();
  web = addRes.website.toLowerCase();
  addRes.priceRange = addRes.priceRange.trim();

  if (
    addRes.phoneNumber.at(3) !== "-" ||
    addRes.phoneNumber.at(7) !== "-" ||
    addRes.phoneNumber.length != 12
  ) {
    res.status(400).json({ error: "Phone number is not valid" });
    return;
  }
  let num = addRes.phoneNumber;
  const checkForLetters = (num) =>
    [...num].every((c) => "0123456789-".includes(c));

  if (checkForLetters(num) === false) {
    res.status(400).json({ error: "Phone number invalid" });
    return;
  }
  let str = "$$$$";
  if (!str.includes(addRes.priceRange)) {
    res.status(400).json({ error: "Price invalid" });
    return;
  }

  let checkSpaceInWebsite = addRes.website.split(" ");
  if (checkSpaceInWebsite.length > 1) {
    res.status(400).json({ error: "Spaces provided in website" });
    return;
  }

  let fHalf = addRes.website.substr(0, 11);

  let lhalf = addRes.website.substr(-4);
  let midStuff = addRes.website.substring(11, addRes.website.length - 4);
  if (midStuff.length < 5) {
    res.status(400).json({ error: "Website length less than 5" });
    return;
  }
  if (fHalf !== "http://www." || lhalf !== ".com") {
    res.status(400).json({ error: "Not a valid website" });
    return;
  }

  if (!Array.isArray(addRes.cuisines)) {
    res.status(400).json({ error: "Cuisines must be an array" });
    return;
  }
  if (addRes.cuisines.length === 0) {
    res.status(400).json({ error: "Cuisines array is empty" });
    return;
  }

  for (let i = 0; i < addRes.cuisines.length; i++) {
    if (typeof addRes.cuisines[i] !== "string") {
      res.status(400).json({ error: "Cuisine provided is not a string" });
      return;
    }
    if (addRes.cuisines[i].trim().length === 0) {
      res.status(400).json({ error: "Cuisines cannot be empty" });
      return;
    }
    addRes.cuisines[i] = addRes.cuisines[i].trim();
  }
  if (typeof addRes.serviceOptions !== "object") {
    res.status(400).json({ error: "Service options should be an object" });
    return;
  }
  if (
    typeof addRes.serviceOptions.dineIn !== "boolean" ||
    typeof addRes.serviceOptions.takeOut !== "boolean" ||
    typeof addRes.serviceOptions.delivery !== "boolean"
  ) {
    res.status(400).json({ error: "Service options key-value pair invalid" });
    return;
  }
  try {
    const addRestaurant = await restaurantsData.create(
      addRes.name,
      addRes.location,
      addRes.phoneNumber,
      addRes.website,
      addRes.priceRange,
      addRes.cuisines,
      addRes.serviceOptions
    );
    res.json(addRestaurant);
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
});

router.put("/:id", async (req, res) => {
  const updateRes = req.body;
  let id = req.params.id;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  if (Object.keys(updateRes).length !== 7) {
    res.status(400).json({ error: `Check arguments passed` });
    return;
  }
  if (updateRes.cuisines == null || updateRes.serviceOptions == null) {
    res.status(400).json({ error: `Input should not be empty` });
  }
  if (
    updateRes.name === null ||
    updateRes.location === null ||
    updateRes.phoneNumber === null ||
    updateRes.website === null ||
    updateRes.priceRange === null
  ) {
    res
      .status(400)
      .json({ error: "You must provide all the details for restaurant" });
    return;
  }

  if (
    typeof updateRes.name !== "string" ||
    typeof updateRes.location !== "string" ||
    typeof updateRes.phoneNumber !== "string" ||
    typeof updateRes.website !== "string" ||
    typeof updateRes.priceRange !== "string"
  ) {
    res.status(400).json({ error: "Invalid input type provided" });
    return;
  }
  if (
    updateRes.name.trim() == "" ||
    updateRes.location.trim() == "" ||
    updateRes.phoneNumber.trim() == "" ||
    updateRes.website.trim() == "" ||
    updateRes.priceRange.trim() == ""
  ) {
    res.status(400).json({ error: "Empty input provided" });
    return;
  }
  updateRes.name = updateRes.name.trim();
  updateRes.location = updateRes.location.trim();
  updateRes.phoneNumber = updateRes.phoneNumber.trim();
  updateRes.website = updateRes.website.trim();
  web = updateRes.website.toLowerCase();
  updateRes.priceRange = updateRes.priceRange.trim();

  if (
    updateRes.phoneNumber.at(3) !== "-" ||
    updateRes.phoneNumber.at(7) !== "-" ||
    updateRes.phoneNumber.length != 12
  ) {
    res.status(400).json({ error: "Phone number is not valid" });
    return;
  }
  let num = updateRes.phoneNumber;
  const checkForLetters = (num) =>
    [...num].every((c) => "0123456789-".includes(c));

  if (checkForLetters(num) === false) {
    res.status(400).json({ error: "Phone number invalid" });
    return;
  }

  let str = "$$$$";
  if (!str.includes(updateRes.priceRange)) {
    res.status(400).json({ error: "Price invalid" });
    return;
  }

  let checkSpaceInWebsite = updateRes.website.split(" ");
  if (checkSpaceInWebsite.length > 1) {
    res.status(400).json({ error: "Spaces provided in website" });
    return;
  }

  let fHalf = updateRes.website.substr(0, 11);

  let lhalf = updateRes.website.substr(-4);
  let midStuff = updateRes.website.substring(11, updateRes.website.length - 4);
  if (midStuff.length < 5) {
    res.status(400).json({ error: "Website length less than 5" });
    return;
  }
  if (fHalf !== "http://www." || lhalf !== ".com") {
    res.status(400).json({ error: "Not a valid website" });
    return;
  }

  if (!Array.isArray(updateRes.cuisines)) {
    res.status(400).json({ error: "Cuisines must be an array" });
    return;
  }
  if (updateRes.cuisines.length === 0) {
    res.status(400).json({ error: "Cuisines array is empty" });
    return;
  }

  for (let i = 0; i < updateRes.cuisines.length; i++) {
    if (typeof updateRes.cuisines[i] !== "string") {
      res.status(400).json({ error: "Cuisine provided is not a string" });
      return;
    }
    if (updateRes.cuisines[i].trim().length === 0) {
      res.status(400).json({ error: "Cuisines cannot be empty" });
      return;
    }
    updateRes.cuisines[i] = updateRes.cuisines[i].trim();
  }
  if (typeof updateRes.serviceOptions !== "object") {
    res.status(400).json({ error: `Service options should be an object` });
    return;
  }
  if (
    typeof updateRes.serviceOptions.dineIn !== "boolean" ||
    typeof updateRes.serviceOptions.takeOut !== "boolean" ||
    typeof updateRes.serviceOptions.delivery !== "boolean"
  ) {
    res.status(400).json({ error: `Service options key-value pair invalid` });
    return;
  }

  try {
    const updateRestaurant = await restaurantsData.update(
      req.params.id,
      updateRes.name,
      updateRes.location,
      updateRes.phoneNumber,
      updateRes.website,
      updateRes.priceRange,
      updateRes.cuisines,
      updateRes.serviceOptions
    );
    res.json(updateRestaurant);
  } catch (e) {
    if (e == "No restaurants with that id") {
      res.status(404).json({ error: e });
    } else {
      res.status(500).json({ error: e });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  try {
    const restaurant = await restaurantsData.remove(req.params.id);

    res.json(restaurant);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});
module.exports = router;
