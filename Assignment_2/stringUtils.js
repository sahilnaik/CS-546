function errorHandle(pass) {
  if (typeof pass !== "string") {
    throw "Not a string";
  }
  if (pass.length == 0) {
    throw "Empty string";
  }
  if (pass == undefined) {
    throw "Array does not exist";
  }
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] == null) {
      throw "Null not accepted";
    }
  }
}

const sortString = function sortString(string) {
  let upperString = [];
  let lowerString = [];
  let numbers = [];
  let specChar = [];
  let space = [];
  let finalArray = [];
  let sortedString;
  errorHandle(string);
  let sortArr = string.split("");
  sortArr.forEach((l) => {
    if (l.charCodeAt(0) < 91 && l.charCodeAt(0) > 64) {
      upperString.push(l);
    } else if (l.charCodeAt(0) < 123 && l.charCodeAt(0) > 96) {
      lowerString.push(l);
    } else if (l.charCodeAt(0) < 58 && l.charCodeAt(0) > 47) {
      numbers.push(l);
    } else if (l.charCodeAt(0) == 32) {
      space.push(l);
    } else {
      specChar.push(l);
    }
  });
  upperString.sort();
  lowerString.sort();
  numbers.sort();
  specChar.sort();
  finalArray = [
    ...upperString,
    ...lowerString,
    ...specChar,
    ...numbers,
    ...space,
  ];
  sortedString = finalArray.join("");
  return sortedString;
};

const replaceChar = function replaceChar(string, idx) {
  errorHandle(string);
  if (idx <= 0 || idx == undefined || idx > string.length - 3) {
    throw "Index invalid";
  }
  if (typeof idx !== "number") {
    throw "Index is not a number";
  }
  let strArray = string.split("");
  let indexChar = strArray[idx];
  let flag = 0;
  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i] == indexChar) {
      let prev = strArray[idx - 1];
      let next = strArray[idx + 1];
      for (let j = 0; j < strArray.length; j++) {
        if (strArray[j] == indexChar && flag == 0 && j != idx) {
          strArray[j] = prev;
          flag = 1;
        } else if (strArray[j] == indexChar && flag == 1 && j != idx) {
          strArray[j] = next;
          flag = 0;
        }
      }
    }
  }
  return strArray.join("");
};
function emptySpaceError(pass) {
  if (typeof pass === "string") {
    if (pass.trim() == "") {
      throw "Empty string";
    }
  }
}
const mashUp = function mashUp(string1, string2, ch) {
  emptySpaceError(string1);
  emptySpaceError(string2);
  emptySpaceError(ch);
  errorHandle(string1);
  errorHandle(string2);
  errorHandle(ch);

  if (ch.length > 1) {
    throw "Length of third parameter greater than 1";
  }
  let strArray1 = string1.split("");
  let strArray2 = string2.split("");
  let finalArray = [];
  let diff = Math.abs(strArray1.length - strArray2.length);
  let i = 0;
  if (strArray1.length > strArray2.length) {
    pushCh(strArray2);
  } else if (strArray1.length < strArray2.length) {
    pushCh(strArray1);
  }
  function pushCh(pushArray) {
    while (i < diff) {
      pushArray.push(ch);
      i++;
    }
  }
  for (let j = 0; j < strArray2.length; j++) {
    finalArray.push(strArray1[j]);
    finalArray.push(strArray2[j]);
  }
  return finalArray.join("");
};

module.exports = {
  sortString,
  replaceChar,
  mashUp,
};
