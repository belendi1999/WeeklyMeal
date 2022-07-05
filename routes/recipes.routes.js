const router = require("express").Router();
const prueba = require("../utils/variables")
const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/recipe.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const { findById } = require("../models/recipe.model");
const RecipesAPI = new Api()

router.get('/recipes', isLoggedIn, (req, res)=>{
    
    //if(prueba === true){
        RecipesAPI
        .getAllRecipes()
        .then((allRecipes) => {
            res.render('recipes/list', {recipes: allRecipes.data.results} )
        
        })
        .catch(err => console.log(err));
    //}
    //res.render("recipes/list")
    
    
})

// Busca cada tipo de recta

  

router.post("/add-favorite", isLoggedIn ,(req, res) =>{

    //--> Recojo los valores de la receta en 'query'
    const query = ({title, description, image, ingredients, steps, apiId} = req.body);
    //--> Es la id de esta receta en la API externa
    const idToCheck = req.body.apiId;
    // const { apiId } = req.body
    // console.log(req.body)

    // Recipe.create({
    //     name,
    //     description,
    //     image,
    //     ingredients,
    //     steps,
    //   });

    //--> Busco en mi BBDD una receta que tenga esta api
    Recipe.findOne({apiId: idToCheck})
    .then((recipeFound) => {
        //Si no está...
        if(!recipeFound){
            //...la creo
            Recipe.create(query)
            .then((recetaRecienCreada) => {
                //Vamos a añadir el id nuevo de esta receta a la lista de favoritos del user
                User.findByIdAndUpdate(req.user.id,{
                    $push: { favorites: recetaRecienCreada} 
                })
            })
            .catch((err) => console.log(err));

        }else {
            //Busca el usuario en el que queremos incluir el favorito
            User,findById(req.user.id)
            .then((userEncontrado) => {
                //Compruebo que este usuario NO tenga ya esta receta en su lista de favoritos
                if(!userEncontrado.favorites.includes(recetaFound.id)){
                    //En caso de no tenerla
                    //Añade la id nueva de esta receta a la lista de favoritos del user
                    User.findByIdAndUpdate(req.user.id, {
                        $push: { favorites: recetaFound.id }
                    })
                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    })


    // Recipe
    // .findById(recipeId)
    // .populate('user')
    // .then(recipe => {
    //     res.render('recipes/favorites.hbs', recipe)
    // })
    // .catch(err => console.log(err))
})




router.post('/recipe-search', (req, res, next) => {
    let ingredients = req.body.search
    RecipesAPI
    .getOneRecipe(ingredients) 
    .then((result) =>{
        //const recipes = data.body.recipes.items;
   console.log(result.data)
    res.render('recipes/recipe-search', {data: result.data})
    })
    .catch((err) =>
        console.log ('The error while searching artists occurred: ', err))
    })

router.get('/recipes/:recipeId', (req, res, next) =>{
        RecipesAPI
        .getRecipes(req.params.recipeId)
        .then((data) =>{
            const findRecipe = data.body.items;
            res.render('recipes', {findRecipe})
        })
        .catch((err) =>
        console.log ('The error while searching artists occurred: ', err))
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