
export const userService = {
  getUser
}

async function getUser() {
  return Promise.resolve({
    username: 'Roee Furman',
    password: '1234',
    isAdmin: true,
    likedSongs: ['H5v3kku4y6Q'],
    likedPlaylists: ['ZnyvsvCe3gEN0M5ahH2y'],
    imgUrl: 'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070370/qpolx3ucumsiscnf0ymk.jpg'
  })
}


// async function signUser(username, password) {
//   await Auth.signUp({
//     username,
//     password,
//     attributes: {
//       email,
//       'custom:playlist': []
//     }
//   })
//   await Auth.signIn(username, password);

//   const userInfo = await Auth.currentUserInfo();
//   console.log('userInfo', userInfo);
//   // const user = await DataStore.save(
//   //     new Users({
//   //         "id": userInfo.id,
//   //         "email": userInfo.attributes.email
//   //     })
//   // );
//   // const models = await DataStore.query(Users);
//   // console.log(user)
//   // console.log(models);
// }

