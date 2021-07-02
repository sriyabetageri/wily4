import  firebase from 'firebase'
require('@firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCw1qFQwzpNKp2-8H3jh37If7otfXdNDBE",
    authDomain: "wily-app-de129.firebaseapp.com",
    projectId: "wily-app-de129",
    storageBucket: "wily-app-de129.appspot.com",
    messagingSenderId: "940544168831",
    appId: "1:940544168831:web:d6bde537c0d5cb1f20404a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()