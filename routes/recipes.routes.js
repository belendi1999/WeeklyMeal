const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/recipe.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const RecipesAPI = new Api()

router.get('/recipes', isLoggedIn, (req, res)=>{
    
    
    RecipesAPI
    .getAllRecipes()
    .then((allRecipes) => {
        res.render('recipes/list', {recipes: allRecipes.data.results} )
    
    })
    .catch(err => console.log(err));
    
    
    
})

// Busca cada tipo de recta

  

router.post("/add-favorite", isLoggedIn ,(req, res) =>{
    
    const { apiId } = req.body
    console.log(req.body)

    
})

/*app.get('/artist-search', (req, res, next) => {
    spotifyApi
    .searchArtists(req.query.artistName)
    .then((data) =>{
        const artists = data.body.artists.items;
        console.log(artists)
        res.render('artist-search', {artists})
    })
    .catch((err) =>
        console.log ('The error while searching artists occurred: ', err))
    })

app.get('/albums/:artistId', (req, res, next) =>{
    spotifyApi
    .getArtistAlbums(req.params.artistId)
    .then((data) =>{
        const findAlbum = data.body.items;
        console.log (findAlbum)
        res.render('albums', {findAlbum})
    })
    .catch((err) =>
    console.log ('The error while searching artists occurred: ', err))
}) */


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