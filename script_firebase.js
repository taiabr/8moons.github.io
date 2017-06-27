$(document).ready(function() {	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwm_buVA5z6szyeI1JjD_6zupg3vtIbJI",
    authDomain: "moons-bazaar.firebaseapp.com",
    databaseURL: "https://moons-bazaar.firebaseio.com",
    projectId: "moons-bazaar",
    storageBucket: "moons-bazaar.appspot.com",
    messagingSenderId: "281206407475"
  };
  firebase.initializeApp(config);
    
  // Recupera a referência ao BD
  var database = firebase.database();
  
});


