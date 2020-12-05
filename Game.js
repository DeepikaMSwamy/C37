class Game {
  constructor(){

  }
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(25);
    text("Game Started!",150,200);
    player.getPlayerInfo();

    if(allPlayers !== undefined){
      var displayPosition = 130;
      for(var plr in allPlayers){
         if(plr === "player" + player.index)
           fill("red");
         
         else
           fill("black");
         
         displayPosition+= 15;
         textSize(25);
         text(allPlayers[plr].name+":"+allPlayers[plr].distance,150,displayPosition);
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance+=50;
      player.update();
    }
  }
}