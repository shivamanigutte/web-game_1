var distance = 24;
$(document).ready(function(){
    lastUpdate = 0;
    player = Player('player', 'left');
    player.move(0);
    opponent = Player('opponent', 'right');
    opponent.move(0);
    ball = Ball();
    $('#up').bind('pointerdown', function(){
        player.move(-distance);
    })
    $('#down').bind('poinyterdown', function(){
        player.move(distance);
    })
    requestAnimationFrame(update);
})
$(document).keydown(function(event){
    var event = event || window.event;
    switch(String.fromCharCode(event.keyCode).toUpperCase()){
        case 'A':
            player.move(-distance);
            break;
        case 'B':
            player.move(distance);
            break;  
    }
    return false;
});
var move = function(t) {
     
      if (owner !== undefined) {
        var ownerPosition = owner.getPosition();
        position[1] = ownerPosition[1] + 64;
        if (owner.getSide() == 'left') {
          position[0] = ownerPosition[0] + 64;
        } else {
             position[0] = ownerPosition[0];
        }
      
      } else {
      
        if (position[1] - 32 <= 0 || position[1] + 32 >= innerHeight) {
          velocity[1] = -velocity[1];
        }
        position[0] += velocity[0] * t;
        position[1] += velocity[1] * t;
      }
      element.css('left', (position[0] - 32) + 'px');
      element.css('top', (position[1] - 32) + 'px');
    }
    return {
         move: move,
         getSide:  function()  { return side; },
         getPosition:  function() { return position; }
        }
        var update = function(t) {
            
            if(!paused) {
                 move(t);
            }
           
            if (owner !== undefined) {
               return;
            }
            
            var playerPosition = player.getPosition();
            if (position[0] <= 128 &&
                  position[1] >= playerPosition[1] &&
                  position[1] <= playerPosition[1] + 128) {
                console.log("Grabbed by player!");
                owner = player;
            }
            
            var opponentPosition = opponent.getPosition();
              if (position[0] >= innerWidth - 128 &&
                  position[1] >= opponentPosition[1] &&
                  position[1] <= opponentPosition[1] + 128) {
                console.log("Grabbed by opponent!");
                owner = opponent;
            }   } 
            var aim = 0;
            var fire = function() {
             
            if (ball.getOwner() !== this) {
             return;
             }
            var v = [0,0];
            
             if (side == 'left') {
             switch(aim) {
             case -1:
             v = [.707, -.707];
             break;
             case 0:
             v = [1,0];
         break;
            case 1:
             v = [.707, .707];
            }
         } else {
            switch(aim) {
            case -1:
             v = [-.707, -.707];
            break;
            case 0:
             v = [-1,0];
             break;
            case 1:
             v = [-.707, .707];
             }
             }
            ball.setVelocity(v);
           
            ball.setOwner(undefined);
            }
           
            return {
             move: move,
            fire: fire,
             getSide:   function()  { return side; },
            setAim:   function(a) { aim = a; },
            getPosition:function()  { return position; },
            }
            $(document).keydown(function(event) {
                var event = event || window.event;
                switch(String.fromCharCode(event.keyCode).toUpperCase()) {
                 case 'A':
                 player.move(-distance);
                 break;
                 case 'Z':
                 player.move(distance);
                 break;
                 case 'K':
                player.setAim(-1);
                break;
                case 'M':
                 player.setAim(1);
                 break;
                case ' ':
                 player.fire();
                 break;
                 }
             return false;
                });
                $(document).keyup(function(event) {
                var event = event || window.ev
             switch(String.fromCharCode(event.keyCode).toUpperCase()) {
                 case 'K':
                 case 'M':
                player.setAim(0);
                 break;
                 }
                 return false;
                }); 
                $('#left').bind("pointerdown", function() {player.setAim(-1);});
                $('#right').bind("pointerdown", function() {player.setAim(1);});
                $('#left').bind("pointerup",  function() {player.setAim(0);});
                $('#right') .bind("pointerup",   function() {player.setAim(0);});
                $('body')  .bind("pointerdown", function() {player.fire();});
                function checkScored() {
                     if (position[0] <= 0) {
                     pause();
                     $(document).trigger('ping:opponentScored');
                     }
                     if (position[0] >= innerWidth) {
                      pause();
                     $(document).trigger('ping:playerScored');
                     }
                    }
                     function AI(playerToControl) {
                        var ctl = playerToControl;
                        var State = {
                        WAITING: 0,
                        FOLLOWING: 1,
                         AIMING: 2
                        }
                        var currentState = State.FOLLOWING;
                        }
                         function update() {
                        switch (currentState) {
                        case State.FOLLOWING:
                       
                        break;
                        case State.WAITING:
                       
                         break;
                        case State.AIMING:
                         // Do something to aim.
                        break;
                          }
                        }
                         function moveTowardsBall() {
                        
                          if(ball.getPosition()[1] >= ctl.getPosition()[1] + 64) {
                         ctl.move(distance);
                         } else {
                         ctl.move(-distance);
                         }
                        }
                        function update() {
                        switch (currentState) {
                         case State.FOLLOWING:
                        moveTowardsBall();
                         currentState = State.WAITING;
                         case State.WAITING:
                        setTimeout(function() {
                         currentState = State.FOLLOWING;
                         }, 400);
                         break;
                         }
                       }
                        
                         function update(time) {
                        var t = time - lastUpdate;
                        lastUpdate = time;
                        ball.update(t);
                        ai.update();
                         requestAnimationFrame(update);
                        }
                         function repeat(cb, cbFinal, interval, count) {
                        var timeout = function() {
                        repeat(cb, cbFinal, interval, count-1);
                         }
                        if (count <= 0) {
                         cbFinal();
                       } else {
                         cb();
                        setTimeout(function() {
                         repeat(cb, cbFinal, interval, count-1);
                        }, interval);
                         }
                        }
                        function aimAndFire() {
                        
                        var numRepeats = Math.floor(5 + Math.random() * 5);
                        function randomMove() {
                     if (Math.random() > .5) {
                        ctl.move(-distance);
                         } else {
                         ctl.move(distance);
                         }
                         }
                         function randomAimAndFire() {
                         var d = Math.floor( Math.random() * 3 - 1 );
                         opponent.setAim(d);
                         opponent.fire();
                       
                         currentState = State.FOLLOWING;
                        }
                         repeat(randomMove, randomAimAndFire, 250, numRepeats);
                        }                                                                        