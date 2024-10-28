var Ball = function()
    {
        var velocity = [0,0];
        var position = [0,0];
        var element = $('#ball');
        var paused = false;
        function move(t){
        }
        function update(t){
            if(!paused){
                move(t);
            }
        }
        function paused(){
            paused = true;
        }
        function start(){
            paused = false;
        }
        return{
            update:  update,
            start:   start,
            paused:  paused
        };
    };
    var ball = Ball();
    var lastUpdate = 0;
    function update(time){
        var t = time - lastUpdate;
        lastUpdate = time;
        ball.update(t);
        requestAnimationFrame(update);

    }
    requestAnimationFrame(update);
    var ball;
    var lastUpdate;
    $(document).ready(function(){
        lastUpdate = 0;
        ball = Ball();
        requestAnimationFrame(update);
    });
    var position = [300,300];
    var velocity = [-1,-1];
    var move = function(t){
        position[0] += velocity[0] * t;
        position[1] += velocity[1] * t;
        element.css('left' , position[0] +'px');
        element.css('right' ,position[1] + 'px');
    }
    var move = function(t){
        if(position[0] <= 0 || position[0] >= innerWidth){
            velocity[0] = -velocity[0];
        }
        position[0] += velocity[0] * t;
        position[1] +=velocity[1] * t;
        element.css('left', (position[0] - 32) + 'px');
        element.css('right', (position[1] - 32) + 'px');
    }
    var Player = function(elementName, side){
        var position = [0,0];
        var element = $('#' + elementName);
        var move = function(y){

        }
        return{
            move: move,
            getSide:   function() { return side; },
            getPosition:  function() { return position; }
        }
    }
    player = Player('player', 'left');
    player.move(0);
    opponent = Player('opponent', 'right');
    opponent.move(0);
    var move = function(y){
        position[1] += y;
        if (position[1] <= 0) {
            position[1] = 0;
        }
        if (position[1] >= innerHeight - 128){
            position[1] = innerHeight - 128; 
        }
        if (side == 'right'){
            position[0] = innerHeight - 128;
        }
        element.css('left', position[0] + 'px');
        element.css('top', position[1] + 'px');
    }
    

