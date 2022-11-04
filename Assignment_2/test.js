const objUtil = require("./objUtils");
const arrayUtil = require("./arrayUtils");
const stringUtil = require("./stringUtils");

try {
  console.log(arrayUtil.medianElement([5, 6, 9, 2]));
} catch (error) {
  console.log(error);
}

try {
  console.log(arrayUtil.medianElement([3, 20, 6, 8, 9]));
} catch (error) {
  console.log(error);
}

try {
  console.log(arrayUtil.modeSquared([1, 1, 2, 2, 3, 3]));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    objUtil.commonKeys(
      { foo: "bar", oof: "bar", cup: "filled", x: { b: 6 } },
      { hello: "hi", world: "there", foo: "bar", oof: "bar", x: { b: 6 } }
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    objUtil.computeObjects(
      [
        { x: 1, y: 2, z: 3 },
        { x: 2, z: 5 },
      ],
      (e) => e * e
    )
  );
} catch (error) {
  console.log(error);
}
