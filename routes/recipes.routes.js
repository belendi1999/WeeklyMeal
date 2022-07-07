const router = require("express").Router();
const prueba = require("../utils/variables")
const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/recipe.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const { findById } = require("../models/recipe.model");
const RecipesApi = require("../services/ApiHandler");
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
    const query = ({title, summary, image, ingredients, steps, apiId} = req.body);
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
            console.log("me he creado")
                //Vamos a añadir el id nuevo de esta receta a la lista de favoritos del user
                User.findByIdAndUpdate(
                    { 
                        _id: req.session.currentUser._id
                    },
                    {                        
                        $push: { favorites: recetaRecienCreada._id }},
                    ).then(() => res.redirect(`/recipes/${apiId}`))
            })
            .catch((err) => console.log(err));

        }else {
            //Busca el usuario en el que queremos incluir el favorito
            User.findById(req.session.currentUser._id)
            .then((userEncontrado) => {
                //Compruebo que este usuario NO tenga ya esta receta en su lista de favoritos
                if(!userEncontrado.favorites.includes(recipeFound._id)){
                    //En caso de no tenerla
                    
                    //Añade la id nueva de esta receta a la lista de favoritos del user
                    User.findByIdAndUpdate(
                        { 
                            _id: req.session.currentUser._id
                        },
                        {                        
                            $push: { favorites: recipeFound._id }}
                        ).then(() => res.redirect(`/recipes/${apiId}`))
                    
                }else{
                    res.redirect(`/recipes/${apiId}`)
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
    .getRecipesWithIngredients(ingredients) 
    .then((result) =>{
        //const recipes = data.body.recipes.items;
    res.render('recipes/recipe-search', {data: result.data})
    })
    .catch((err) =>
        console.log ('The error while searching artists occurred: ', err))
    })



router.get('/recipes/:recipeId', (req, res, next) =>{
        RecipesAPI
        .getOneRecipe(req.params.recipeId)
        .then((recipe) =>{
            const findRecipe = recipe.data;
    
            res.render('recipes/eachRecipe', {recipe: findRecipe})
        })
        .catch((err) =>
        console.log ('The error while searching recipe occurred: ', err))
    })



router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {apiId} = req.body
    User.findByIdAndUpdate({"_id": req.session.currentUser._id}, {$pull : {favorites : apiId}})
    .then(()=>{
        res.redirect("/favorites")
    })
    .catch(err => console.log(err))
})


// ---------- GET MY-MENU ----------
// router.get("/my-menu", isLoggedIn, (req, res, next) => {
//     res.render("recipes/my-menu");   
//   });


router.get("/my-menu", isLoggedIn, (req, res, next) =>{
    User.findById(req.session.currentUser._id)
    .populate('favorites')
    .then((user) => {
        const comida = []
        const cena = []
        let random 
        // console.log(user.favorites);
      for(let i  = 0; i<7; i++){
        random = Math.floor(Math.random() * user.favorites.length);
        comida.push(user.favorites[random]);
        random = Math.floor(Math.random() * user.favorites.length);
        cena.push(user.favorites[random]);
      }
      console.log(comida);
      res.render("recipes/my-menu", {comida, cena});
    })

    .catch((err) => console.log(err));
})
  
// .estimatedDocumentCount()


/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;