module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define("album", {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Album.hasMany(models.Song)
        Album.belongsTo(models.Artist, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })

  return Album
}
