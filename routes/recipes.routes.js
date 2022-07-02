const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/recipe.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const RecipesAPI = new Api()

router.get('/recipes',(req, res)=>{
    
    
    RecipesAPI
    .getAllRecipes()
    .then((allRecipes) => {
      console.log( "HOLA", allRecipes.data.hits)
        res.render('recipes/list', {recipes: allRecipes.data.hits} )
    
    })
    .catch(err => console.log(err));
    
    
    
})

router.post("/add-favorite", isLoggedIn ,(req, res) =>{
const query = { name, status, species, gender, image, apiId } = req.body
const idToCheck = req.body.apiId;
    Recipe.find({apiId: idToCheck})
	.then (RecipArray => {
		//comprobar si ese apiId ya esta en db characters
		if (RecipArray.length === 0) {
            Recipe
                .create(query)
                .then(result => {
                  User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : result._id}})
                    .then(()=>{
                        res.redirect("/recipes")
                    })
                })
                .catch(err => console.log(err))
        } else {
			User
            .findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(charArray[0]._id)){
                    User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : charArray[0]._id}})
                    .then(()=>{
                        res.redirect("/recipes")
                    })
                }else{res.redirect("/recipes")}
            })
            .catch((err)=>{
            console.log(err)
            })
            
            
            
		}
	}) 
})


router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {id} = req.body
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;