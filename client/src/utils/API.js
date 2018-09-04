import axios from "axios";

export default {
  userLogin: function(email, password) {
    return axios.post("/api/user/login", {
      email: email,
      password: password,
    });
  },

  userRegister: function(email, password) {
    return axios.post("/api/user/register", {
      email: email,
      password:password,
    });
  },

  getIngredients: function() {
    return axios.get("/api/ingredient");
  }
};