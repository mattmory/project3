// Favorites model
module.exports = function (sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      drink_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false
    });

  // Associate favorites and users
  Favorites.associate = function (models) {
    Favorites.belongsTo(models.User,
      {
        as: "favorites",
        foreignKey: "user_id"
      });
  };

  return Favorites;
};