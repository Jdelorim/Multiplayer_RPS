$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyCj6L0vmmAT3iortKmR0Lfm4OZB0TC_HzI",
        authDomain: "multiplayerrps-ca99e.firebaseapp.com",
        databaseURL: "https://multiplayerrps-ca99e.firebaseio.com",
        projectId: "multiplayerrps-ca99e",
        storageBucket: "multiplayerrps-ca99e.appspot.com",
        messagingSenderId: "318619920914"
        };
        
        firebase.initializeApp(config);

        var database = firebase.database();
        var con = database.ref('connections');
        var me = {
            name: "",
            choice: "",
            position: "",
            turn: 0,
            wins: 0,
            loss: 0,

        }
        var them ={
            name: "",
            choise: "",
            position: "",
            turn: 0,
            wins: 0,
            loss: 0,
        }

     con.once("value", function (snapshot) {
            if(Object.keys(snapshot.val()).indexOf("1") === -1) {
                me.position = "1";
                them.position = "2";
            } else if (Object.keys(snapshot.val()).indexOf("2") === -1) {
                me.position = "2";
                them.position = "1";
            }

            if(me.position !== 0){
                var c = con.child(me.number);
                c.set(me);
                c.onDisconnect().remove();
            } else {

            }
        });




});