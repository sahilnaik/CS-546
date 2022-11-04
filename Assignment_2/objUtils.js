const computeObjects = function computeObjects(arrayObjs, func) {
  if (!Array.isArray(arrayObjs)) {
    throw "Input not an array";
  }
  if (typeof func === "function") {
    if (arrayObjs.length < 1) {
      throw "Input should have atleast 1 element";
    }
    arrayObjs.forEach((element) => {
      if (Array.isArray(element)) {
        throw "Array passed instead of object";
      }
      if (typeof element === "object") {
        let objKey = Object.keys(element);

        if (objKey.length == 0) {
          throw "Object is empty";
        }
        for (let i = 0; i < objKey.length; i++) {
          if (typeof element[objKey[i]] !== "number") {
            throw "Object value type not a number";
          }
          let ans = func(element[objKey[i]]);
          element[objKey[i]] = ans;
        }
      } else {
        throw "Input not an object";
      }
    });

    function resArray(array) {
      let res = {};
      array.forEach((e) => {
        Object.keys(e).forEach((k) => {
          // Referred to the addition part from https://stackoverflow.com/questions/35720986/add-values-of-matching-keys-in-array-of-objects/35721093
          res[k] = (res[k] || 0) + e[k];
        });
      });
      return res;
    }
    return resArray(arrayObjs);
  } else {
    throw "Second parameter not a function";
  }
};

const commonKeys = function commonKeys(obj1, obj2) {
  let res = {};
  let temp = {};
  function errorHandle(pass) {
    if (typeof pass !== "object") {
      throw "Input not an object";
    }
    if (pass == undefined) {
      throw "Input undefined";
    }
  }
  errorHandle(obj1);
  errorHandle(obj2);
  for (key1 in obj1) {
    if (typeof obj1[key1] === "object") {
      let nest1 = obj1[key1];
      for (keyNest1 in nest1) {
        for (key2 in obj2) {
          if (typeof obj2[key2] === "object") {
            let nest2 = obj2[key2];
            for (keyNest2 in nest2) {
              if (nest1[keyNest1] == nest2[keyNest2] && keyNest1 == keyNest2) {
                temp[keyNest1] = nest1[keyNest2];
                res[key1] = temp;
              }
            }
          }
          if (nest1[keyNest1] == obj2[key2] && keyNest1 == key2) {
            res[keyNest1] = nest1[key2];
          }
        }
      }
    }
    for (key2 in obj2) {
      if (typeof obj2[key2] === "object") {
        let nest2 = obj2[key2];
        for (keyNest2 in nest2) {
          if (obj1[key1] == nest2[keyNest2] && key1 == keyNest2) {
            res[key1] = obj1[keyNest2];
          }
        }
      }
      if (obj1[key1] == obj2[key2] && key1 == key2) {
        res[key1] = obj1[key2];
      }
    }
  }
  return res;
};

const flipObject = function flipObject(object) {
  let res = {};
  let temp = {};
  let innerTemp = {};
  function errorHandle(pass) {
    if (typeof pass !== "object") {
      throw "Input not an object";
    }
    if (pass == undefined) {
      throw "Input undefined";
    }
  }
  errorHandle(object);
  for (key in object) {
    if (typeof object[key] === "object") {
      let nest = object[key];
      if (Array.isArray(nest)) {
        for (let i = 0; i < nest.length; i++) {
          if (typeof nest[i] === "object") {
            throw "Object found within array";
          }
          res[nest[i]] = key;
        }
      } else {
        for (keyNest in nest) {
          /////////////////////////////////////
          if (typeof nest[key] === "object") {
            let innerNest = nest[key];
            if (Array.isArray(innerNest)) {
              for (let i = 0; i < innerNest.length; i++) {
                if (typeof innerNest[i] === "object") {
                  throw "Object found within array";
                }
                res[nest[innerNest[i]]] = keyNest;
              }
            }
            for (innerKey in innerNest) {
              innerTemp[innerNest[innerKey]] = innerKey;
              innerRes[innerKey] = innerTemp;
            }
          }
          ////////////////////////////////////////////
          else {
            if (typeof nest[key] === "object") {
              res[innerKey] = innerTemp;
            } else {
              temp[nest[keyNest]] = keyNest;
              res[key] = temp;
            }
          }
        }
      }
    }
    // else if (Array.isArray(object[key])) {
    //   console.log("-------------------------");
    //   console.log(object[key]);
    //   for (element in object[key]) {
    //     console.log(element);
    //     console.log("-----------------------");
    //     res[element] = key;
    //   }
    // }
    else {
      res[object[key]] = key;
    }
  }
  return res;
};
module.exports = {
  computeObjects,
  commonKeys,
  flipObject,
};
