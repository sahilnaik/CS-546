const average = function average(array) {
  let innerSum = 0;
  let sum = 0;
  let count = 0;
  let avg = 0;
  errorHandle(array);
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let innerArray = array[i];
      if (innerArray.length == 0) {
        throw `Array no. ${i + 1} is empty`;
      }
      if (!Array.isArray(innerArray)) {
        throw `Element no. ${i + 1} is not an array`;
      }
      for (let j = 0; j < innerArray.length; j++) {
        if (typeof innerArray[j] === "string") {
          throw "Only numeric value needed";
        }

        innerSum = innerSum + innerArray[j];
        count++;
      }
      sum = sum + innerSum;
      innerSum = 0;
    }
    avg = Math.round(sum / count);
  }
  return avg;
};

function modeSquared(array) {
  let mode = 0;
  let check = 0;
  let count = 0;
  let max = 0;
  errorHandle(array);
  let modeArray = [];

  for (let i = 0; i < array.length; i++) {
    check = array[i];
    if (typeof check === "string") {
      throw "Only numeric values needed";
    }
    for (let j = 0; j < array.length; j++) {
      if (check == array[j]) {
        count++;
      }
      if (count > max && count > 1) {
        max = count;
        mode = check;
        modeArray = [];
        modeArray.push(mode);

        if (max == 1) {
          mode = 0;
        }
      }
      if (count == max && max > 1) {
        modeArray.push(check);
      }
    }
    count = 0;
  }
  let finalArray = [];
  let modeFinal = 0;
  for (let i = 0; i < modeArray.length; i++) {
    if (!finalArray.includes(modeArray[i])) {
      finalArray.push(modeArray[i]);
    }
  }
  finalArray.forEach((element) => {
    modeFinal = modeFinal + Math.pow(element, 2);
  });
  return modeFinal;
};
function errorHandle(pass) {
  if (!Array.isArray(pass)) {
    throw "Array input required";
  }
  if (pass.length == 0) {
    throw "Empty array";
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
const medianElement = function medianElement(array) {
  errorHandle(array);
  let arr = [...array];
  //Referred this link for sorting numerically https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
  arr.sort((a, b) => a - b);
  let mid = Math.round(arr.length / 2);
  let median = 0;
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
      throw "Only numeric values needed";
    }
  }
  if (arr.length > 1) {
    if (arr.length % 2 == 0) {
      median = (arr[mid] + arr[mid - 1]) / 2;
      let highMid = array.lastIndexOf(arr[mid]);
      let lowMid = array.lastIndexOf(arr[mid - 1]);
      if (array.includes(median)) {
        obj[median] = array.indexOf(median);
      } else if (highMid > lowMid) {
        obj[median] = highMid;
      } else {
        obj[median] = lowMid;
      }
    } else {
      obj[arr[mid - 1]] = array.indexOf(arr[mid - 1]);
    }
    return obj;
  }
};

const merge = function merge(arrayOne, arrayTwo) {
  let finalArray = [];
  let numArray = [];
  let upperArray = [];
  let lowerArray = [];
  errorHandle(arrayOne);
  errorHandle(arrayTwo);
  let resArray = [...arrayOne, ...arrayTwo];

  errorHandle(resArray);
  //resArray.sort();

  for (let i = 0; i < resArray.length; i++) {
    let outerArrVal = resArray[i];
    if (resArray[i].length > 1) {
      throw `Length of String ${i + 1} is greater than 1`;
    }
    if (typeof resArray[i] === "string") {
      let outerAsc = outerArrVal.charCodeAt(0);
      if (outerAsc < 91) {
        upperArray.push(resArray[i]);
      } else if (outerAsc < 123) {
        lowerArray.push(resArray[i]);
      }
    } else {
      numArray.push(resArray[i]);
    }
  }
  upperArray.sort();
  lowerArray.sort();
  numArray.sort();
  finalArray = [...lowerArray, ...upperArray, ...numArray];
  return finalArray;
};

module.exports = {
  average,
  modeSquared,
  medianElement,
  merge,
};
