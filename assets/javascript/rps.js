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
        myturn: true,
        wins: 0,
        loss: 0,
        didwin: 0,
        name: "",
        choice: ""
    };
    var player2 = {
        myturn: false,
        wins: 0,
        loss: 0,
        didwin: 0,
        name: "",
        choice: ""
    };

    var database = firebase.database();
    var p1 = database.ref('RPS/Players/Player1');
    var p2 = database.ref('RPS/Players/Player2');
    var con = database.ref('RPS/Connected');
    var totPlayers = 0;
    var currentTurn = 1;
    var waitingOne = true;
    var waitingTwo = false;
    var iAm = "";
    
    function resetGame(){
    p1.set(player1);
    p2.set(player2);
    
    }
   // resetGame();
   con.set({
    totalPlayers: totPlayers
   });
$("#player1").on('click',function(){
    console.log("p1");
})



$("#startGameButton").on('click',function(){
   var n = $("#nameBox").val().trim();
   
   
   if(waitingOne === true && totPlayers < 2) {
    player1.name = n;
    totPlayers++;
   p1.set({
       name: player1.name

   });
   con.set({
        totalPlayers: totPlayers

   });
   waitingOne = false;
   waitingTwo = true;
   iAm = "One";
}else if(waitingTwo === true && totPlayers < 2){
    player2.name = n;
    
    p2.set({
        name: player2.name
    });
    con.set({
        totalPlayers: totPlayers
    });
    waitingTwo = false;
    iAm = "Two";
}

})



   p1.on("value",function(snapshot) {  
       var tempname = snapshot.val().name;
        $("#p1name").text(tempname);
    }, function(errorObject){
        console.log("the read failed: ",errorObject.code);
    });

    p2.on("value",function(snapshot) {  
        var tempname = snapshot.val().name;
         $("#p2name").text(tempname);
     }, function(errorObject){
         console.log("the read failed: ",errorObject.code);
     });
    
    con.on("value",function(snapshot) {
     //   waitingOne = false;
        console.log("waitingOne: ", waitingOne);

    },function(errorObject){
        console.log("failed: ",errorObject.code);
    });
   
//----------------------------------------------------
    if(performance.navigation.type == 1) {
        console.log("i refreshed");
        console.log("Iam: ",iAm);
        if(iAm === "One"){
            player1.name = "Waiting for Player 1";
           
            p1.set({
                name: player1.name
            });
    }else if(iAm === "Two"){
            player2.name = "waiting for player 2";
            
            p2.set({
                name: player2.name
            });
        }
    } else {
        console.log("not refreshed")
    }




});