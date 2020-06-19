export const logout = () => {
    firebase.auth().signOut();
    window.location.hash = '';
};

export const user = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        // Se troca essa variável por const ou let para de funcionar.
        var user = firebase.auth().currentUser;
        if (user) {
            let name = user.displayName;
            // let photo = user.photoURL;
            console.log(`Oi ${name}! Que bom ver você aqui!`);
        } else {
            console.log('não possui usuário logado!');
            logout();
            //   let name = "anonimo"
        }
    });
};

//export const loadPost = (addPosts, like, likeClass, deletePost, updatePost) => {
//   const postsCollection = firebase.firestore().collection("posts");
//   postsCollection
//     .orderBy("time", "desc")
//     .get()
//     .then(snap => {
//       snap.forEach(post => {
//         addPosts(post);
//       });
//       snap.forEach(post => {
//         likeClass(post);
//       });
//       snap.forEach(post => {
//         like(post);
//       });
//       snap.forEach(post => {
//         deletePost(post);
//       });
//       snap.forEach(post => {
//         updatePost(post);
//       });

//     });
// };

export const loadPost = (
    addPosts,
    like,
    likeClass,
    deletePost,
    updatePost,
    commenter,
    printComment,
    textareaAdaptavel
) => {
    //export const readPosts = (callback) => {
    firebase
        .firestore()
        .collection('posts')
        .orderBy('time', 'desc')
        .onSnapshot((snap) => {
            snap.forEach((post) => {
                addPosts(post);
            });
            snap.forEach((post) => {
                iconVerific(post, likeClass);
            });
            snap.forEach((post) => {
                like(post);
            });
            snap.forEach((post) => {
                deletePost(post);
            });
            snap.forEach((post) => {
                updatePost(post);
            });
            snap.forEach((post) => {
                commenter(post);
            });
            snap.forEach((post) => {
                printComment(post);
            });
            snap.forEach((post) => {
                textareaAdaptavel(post);
            });
        });
};

//  .onSnapshot(function(querySnapshot) {
//    var posts = [];
//   querySnapshot.forEach(function(doc) {
//               posts.push(doc.data());
//           });
//           callback(posts)
//       });
//   }
// }

export const updateCollection = (post, data) => {
    firebase.firestore().collection('posts').doc(`${post}`).update({
        liked: data.liked,
        comments: data.comments,
        text: data.text,
    });
};

export const dataUser = (profile) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user)
            profile(user.displayName, user.photoURL);
    });
};

export const postDelete = (post) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(post)
        .delete()
        .then(function () {
            console.log('Document successfully deleted!');
        })
        .catch(function (error) {
            console.error('Error removing document: ', error);
        });
};

export const createPost = (post) => {
    firebase.firestore().collection('posts').add(post);
};

export const updatePost = (id, post) => {
    return firebase.firestore().collection('posts').doc(id).update({
        text: post,
    });
};

export const filePost = (file, name, callback) => {
    const ref = firebase.storage().ref();
    const filePostar = ref.child(name);
    filePostar.put(file).then(function (snapshot) {
        console.log(snapshot);
        callback(filePostar.fullPath);
    });
};

function iconVerific(post, likeClass) {
    post.data().liked.forEach((a) => {
        if (a === firebase.auth().currentUser.uid) likeClass(post.id, 1);
    });
}