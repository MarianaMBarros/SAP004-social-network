export const logout = () => {
  firebase.auth().signOut();
  window.location.hash = "";
};

// export const user = () => {
//     firebase.auth().onAuthStateChanged(function(user) {
//         // Se troca essa variável por const ou let para de funcionar.
//         var user = firebase.auth().currentUser;
//         if (user) {
//             let name = user.displayName;
//             // let photo = user.photoURL;
//             console.log(`Oi ${name}! Que bom ver você aqui!`);
//         } else {
//             console.log("não possui usuário logado!");
//             //   let name = "anonimo"
//         }
//         // return name;
//     });
// }

export const loadPost = (addPosts, like, likeClass, deletePost) => {
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.get().then(snap => {
    snap.forEach(post => {
      addPosts(post)
    });
    snap.forEach(post => {
      likeClass(post)
    });
    snap.forEach(post => {
      like(post)
    });
    snap.forEach(post => {
      deletePost(post)
    });
  })
}

export const updateCollection = (likeUser, likes, post) => {
  firebase.firestore().collection("posts").doc(`${post}`).update({
    liked: likeUser,
    likes: likes
  })
}

export const dataUser = (profile) => {
  firebase.auth().onAuthStateChanged(function (user) {
    profile(firebase.auth().currentUser.displayName)
  })
}

export const postDelete = (post) => {
  firebase.firestore().collection("posts").doc(post).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}
