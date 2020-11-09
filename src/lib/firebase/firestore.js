//Uso de base de datos Firestore
export const  createUserDB = (id, email, name, photo) => { return firebase.firestore()
    .collection("users").doc(id).set({
        id,
        email,
        name,
        photo
    });
}
