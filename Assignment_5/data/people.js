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
    throw "Id must be of type string";
  }
  const peopleCollection = await getPeople();
  let person = await peopleCollection.find((person) => person.id === id.trim());

  if (person) {
    return person;
  }

  throw "Person with id " + id + " not found";
}

async function getAllPeople() {
  const peopleCollection = await getPeople();
  let peopleList = await peopleCollection;
  return peopleList;
}

module.exports = {
  getPersonById,
  getAllPeople,
};
