const people = require("./people");
const stocks = require("./stocks");

async function getPersonByIdTests() {
  try {
    const result = await people.getPersonById();
    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.getPersonById(
      "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10 "
    );
    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.getPersonById(true);
    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
}

async function streetNameTests() {
  try {
    const result = await people.sameStreet("  ", 2);

    console.dir(result, { depth: null });
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.sameStreet("Crownhardt", "Park");

    console.dir(result, { depth: null });
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.sameStreet("1st", "2nd");

    console.dir(result, { depth: null });
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.sameStreet("  suthErland", "poInT");

    console.dir(result, { depth: null });
  } catch (e) {
    console.error("Test case failed:", e);
  }
}

async function manipulateSsnTest() {
  try {
    const result = await people.manipulateSsn();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}

async function sameBirthdayTests() {
  try {
    const result = await people.sameBirthday(10, 31);

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.sameBirthday("4", "025");

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await people.sameBirthday(0002, 29);

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
}

async function listShareholdersTest() {
  try {
    const result = await stocks.listShareholders();

    console.dir(result, { depth: null });
  } catch (e) {
    console.error("Test case failed:", e);
  }
}

async function topShareholderTest() {
  try {
    const result = await stocks.topShareholder("Powell Industries, Inc.");

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.topShareholder("Aeglea BioTherapeutics, Inc.");

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.topShareholder("   ");

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.topShareholder(2);

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.topShareholder();

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
}

async function listStocksTests() {
  try {
    const result = await stocks.listStocks("Grenville", "PawElke");
    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.listStocks("G", "Pawelke");

    console.log(result);
  } catch (e) {
    console.error("Test case failed:", e);
  }
  try {
    const result = await stocks.listStocks();

    console.log(result);
  } catch (e) {
    console.error("Test case failed", e);
  }
}

async function getStockByIdTest() {
  try {
    const result = await stocks.getStockById(
      " f652f797-7ca0-4382-befb-2ab8be914ff0 "
    );

    console.log(result);
  } catch (e) {
    console.error("getStockByIdTest failed test case:", e);
  }
  try {
    const result = await stocks.getStockById();

    console.log(result);
  } catch (e) {
    console.error("getStockByIdTest failed test case:", e);
  }
}
// getPersonByIdTests();
// streetNameTests();
// manipulateSsnTest();
// sameBirthdayTests();
// listShareholdersTest();
//topShareholderTest();
listStocksTests();
// getStockByIdTest();
