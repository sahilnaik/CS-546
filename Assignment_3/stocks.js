const axios = require("axios");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data; // this will be the array of stocks objects
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function listShareholders() {
  const stock = await getStocks();
  const people = await getPeople();
  if (arguments.length > 0) {
    throw `Not expecting an argument here`;
  }
  let obj = {};
  let arr = [];
  let resultArray = [];
  stock.forEach((stockElement) => {
    let shareHolderObj = stockElement.shareholders;
    obj["id"] = stockElement.id;
    obj["stock_name"] = stockElement.stock_name;
    for (let i = 0; i < shareHolderObj.length; i++) {
      let shareHolderId = shareHolderObj[i].userId;

      people.forEach((peopleElement) => {
        let temp = {};
        let personId = peopleElement.id;
        if (shareHolderId == personId) {
          for (let j = 0; j < shareHolderObj.length; j++) {
            temp["first_name"] = peopleElement.first_name;
            temp["last_name"] = peopleElement.last_name;
            temp["number_of_shares"] = shareHolderObj[i].number_of_shares;
            if (!arr.includes(temp)) {
              arr.push(temp);
            }
          }
          // obj["shareholders"] = arr;
          // arr = [];

          // resultArray.push(obj);
          // obj = {};
        }
      });
    }
    obj["shareholders"] = arr;
    arr = [];

    resultArray.push(obj);
    obj = {};
  });
  return resultArray;
}
async function topShareholder(stockName) {
  const people = await getPeople();
  const stock = await getStocks();
  let temp = [];
  let max = 0;
  let fullName;
  let id = 0;
  let person;
  let statement;
  if (stockName === undefined || stockName === null) {
    throw "Stock name not defined";
  }
  if (typeof stockName !== "string") {
    throw "Invalid input type";
  }
  if (stockName.trim().length === 0) {
    throw "No input provided";
  }
  let ifExists = stock.find((stockN) => stockN.stock_name === stockName.trim());
  if (!ifExists) {
    throw `${stockName} does not exist`;
  }
  stock.forEach((stockElement) => {
    let stockNameinJSON = stockElement.stock_name;
    let stockNameinJSONTrim = stockNameinJSON.trim();
    let stockNameTrim = stockName.trim();

    if (stockNameinJSONTrim == stockNameTrim) {
      temp = stockElement.shareholders;
      if (temp.length == 0) {
        statement = `${stockName} currently has no shareholders.`;
      }
      for (let i = 0; i < temp.length; i++) {
        if (max < temp[i].number_of_shares) {
          max = temp[i].number_of_shares;
          id = temp[i].userId;
          person = people.find((person) => person.id === id);
          fullName = person.first_name + " " + person.last_name;
          statement = `With ${max} shares in ${stockName}, ${fullName} is the top shareholder.`;
        }
      }
    }
  });

  return statement;
}

async function listStocks(firstName, lastName) {
  function errorInListStocks(pass) {
    if (pass === undefined || pass === null) {
      throw "Name not defined";
    } else if (typeof pass !== "string") {
      throw "Invalid input type";
    }
    if (pass.trim().length == 0) {
      throw `No input provided`;
    }
  }
  errorInListStocks(firstName);
  errorInListStocks(lastName);
  const stock = await getStocks();
  const people = await getPeople();
  let firstNameTrim = firstName.trim();
  let lastNameTrim = lastName.trim();

  let person = people.find(
    (person) =>
      person.first_name === firstNameTrim && person.last_name === lastNameTrim
  );
  if (!person) {
    throw `${firstName} ${lastName} does not exist`;
  }
  let temp;
  let obj = {};
  let resArray = [];

  people.forEach((peopleElement) => {
    let firstNameInJSON = peopleElement.first_name;
    let lastNameInJSON = peopleElement.last_name;
    if (firstNameInJSON == firstNameTrim && lastNameInJSON == lastNameTrim) {
      temp = peopleElement.id;
      stock.forEach((stockElement) => {
        let innerTemp = stockElement.shareholders;
        for (i = 0; i < innerTemp.length; i++) {
          let userIdInsideStocks = innerTemp[i].userId;
          let shareNos = innerTemp[i].number_of_shares;
          let stockName = stockElement.stock_name;
          if (userIdInsideStocks === temp) {
            obj["stockName"] = stockName;
            obj["shareNos"] = shareNos;
            resArray.push(obj);
          }
          obj = {};
        }
      });
    }
  });
  if (resArray.length < 1) {
    throw `${firstName} ${lastName} owns no shares`;
  }
  return resArray;
}

async function getStockById(id) {
  if (id === undefined || id === null) {
    throw "ID not defined";
  }
  if (typeof id !== "string") {
    throw "Invalid ID type";
  }
  const stock = await getStocks();
  let stocks = stock.find((stocks) => stocks.id === id.trim());

  if (stocks) {
    return stocks;
  }
  throw "Stocks with id " + id + " not found";
}

module.exports = {
  listShareholders,
  topShareholder,
  listStocks,
  getStockById,
};
