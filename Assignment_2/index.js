const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

//Average
try {
  const avgTest2 = arrayUtils.average([
    [1, 3],
    [2, 4, 5],
  ]);
  console.log(avgTest2);
} catch (error) {
  console.error("Test failed", error);
}
// Output: 3

try {
  const avgTest3 = arrayUtils.average([
    [1, 3],
    ["hi", 4, 5],
  ]);
  console.log(avgTest3);
} catch (error) {
  console.error("Test failed", error);
}
//Error

//-------------------Average end----------------------//

//------------------Mode Squared Start------------------//

//Mode Squared
try {
  const modeTest1 = arrayUtils.modeSquared([1, 2, 3, 3, 4, 4, 5, 5]);
  console.log(modeTest1);
} catch (error) {
  console.error("Test failed", error);
}
// Output: 50

try {
  const modeTest3 = arrayUtils.modeSquared(["banana"]);
  console.log(modeTest3);
} catch (error) {
  console.error("Test failed", error);
}

//-----------------------Mode squared end---------------------------
//Median
//----------------------Median Start---------------------
try {
  const medianTest1 = arrayUtils.medianElement([
    5, 6, 23, 10, 15, 20, 23, 25, 40, 54, 65, 87, 90,
  ]);
  console.log(medianTest1);
} catch (error) {
  console.error("Test failed", error);
} //Output: {'23':2}

try {
  const medianTest2 = arrayUtils.medianElement("[7, 6, 5, 8, 9, 4, 1, 7]");
  console.log(medianTest2);
} catch (error) {
  console.error("Test failed", error);
} //

//-----------------------------Median End---------------------------

//-----------------------------Merge Start------------------------

try {
  const mergeTest3 = arrayUtils.merge(["A", "B", "a"], [1, 2, "Z"]);
  console.log(mergeTest3);
} catch (error) {
  console.error("Test failed", error);
} // [ 'a', 'A', 'B', 'Z', 1, 2 ]

try {
  const mergeTest4 = arrayUtils.merge([null, null, null], [null, null, null]);
  console.log(mergeTest4);
} catch (error) {
  console.error("Test failed", error);
} // Error

//------------------------------Merge End----------------------------

//----------------------------Sort string start---------------------

try {
  const sortStringTest1 = stringUtils.sortString("123 FOO BAR! aaoo");
  console.log(sortStringTest1);
} catch (error) {
  console.error("Test 1 failed", error);
} //Output: ABFOORaaoo!123

try {
  const sortStringTest2 = stringUtils.sortString();
  console.log(sortStringTest2);
} catch (error) {
  console.error("Test failed", error);
} // Error

//--------------------------Sort string End---------------------
//--------------------------Replace char start-------------------

try {
  const replaceCharTest1 = stringUtils.replaceChar("robjacob", 2);
  console.log(replaceCharTest1);
} catch (error) {
  console.error("Test failed", error);
} //Output: robjacoo
try {
  const replaceCharTest2 = stringUtils.replaceChar("foobar", "i");
  console.log(replaceCharTest2);
} catch (error) {
  console.error("Test failed", error);
} // Error

//--------------------------Replace char End-----------------------------

try {
  const mashUptest1 = stringUtils.mashUp("Patrick", "Hill", "$");
  console.log(mashUptest1);
} catch (error) {
  console.error("Test failed", error);
} //

try {
  const mashUptest2 = stringUtils.mashUp("hello", 5, "#");
  console.log(mashUptest2);
} catch (error) {
  console.error("Test failed", error);
} //

//-----------------------------Mashup End ------------------------------

//----------------------------Compute objects Start--------------------
try {
  const first = { x: 2, y: 3 };
  const second = { a: 70, x: 4, z: 5 };
  const third = { x: 0, y: 9, q: 10 };
  const firstSecondThird = objUtils.computeObjects(
    [first, second, third],
    (x) => x * 2
  );
  console.log(firstSecondThird);
} catch (error) {
  console.error("Test failed", error);
} //Output: { x: 12, y: 24, a: 140, z: 10, q: 20 }
try {
  const first = { x: 2, y: 3 };
  const second = { a: 70, x: 4, z: 5 };
  const third = { x: 0, y: 9, q: 10 };
  const firstSecondThird = objUtils.computeObjects(
    [first, second, third],
    "(x) => x * 2"
  );
  console.log(firstSecondThird);
} catch (error) {
  console.error("Test failed", error);
} //Error

try {
  const first = { a: 2, b: 4 };
  const second = { a: 5, b: 4 };
  const third = { i: 5, b: { x: 7, i: 5 } };
  const fourth = { y: 10, b: { x: 7, i: 5 } };
  console.log(objUtils.commonKeys(third, fourth));
} catch (error) {
  console.error("Test failed", error);
} //Output: { i: 5, b: { x: 7, i: 5 } }

try {
  const first = "asd";
  const second = { a: 5, b: 4 };
  const third = { i: 5, b: { x: 7, i: 5 } };
  const fourth = { y: 10, b: { x: 7, i: 5 } };
  console.log(objUtils.commonKeys(third, first));
} catch (error) {
  console.error("Test failed", error);
} //Error

try {
  const first = { a: 2, b: 4 };
  const second = { a: 5, b: 4 };
  const third = { y: 10, b: { x: "" } };
  const fourth = { a: 3, b: 2, c: { d: 10, e: 1 } };
  console.log(objUtils.flipObject(fourth));
} catch (error) {
  console.error("Test failed", error);
} //Output: { '2': 'b', '3': 'a', c: { '1': 'e', '10': 'd' } }

try {
  const first = { a: 2, b: 4 };
  const second = { a: 5, b: [{ c: 5 }] };
  const third = { y: 10, b: { x: "" } };
  const fourth = { a: 3, b: 2, c: { d: 10, e: 1 } };
  console.log(objUtils.flipObject(second));
} catch (error) {
  console.error("Test failed", error);
}
//Error
