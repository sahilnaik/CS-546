const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;
let { ObjectId } = require("mongodb");

router.get("/:restaurantId", async (req, res) => {
  let id = req.params.restaurantId;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  try {
    const reviewById = await reviewsData.getAll(req.params.restaurantId);
    if (Object.keys(reviewById).length == 0) {
      res.status(404).json({ message: "No reviews found for the restaurant" });
      return;
    }
    res.json(reviewById);
  } catch (e) {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

router.get("/review/:reviewId", async (req, res) => {
  let id = req.params.reviewId;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  try {
    const reviewList = await reviewsData.get(req.params.reviewId);
    res.json(reviewList);
  } catch (e) {
    res.status(404).json({ message: "Review not found" });
  }
});

function dateCheck() {
  //Referred from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  return today;
}
router.post("/:restaurantId", async (req, res) => {
  let id = req.params.restaurantId;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  const addRev = req.body;
  if (Object.keys(addRev).length !== 5) {
    res.status(400).json({ error: `Check arguments passed` });
    return;
  }

  if (
    typeof addRev.title !== "string" ||
    typeof addRev.reviewer !== "string" ||
    typeof addRev.dateOfReview !== "string" ||
    typeof addRev.review !== "string" ||
    typeof addRev.rating !== "number"
  ) {
    res.status(400).json({ error: "Invalid input type provided" });
    return;
  }
  if (
    addRev.title.trim() == "" ||
    addRev.reviewer.trim() == "" ||
    addRev.dateOfReview.trim() == "" ||
    addRev.review.trim() == ""
  ) {
    res.status(400).json({ error: "Empty input provided" });
    return;
  }
  if (
    addRev.title == null ||
    addRev.reviewer == null ||
    addRev.dateOfReview == null ||
    addRev.review == null ||
    addRev.rating == null
  ) {
    res.status(400).json({ error: "Input should not be empty" });
    return;
  }
  addRev.title = addRev.title.trim();
  addRev.reviewer = addRev.reviewer.trim();
  addRev.dateOfReview = addRev.dateOfReview.trim();
  addRev.review = addRev.review.trim();

  let date = dateCheck();
  if (date !== addRev.dateOfReview) {
    res.status(400).json({ error: "Review date should be of today" });
    return;
  }
  try {
    const addReview = await reviewsData.create(
      req.params.restaurantId,
      addRev.title,
      addRev.reviewer,
      addRev.rating,
      addRev.dateOfReview,
      addRev.review
    );
    res.json(addReview);
  } catch (error) {
    res.status(404).json({ error: error });
    return;
  }
});

router.delete("/:reviewId", async (req, res) => {
  let id = req.params.reviewId;
  id = id.trim();
  if (ObjectId.isValid(id) == false) {
    res.status(400).json({ error: "Error in ID" });
    return;
  }
  try {
    const delReview = await reviewsData.remove(req.params.reviewId);
    res.json(delReview);
  } catch (e) {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = router;
