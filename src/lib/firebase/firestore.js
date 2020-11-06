//Uso de base de datos Firestore

export const  createUserDB = (userUid, email, name, photo) => { firebase.firestore()
    .collection("users").doc().set({
        name,
        email,
        userUid,
        photo
    });
}
