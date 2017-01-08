module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("song", {
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Song.belongsTo(models.Album, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })

  return Song
}
