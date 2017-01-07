module.exports = function(sequelize, DataTypes) {
  const Album = sequelize.define("Album", {
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY
  })

  return Album
}
