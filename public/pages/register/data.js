import errorHandling from '../elementos/objetos/authError.js';

export const register = (user, password, printErrorLogin) => {
    if (user.userName && user.profession && user.age) {
        firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then(function () {
                firebase.auth().currentUser.updateProfile({
                    displayName: user.userName,
                });
                user.userUid = firebase.auth().currentUser.uid;
                firebase.firestore().collection('users').add(user)
                    .then(function () {
                        window.location.hash = '#home'
                    }).catch(function (error) {
                        console.log(error.code);
                        printErrorLogin(errorHandling(error.code));
                    });
            })
            .catch(function (error) {
                console.log(error.code);
                printErrorLogin(errorHandling(error.code));
            });
    } else {
        printErrorLogin('Digite todos os campos');
    }
};