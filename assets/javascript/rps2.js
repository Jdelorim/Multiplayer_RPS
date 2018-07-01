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

    var player1 = {
        name: "Waiting for Player 1"
    };
    var player2 = {
        name: "Waiting for Player 2"
    };
   var which = 0;
    var P1connected = false;
    var P2connected = false;
    var totalP = 0;
    var n = "";
    var database = firebase.database();
    var p1= database.ref('RPS/Players/Player1');
    console.log(p1.child("name"));
   

    $("#startGameButton").on('click', function(){
        if(blockStart === false){
       n = $("#nameBox").val().trim();
        totalP++;
        con.update({
            totalPlayers: totalP
        });
       
        if(totalP === 1){
            iam1();
        } else {
            iam2();
        }
    }

    });

    function iam1(){
        which = 1;
        player1.name = n;
        console.log("P1: ",player1.name);
        $("#p1name").text(player1.name);
        p1.update({
            name: player1.name
        })
        blockStart = true;
    }
    function iam2(){
        which = 2;
        player2.name = n;
        p2.update({
            name: player2.name
        })
    }

function isConnected(){
  con.update({
      onlineState: true,
      status: "online"
      
  });
  p1.update({
    playerOnline: P1connected
  });
  p1.onDisconnect().update({
      playerOnline: false
  })
  p2.update({
    playerOnline: true
  });
  p2.onDisconnect().update({
      playerOnline: false
  })
  
  con.onDisconnect().update({
      onlineState: false,
      status: "offline",
      totalPlayers: totalP
      
  })
}

isConnected();
if(performance.navigation.type == 1) {
    totalP--;
}

});