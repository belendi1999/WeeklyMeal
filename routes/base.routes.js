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
    res.render("user/profile", {user: user});
  })
 

})
router.get("/favorites", isLoggedIn, (req, res, next) =>{

  User.findById(req.session.currentUser._id)
  .populate('favorites')
  .then((user) => {
    res.render("recipes/favorites", {favorites: user.favorites});
    
  })
 

})

router.post("/profile", isLoggedIn, (req, res, next) => {
  const {allergies, specialDiets, email} = req.body
  User.findByIdAndUpdate(
    { 
        _id: req.session.currentUser._id
    },
    {                        
       allergies: allergies,
       specialDiets: specialDiets,
       email: email
    },
    {
      new : true
    }).then((user) => {

      console.log(user)
      res.render("user/profile", {user: user})
    })

    
    
})

module.exports = router;
