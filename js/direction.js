var fullAngle = Math.PI/8;
var speedDirection = 6;
var alphaPosition = 0.02;
var alphaRotation = 0.1;
var Omega = setPeriod(2000);

function updateRotation(player, delta, xMovement, yMovement){
    updateXRotation(player, delta, xMovement);
    updateYRotation(player, delta, yMovement);
}

function updateXRotation(player, delta, xMovement){
    
    var direction = player.xDirection;
    var multiplier = 1;
    if(direction > 0)
        var centerDirection = -1;
    else if(direction < 0)
        var centerDirection = +1;
    else {centerDirection = 0;
        multiplier = 2;
    }
    var centeringEffect = centerDirection *speedDirection * delta;
    
    if(xMovement == 0){
        oldDirection = direction;
        direction += centerDirection *speedDirection * delta;
        
        if((oldDirection > 0 && direction < 0) || (oldDirection < 0 && direction > 0))
            direction = 0;
    } else {        
        direction += xMovement * speedDirection * delta;
    }
    
    direction = Math.max(-1, Math.min(1, direction));
    player.xDirection = direction;
    player.rotation.x = direction * fullAngle;
}

function updateYRotation(player, delta, yMovement){
    
    var direction = player.yDirection;
    var multiplier = 1;
    if(direction > 0)
        var centerDirection = -1;
    else if(direction < 0)
        var centerDirection = +1;
    else {centerDirection = 0;
        multiplier = 2;
    }
    var centeringEffect = centerDirection *speedDirection * delta;
    
    if(yMovement == 0){
        oldDirection = direction;
        direction += centerDirection *speedDirection * delta;
        
        if((oldDirection > 0 && direction < 0) || (oldDirection < 0 && direction > 0))
            direction = 0;
    } else {        
        direction += yMovement * speedDirection * delta;
    }
    
    player.position.y -= alphaPosition * Math.sin(Omega * getTime()); //Oscillation on the Y axis.
    direction = Math.max(-1, Math.min(1, direction));
    player.yDirection = direction;
    player.rotation.z = direction * fullAngle;
    player.rotation.z -= alphaRotation * Math.sin(Omega * getTime()); //Oscillate around the previous angle.
}

function setPeriod(period) {
    return 2 * Math.PI / period;
}

function getTime() {
    var d = new Date();
    return d.getTime();
}