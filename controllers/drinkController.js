const db = require("../models");

let ingredientArray;

module.exports = {
  // Handler for /api/drink, Get
  // Return all drinks
  findAll: function (req, res) {
    db.drinks.findAll({order: ["name"]})
      .then(function (dbDrinks) {
        res.json(dbDrinks);
      });
  },

  // Handler for /api/drink/:id, Get
  // Return the drink with Id = :id 
  findById: function (req, res) {
    var queryString =
      " select drinks.id as dID, drinks.name as dName, drinks.glass_type, drinks.thumb_img_url, drinks.instructions, drinks.description, ingredients.id as iId, ingredients.name as iName, drink_contents.amount " +
      " from drinks, ingredients, drink_contents " +
      " where drinks.id = drink_contents.drink_id and ingredients.id = drink_contents.ingredient_id and drinks.id = " + req.params.drinkId
    " order by drinks.name, drink_contents.id;";

    db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT })
      .then(function (dbDrink) {
        var drinkJSON =
        {
          drinkID: dbDrink[0].dID,
          drinkName: dbDrink[0].dName,
          glassType: dbDrink[0].glass_type,
          thumbImg: dbDrink[0].thumb_img_url,
          instructions: dbDrink[0].instructions,
          description: dbDrink[0].description
        }
        var ingredientsJSON = [];
        var i = 0;
        dbDrink.forEach(function (drinkIngredient) {
          ingredientsJSON[i] = {
            ingredientID: drinkIngredient.iId,
            ingredientName: drinkIngredient.iName,
            ingredientAmount: drinkIngredient.amount
          }
          i++;
        });
        drinkJSON.contents = ingredientsJSON;
        //   console.log(JSON.stringify(dbDrink));
        res.json(drinkJSON);
      })
      .catch(function (err) { console.log(err) })
  },

  // Handler for /api/drink/ing/:id, Get
  // Return the drinks that contain an ingridient in the :id string
  findByIng: function (req, res) {
    var finalJSON = [];
    ingredientArray = [];
    /* build the search criteria strings */
    var searchParmamsSorted = req.params.ingId.split("&");
    searchParmamsSorted.sort(function (a, b) { return parseInt(a) - parseInt(b) });

    var searchArrayAnd = ["("]
    var searchArrayOr = ["("]
    for (var i = 1; i <= searchParmamsSorted.length; i++) {
      searchArrayAnd[i] = "(ingredient_id <> " + parseInt(searchParmamsSorted[i - 1]) + ") and ";
      searchArrayOr[i] = "(ingredient_id = " + parseInt(searchParmamsSorted[i - 1]) + ") or ";
    }
    searchArrayAnd.push(")");
    searchArrayOr.push(")");

    // Turn array to string
    var searchStringAnd = searchArrayAnd.join();
    var searchStringOr = searchArrayOr.join();

    //remove the commas
    searchStringAnd = searchStringAnd.replace(/[,]+/g, "").trim();
    searchStringOr = searchStringOr.replace(/[,]+/g, "").trim();

    //remove the extra "and" and add the closing right parenthesis
    searchStringAnd = searchStringAnd.substring(0, searchStringAnd.length - 6);
    searchStringAnd += ")";

    //remove the extra "or" and add the closing right parenthesis
    searchStringOr = searchStringOr.substring(0, searchStringOr.length - 5);
    searchStringOr += ")";

    /* search criteria array strings */

    /* build SQL String */
    let queryString = "SELECT distinct " +
      "drinks.id as drinkID, drinks.name, drinks.thumb_img_url, " +
      "(select count(*) from favorites where drinkID = drink_id group by drink_id ) as favCount, " +
      "(select group_concat(ingredients.name) from drink_contents, ingredients where drink_contents.ingredient_id = ingredients.id and drink_contents.drink_id = drinkID and " + searchStringAnd + " and drink_contents.required = 1 group by drink_contents.drink_id) as missingIng " +
      "FROM drinks AS drinks INNER JOIN drink_contents AS drink_contents ON drinks.id = drink_contents.drink_id " +
      " AND " + searchStringOr + ";";

    /* SQL String built */
    let dD = 0;

    let curMissing = [];
    return db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT })
      
      .then((dbDrinks) => {
        dbDrinks.forEach((dbDrink) => {
          curMissing = [];
          if(dbDrink.missingIng !== null)
          {
            curMissing = dbDrink.missingIng.split(",");
          }
          finalJSON[dD] = {
            id: dbDrink.drinkID,
            name: dbDrink.name,
            imgUrl: dbDrink.thumb_img_url,
            favedCnt: dbDrink.favCount === null ? 0 : dbDrink.favCount,
            missingIngCount: curMissing.length === null ? 0 : curMissing.length,
            missingIng: curMissing
          };
          for(let i=0;i<curMissing.length;i++)
          {
            missingIngredientCounter(curMissing[i]);
          }
          dD++;
        });
      })

      .then(function () {
        finalJSON.sort(function (a, b) { return a.missingIngCount - b.missingIngCount; });
        ingredientArray.sort(function (a, b) { return b.count - a.count; });
        let returnJSON = { drinks: finalJSON, ingredients: ingredientArray };
        res.json(returnJSON);
      })
      .catch(function (err) { console.log(err); });

  },

  // Handler for /api/drink, Post
  // Adds a drink as desribed by the body
  addDrink: function (req, res) {
    //Check to see if the ingredient exists
    db.drinks.findOne({
      where: { name: req.body.name },
    }).then(function (drink) {
      if (drink !== null) {
        res.status(200).send("Drink Exists");
      }
      else {
        /* magic goes here */
        var drinkName = req.body.name;
        var glassType = req.body.glass;
        var thumbURL = req.body.thumb_url;
        var instructions = req.body.instructions;
        var desc = req.body.description;
        if (desc === null || desc === "") {
          desc = null;
        }
        db.drinks.create({
          name: drinkName,
          glass_type: glassType,
          thumb_img_url: thumbURL,
          instructions: instructions,
          description: desc
        }
        ).then(function (newDrink) {
          req.body.contents.forEach(function (content) {
            addContents(newDrink.id, content.id, content.amount, function () { });
          })
        }).then(function () {
          res.status(200).end();
        })
      }
    }).catch(function (err) {
      throw err;
    })
  }
}

function addContents(drinkId, ingID, amount, fn) {
  db.drink_contents.create({
    drink_id: drinkId,
    ingredient_id: ingID,
    amount: amount
  }
  ).then(function () {
    fn();
  }).catch(function (err) {
    throw err;
  });
}

function missingIngredientCounter(ingredient) {
  let matchFound = false;
  for (let i = 0; i < ingredientArray.length; i++) {
    if (ingredientArray[i].ingredient === ingredient) {
      matchFound = true;
      ingredientArray[i].count++;
      i = ingredientArray.length + 100;
    }
  }
  if (matchFound === false) {
    ingredientArray.push({ ingredient: ingredient, count: 1 })
  }

}
