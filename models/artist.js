module.exports = function (sequelize, DataTypes) {
  const Artist = sequelize.define("artist", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        Artist.hasMany(models.Album)
      }
    }
  })

  return Artist
}
