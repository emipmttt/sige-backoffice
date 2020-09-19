import firebase from "./firebase"
import { v4 as uuidv4 } from 'uuid';

export default async (file) => {

    var imageRef = firebase.storage().ref().child(uuidv4());
    const uploadImage = await imageRef.put(file);
    const imageURL = await uploadImage.ref.getDownloadURL()

    return imageURL;

}