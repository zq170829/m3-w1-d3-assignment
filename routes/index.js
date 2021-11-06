const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const registration = mongoose.model("registration");

router.get("/", function (req, res) {
  // res.send('It works!');
  res.render("form", { title: "Registration form" });
});

router.get("/registrations", (req, res) => {
  registration
    .find()
    .then((registrations) => {
      res.render("index", { title: "Listing registrations", registrations });
    })
    .catch(() => {
      res.send("Sorry! Something went wrong.");
    });
});

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  function (req, res) {
    //console.log(req.body);
    const errors = validationResult(req);
    const registration = new registration(req.body);
    if (errors.isEmpty()) {
      registration
        .save()
        .then(() => {
          res.send("Thank you for your registration!");
        })
        .catch((err) => {
          console.log(err);
          res.send("Sorry! Something went wrong!");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
