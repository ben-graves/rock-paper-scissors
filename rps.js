var readlineSync = require("readline-sync");

var weapons = ["rock", "paper", "scissors"];
var results = [["rock", "scissors"], ["paper", "rock"], ["scissors", "paper"]];
var player1Score = 0;
var player2Score = 0;
var cpuScore = 0;

function playComputer(){
  while (true) {
    console.log("You: " + player1Score);
    console.log("Cpu: " + cpuScore);
    var computerWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    var playerWeapon = "";
    var answer = readlineSync.question("Rock, paper or scissors? ");
    playerWeapon = answer.toLowerCase().trim();
    rps(playerWeapon, computerWeapon, "Player 1", "Computer");
  }
}

function rps(player1Weapon, player2Weapon, player1, player2){
  if (weapons.indexOf(player1Weapon) != -1 && weapons.indexOf(player2Weapon) != -1){
    if(player1Weapon != player2Weapon){
      for(var i = 0; i < results.length; i++){
        if(results[i][0] == player1Weapon && results[i][1] == player2Weapon){
          return {'winner': player1, 'winnerWeapon': player1Weapon, "loser": player2, "loserWeapon": player2Weapon};;
        } else if(results[i][0] == player2Weapon && results[i][1] == player1Weapon){
          return {'winner': player2, 'winnerWeapon': player2Weapon, "loser": player1, "loserWeapon": player1Weapon};;
        }
      }
    }
    else {
      return null;
    }
  }
}

// playComputer();

module.exports = {
    rps: rps
}
