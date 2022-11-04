const md5 = require("blueimp-md5");
const publickey = "447206eea52d640f139284e1ff91b427";
const privatekey = "e3ef29eea4905b95dba69beff1f208e154e92622";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const axios = require("axios");
async function getCharacterByID(id) {
  if(arguments.length!==1){
    throw "Invalid number of arguments";
  }
  if(id===null|| id===undefined){
    throw "Input undefined";
  }
  
  const url =
    baseUrl + "/" + id + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

  

  async function getCharacters() {
    const { data } = await axios.get(url);
    return data;
  }
  id = parseInt(id);
  if (typeof id !== "number") {
    throw "id must be a number";
  }
  const charactersCollection = await getCharacters();
  let character = [];

  let key = charactersCollection["data"];
  let results = key["results"];
  for (let i = 0; i < results.length; i++) {
    if (results[i]["id"] === id) {
      character = results[i];
    }
  }
 //return character;
 console.log(character);
}
getCharacterByID(1011334);
module.exports = { getCharacterByID };
