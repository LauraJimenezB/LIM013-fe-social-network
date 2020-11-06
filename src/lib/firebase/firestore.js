//Uso de base de datos Firestore
export const  createUser = (userUid, email, name, photo) => { firebase.firestore()
    .collection("usuarios").add({
        name,
        email,
        userUid,
        photo
    })
}