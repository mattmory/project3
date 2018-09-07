import axios from "axios";

export default {

  // User API Calls
  userLogin: function (email, password) {
    return axios.post("/api/user/login", {
      email: email,
      password: password,
    });
  },

  userRegister: function (email, password) {
    return axios.post("/api/user/register", {
      email: email,
      password: password,
    });
  },

  // Drink API Calls
  getAllDrinks: function () {
    return axios.get("/api/drink");
  },

  getDrinkById: function (drinkId) {
    return axios.get("/api/drink/" + drinkId);
  },

  getDrinksByIngs: function (ingIds) {
    return axios.get("/api/drink/ing/" + ingIds);
  },

  addDrink: function (name, glass, thumb_url, instructions, description, contentsJSON) {
    return axios.post("/api/drink",
      {
        name: name,
        glass: glass,
        thumb_url: thumb_url,
        instructions: instructions,
        description: description,
        contents: contentsJSON
      });
  },

  // Ingredient API Calls
  getAllIngredients: function () {
    return axios.get("/api/ingredient");
  },

  getIngredientByName: function (ingredientName) {
    return axios.get("/api/ingredient/" + ingredientName);
  },

  addIngredient: function (ingredientName, description) {
    return axios.post("/api/ingredient", {
      name: ingredientName,
      description: description,
    });
  },

  // Favorite API Calls
  getAllFavorites: function () {
    return axios.get("/api/favorites");
  },

  getUsersFavorites: function (userId) {
    return axios.get("/api/favorites/" + userId);
  },

  addFavorite: function (userId, drinkId) {
    return axios.post("/api/favorites", {
      user_id: userId,
      drink_id: drinkId
    });
  },

  deleteFavorite: function (userId, drinkId) {
    return axios.delete("/api/favorites", {
      data: {
        user_id: userId,
        drink_id: drinkId
      }
    });
  },

  getIngredients: function () {
    return axios.get("/api/ingredient");
  }

};