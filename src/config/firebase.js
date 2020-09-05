import firebase from "firebase"
import "firebase/auth"
import "firebase/analytics"
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBEuIze-GxYtdffbrquo6kLCOl2-JCJI0",
    authDomain: "sige-59067.firebaseapp.com",
    databaseURL: "https://sige-59067.firebaseio.com",
    projectId: "sige-59067",
    storageBucket: "sige-59067.appspot.com",
    messagingSenderId: "252571552181",
    appId: "1:252571552181:web:448766bda27cd0c4d571fc",
    measurementId: "G-XGMWLSRXSV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase