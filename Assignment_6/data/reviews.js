const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

function errorHandle(pass) {
  if (typeof pass !== "string") {
    throw `${pass} not a string`;
  }
  if (pass.trim() === "") {
    throw `Empty input`;
  }
  if (pass == null) {
    throw `Input should not be empty`;
  }
}
function dateCheck(pass) {
  //Referred from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  if (pass !== today) {
    throw "Review date should be of today";
  }
}
async function create(
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) {
  if (arguments.length !== 6) {
    throw "Check arguments passed";
  }
  restaurantId = restaurantId.trim();
  errorHandle(restaurantId);
  title = title.trim();
  reviewer = reviewer.trim();
  if (ObjectId.isValid(restaurantId) === false) {
    throw `Error in id`;
  }

  errorHandle(title);
  errorHandle(reviewer);
  if (typeof rating !== "number") {
    throw "Rating should be a number";
  }
  if (rating < 1 || rating > 5) {
    throw `Rating must be from 1-5`;
  }
  dateOfReview = dateOfReview.trim();
  errorHandle(dateOfReview);
  dateCheck(dateOfReview);
  errorHandle(review);

  review = review.trim();
  const reviewCollection = await reviews();
  const restaurantsCollection = await restaurants();

  let Id = ObjectId(restaurantId);
  const inputId = await restaurantsCollection.findOne({ _id: Id });
  // const restaurantsCollection = await restaurants();
  if (inputId == null) {
    throw `Restaurant with id ${restaurantId} does not exist`;
  }
  const updatedInfo = await restaurantsCollection.updateOne(
    { _id: Id },
    {
      $push: {
        reviews: {
          _id: new ObjectId(),
          title: title,
          reviewer: reviewer,
          rating: rating,
          dateOfReview: dateOfReview,
          review: review,
        },
      },
    }
  );
  let revOutput = calculateReview(restaurantId);
  if (updatedInfo.insertedCount === 0) throw "Could not add review";
  //const resId = await this.get(newId.toString());

  return revOutput;
}

async function get(reviewId) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  reviewId = reviewId.trim();
  if (ObjectId.isValid(reviewId) === false) {
    throw `Error in id`;
  }
  errorHandle(reviewId);

  if (typeof reviewId !== "string") throw "Id must be a string";
  let Id = ObjectId(reviewId);

  if (!reviewId) throw "You must provide an id to search for";
  const restaurantsCollection = await restaurants();
  const reviewInfo = await restaurantsCollection
    .find({ "reviews._id": Id }, { projection: { reviews: 1, _id: 0 } })
    .toArray();
  if (reviewInfo.length === 0) throw "Review does not exist";
  let findReview = {};
  let innerTemp = {};
  for (let i = 0; i < reviewInfo.length; i++) {
    let temp = reviewInfo[i];
    for (const key in temp) {
      if (key == "_id") {
        temp[key] = temp[key].toString();
      }
      if (key == "reviews") {
        let inner = temp[key];

        for (let j = 0; j < inner.length; j++) {
          innerTemp = inner[j];
          innerTemp["_id"] = innerTemp["_id"].toString();
          if (innerTemp["_id"] == Id) {
            findReview = innerTemp;
          }
        }
      }
    }
  }

  if (findReview === null) {
    throw "No review with that id";
  }
  return findReview;
}

async function calculateReview(id) {
  let total = 0;
  let Id = ObjectId(id);
  const restaurantsCollection = await restaurants();
  const reviewId = await restaurantsCollection
    .find({ _id: Id }, { projection: { reviews: 1, _id: 0 } })
    .toArray();
  let length;
  for (let i = 0; i < reviewId.length; i++) {
    let temp = reviewId[i];
    for (const key in temp) {
      if (key == "reviews") {
        let inner = temp[key];

        length = inner.length;
        if (length > 0) {
          for (let j = 0; j < inner.length; j++) {
            innerTemp = inner[j];
            total = total + innerTemp["rating"];
            innerTemp["_id"] = innerTemp["_id"].toString();
          }
        }
      }
    }
  }
  if (length == 0) {
    const updatedInfo = await restaurantsCollection.updateOne(
      { _id: Id },
      { $set: { overallRating: 0 } }
    );
  } else {
    let avg = total / length;
    avg = Math.round((avg + Number.EPSILON) * 100) / 100;

    const updatedInfo = await restaurantsCollection.updateOne(
      { _id: Id },
      { $set: { overallRating: avg } }
    );
  }

  const restWithReview = await restaurantsCollection
    .find({ _id: Id })
    .toArray();
  for (let i = 0; i < restWithReview.length; i++) {
    let temp = restWithReview[i];
    for (const key in temp) {
      if (key == "_id") {
        temp[key] = temp[key].toString();
      }
      if (key == "reviews") {
        let inner = temp[key];

        for (let j = 0; j < inner.length; j++) {
          innerTemp = inner[j];
          innerTemp["_id"] = innerTemp["_id"].toString();
        }
      }
    }
  }
  return restWithReview;
}

async function getAll(restaurantId) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  restaurantId = restaurantId.trim();
  let res = {};
  Id = ObjectId(restaurantId);
  const restaurantsCollection = await restaurants();
  const restaurantList = await restaurantsCollection
    .find({ _id: Id })
    .toArray();
  if (restaurantList.length == 0) {
    throw "No restaurant with that id exists";
  }
  for (let i = 0; i < restaurantList.length; i++) {
    let temp = restaurantList[i];
    for (const key in temp) {
      if (key == "_id") {
        temp[key] = temp[key].toString();
      }
      if (key == "reviews") {
        let inner = temp[key];
        res = inner;
        for (let j = 0; j < inner.length; j++) {
          let innerTemp = inner[j];

          innerTemp["_id"] = innerTemp["_id"].toString();
        }
      }
    }
  }
  return res;
}

async function remove(reviewId) {
  if (arguments.length !== 1) {
    throw "Check arguments passed";
  }
  reviewId = reviewId.trim();
  if (ObjectId.isValid(reviewId) === false) {
    throw `Error in id`;
  }
  errorHandle(reviewId);

  if (typeof reviewId !== "string") throw "Id must be a string";
  let Id = ObjectId(reviewId);

  if (!reviewId) throw "You must provide an id to search for";
  const restaurantsCollection = await restaurants();
  const reviewInfo = await restaurantsCollection
    .find({ "reviews._id": Id }, { projection: { reviews: 1 } })
    .toArray();
  if (reviewInfo.length == 0) throw "Review does not exist";
  const getObj = reviewInfo[0];
  const restId = getObj["_id"];
  const deleteStuff = await restaurantsCollection.updateOne(
    { "reviews._id": Id },
    { $pull: { reviews: { _id: Id } } }
  );
  const checkForReview = await restaurantsCollection
    .find({ _id: restId }, { projection: { reviews: 1 } })
    .toArray();
  if (checkForReview.length == 0) {
    const updatedInfo = await restaurantsCollection.updateOne(
      { _id: restId },
      { $set: { overallRating: 0 } }
    );
  } else {
    calculateReview(restId);
  }

  let returnObj = {};
  returnObj["reviewId"] = reviewId.toString();
  returnObj["deleted"] = true;
  return returnObj;
}

module.exports = {
  create,
  get,
  getAll,
  remove,
};
