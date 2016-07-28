var fullChangeDirectionTime = 500;
var fullAngle = Math.PI/4;
var speedDirection = fullChangeDirectionTime/10000;
var i;


function updateRotation(player, delta, xMovement, yMovement){
    updateXRotation(player, delta, xMovement);
    //updateYRotation(player, delta, yMovement);
}

function updateXRotation(player, delta, xMovement){
    var direction = player.xDirection;
    if(direction > 0)
        var centerDirection = -1;
    else if(direction < 0)
        var centerDirection = +1;
    else centerDirection = 0;
    var centeringEffect = centerDirection * speedDirection * delta;
    
    if(xMovement == 0){
        if(Math.abs(direction) < Math.abs(centeringEffect)){
            direction = 0;
        }
    } else {
        var inputDirection = xMovement * 2*speedDirection * delta;
        console.log(inputDirection);
        direction += inputDirection + centeringEffect;
    }
    
    direction = Math.max(-1, Math.min(1, direction));
    player.xDirection = direction;
    player.rotation.x = direction * fullAngle;
}