const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res, next) =>{

  User.findById(req.session.currentUser._id)
  .populate('favorites')
  .then((user) => {
    res.render("profile", {user: user});
  })
 

})
router.get("/favorites", isLoggedIn, (req, res, next) =>{

  User.findById(req.session.currentUser._id)
  .populate('favorites')
  .then((user) => {
    res.render("recipes/favorites", {user: user});
    console.log(user)
  })
 

})

module.exports = router;
