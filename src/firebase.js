import firebase from 'firebase'

export let config = {
    apiKey: "AIzaSyDKNCegy6VrA8NimiE2uDw_kVbS8-ZHXoU",
    authDomain: "myvuefirebaseauth.firebaseapp.com",
    databaseURL: "https://myvuefirebaseauth.firebaseio.com",
    projectId: "myvuefirebaseauth",
    storageBucket: "myvuefirebaseauth.appspot.com",
    messagingSenderId: "651868466325"
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();