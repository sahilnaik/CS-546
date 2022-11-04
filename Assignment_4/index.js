const connection = require("./config/mongoConnection");
const restaurants = require("./data/restaurants");
let stepOneId = null;
let stepFiveId = null;
let stepThreeId = null;
const main = async () => {
  try {
    const stepOne = await restaurants.create(
      "  Saffron Lounge hotel",
      "New York City, NY",
      "123-456-7890",
      " http://www.saffronlunge.com",
      "$$$$",
      ["Cuban", "Italian"],
      3,
      { dineIn: true, takeOut: true, delivery: false }
    );
    stepOneId = stepOne._id;
  } catch (e) {
    console.log(e);
  }

  try {
    const stepTwo = await restaurants.get(stepOneId);
    console.log(stepTwo);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepThree = await restaurants.create(
      "Pizza Lounge",
      "New York City, New York",
      "999-999-9999",
      "http://www.pizzalounge.com",
      "$$$$",
      ["Italian"],
      5,
      { dineIn: false, takeOut: true, delivery: true }
    );
    stepThreeId = stepThree._id;
  } catch (error) {
    console.log(error);
  }

  try {
    const stepFour = await restaurants.getAll();
    console.log(stepFour);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepFive = await restaurants.create(
      "Black Bear",
      "Hoboken, New Jersey",
      "456-789-0123",
      "http://www.blackbear.com",
      "$$",
      ["Cuban", "American"],
      3,
      { dineIn: true, takeOut: true, delivery: true }
    );
    stepFiveId = stepFive._id;
  } catch (error) {
    console.log(error);
  }

  try {
    const stepSix = await restaurants.get(stepFiveId);
    console.log(stepSix);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepSeven = await restaurants.rename(
      stepOneId,
      "http://www.saffron.com"
    );
    // console.log("Step Seven: ", stepSeven);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepEight = await restaurants.get(stepOneId);
    console.log(stepEight);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepNine = await restaurants.remove(stepThreeId);
    console.log(stepNine);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepTen = await restaurants.getAll();
    console.log(stepTen);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepEleven = await restaurants.create(
      " The Test Restaurant",
      "City, New Jersey",
      "452789-0123",
      "htt://www.blackbear.com",
      "$$$$$",
      [1213],
      3,
      { dineIn: true, takeOut: true, delivery: true }
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const stepTwelve = await restaurants.remove("jnwikefikmqpxow");
    console.log(stepTwelve);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepThirteen = await restaurants.rename(
      "bwiejfuiogyiv",
      "http://www.rena.com"
    );
    console.log(stepThirteen);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepFourteen = await restaurants.rename(
      234,
      "http://errorrename.com"
    );
    console.log(stepFourteen);
  } catch (error) {
    console.log(error);
  }

  try {
    const stepFifteen = await restaurants.get("dvcwevcs");
    console.log(stepFifteen);
  } catch (error) {
    console.log(error);
  }

  const db = await connection();
  await db.serverConfig.close();
};

main();
