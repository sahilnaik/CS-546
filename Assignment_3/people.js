const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
  if (id === undefined || id === null) {
    throw "ID not defined";
  }
  if (typeof id !== "string") {
    throw "Invalid ID type";
  }
  const data = await getPeople();
  let person = data.find((person) => person.id === id.trim());

  if (person) {
    return person;
  }
  throw "Person with id " + id + " not found";
}

async function sameStreet(streetName, streetSuffix) {
  function errorStreet(pass) {
    if (pass === undefined || pass === null) {
      throw "Argument not defined";
    }
    if (typeof pass !== "string") {
      throw "Invalid argument passed";
    }
    if (pass.trim().length == 0) {
      throw `No input provided`;
    }
  }
  errorStreet(streetName);
  errorStreet(streetSuffix);
  let streetNameTrim = streetName.trim();
  let streetSuffixTrim = streetSuffix.trim();
  let streetNameCase =
    streetNameTrim.charAt(0).toUpperCase() +
    streetNameTrim.slice(1).toLowerCase();
  let streetSuffixCase =
    streetSuffixTrim.charAt(0).toUpperCase() +
    streetSuffixTrim.slice(1).toLowerCase();
  const data = await getPeople();
  let personArr = data.filter(
    (person) =>
      (person.address.home.street_name === streetNameCase &&
        person.address.home.street_suffix === streetSuffixCase) ||
      (person.address.work.street_name === streetNameCase &&
        person.address.work.street_suffix === streetSuffixCase)
  );
  if (personArr.length < 2) {
    throw `Two or more people do not work or live at ${streetNameCase} & ${streetSuffixCase}`;
  }
  return personArr;
}

async function manipulateSsn() {
  let temp;
  let number = 0;
  let lowest = 0;
  let highest = 0;
  let lowestName = {};
  let highestName = {};
  let avg = 0;
  let count = 0;
  let total = 0;
  let finalObj = {};
  let argLen = arguments.length;
  if (arguments.length > 0) {
    throw `Not expecting an argument here`;
  }
  const data = await getPeople();
  data.forEach((data) => {
    let Ssn = data.ssn;
    count++;
    let sorted = Ssn.split("").sort();
    arrayStr = [...sorted];
    number = parseInt(arrayStr.join("").replace(/\D/g, ""));
    //  console.log(number);
    if (lowest === 0 || number < lowest) {
      lowest = number;
      lowestName["firstName"] = data.first_name;
      lowestName["lastName"] = data.last_name;
    }
    if (highest === 0 || number > highest) {
      highest = number;
      highestName["firstName"] = data.first_name;
      highestName["lastName"] = data.last_name;
    }
    total = total + number;
  });
  avg = Math.floor(total / count);
  finalObj["highest"] = highestName;
  finalObj["lowest"] = lowestName;
  finalObj["average"] = avg;
  return finalObj;
}

async function sameBirthday(month, day) {
  const data = await getPeople();
  let arr = [];
  let monthParse = parseInt(month);
  let dayParse = parseInt(day);
  if (
    month === undefined ||
    month === null ||
    day === undefined ||
    day === null
  ) {
    throw "Date not defined";
  }
  if (typeof month !== "number") {
    if (typeof month !== "string") {
      throw "Argument type invalid";
    }
  }
  if (isNaN(monthParse) || isNaN(dayParse)) {
    throw "Argument type invalid";
  }
  if (typeof day !== "number") {
    if (typeof day !== "string") {
      throw "Argument type invalid";
    }
  }

  if (month > 12 || day > 31 || month < 1 || day < 1) {
    throw "Date is invalid";
  }
  if (month == 2 && day > 28) {
    throw `There are not ${day} days in February`;
  }
  if (month < 8) {
    if (month % 2 == 0 && day > 30) {
      throw `There are not ${day} days in the ${month}th month`;
    }
    if (month % 2 != 0 && day > 31) {
      throw `There are not ${day} days in the ${month}th month`;
    }
  }
  if (month >= 8) {
    if (month % 2 == 0 && day > 31) {
      throw `There are not ${day} days in the ${month}th month`;
    }
    if (month % 2 != 0 && day > 30) {
      throw `There are not ${day} days in the ${month}th month`;
    }
  }
  data.forEach((data) => {
    let conv = data.date_of_birth.split("/");
    let jsonMonth = parseInt(conv[0]);
    let jsonDay = parseInt(conv[1]);

    if (month == jsonMonth && day == jsonDay) {
      let fullName = data.first_name + " " + data.last_name;
      arr.push(fullName);
    }
  });
  if (arr.length < 1) {
    throw `No birthdays found on the given date`;
  }
  return arr;
}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
};
