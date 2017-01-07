
Album
  .sync()
  .then(() => {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    })
  })
  .then(() => {
    User.findAll().then((users) => {
      console.log(users)
    })
  })
