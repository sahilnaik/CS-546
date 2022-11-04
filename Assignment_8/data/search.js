const md5 = require("blueimp-md5");
const publickey = "447206eea52d640f139284e1ff91b427";
const privatekey = "e3ef29eea4905b95dba69beff1f208e154e92622";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const axios = require("axios");

async function searchCharacters(searchTerm) {
  if(arguments.length!==1){
    throw "Invalid number of arguments";
  }
  if(searchTerm===null || searchTerm===undefined ){
    throw "Input undefined"
  }
  if (typeof searchTerm !== "string") {
    throw "Seearch term must be a string";
  }
  
  if(searchTerm.trim() ===""){
    throw "Input empty"
  }

  
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&`;
  const url = baseUrl + "ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

  async function getCharacters() {
    const { data } = await axios.get(url);
    return data;
  }
  const charactersCollection = await getCharacters();
  let characterSearchRes = [];
  let characterObj = {};
  let key = charactersCollection["data"];
  let results = key["results"];
  for (let i = 0; i < results.length; i++) {
    let lowerCase = results[i]["name"].toLowerCase();
    if(characterSearchRes.length==20){
      break;
    }
    if (lowerCase.includes(searchTerm.toLowerCase())) {
      characterObj["name"] = results[i]["name"];
      characterObj["id"] = results[i]["id"];
      characterSearchRes.push(characterObj);
      characterObj = {};

    }
  }

  return characterSearchRes;

}

module.exports = { searchCharacters };
