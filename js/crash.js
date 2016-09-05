/* This function checks if the car intersects any obstacles */
function checkCrash(player, obstacles) {
    for (var i = 0; i < obstacles.length; i++) {
        /* If the obstacles are too far form the car, end the check 
         * returning false since the obstacles are ordered in the array
         * with regard to the position along the z axis */
        if (obstacles[i].getInstance().position.z > 2.5) {
            return false;
        }
        
        /* if the obstacle is composed of multiple objects,
         * checks the collision between the car and all the obstacle's parts
         */
        if (obstacles[i].hasChild === true) {
            var childs = obstacles[i].getChilds();
            for (var j = 0; j < childs.length; j++) {
                if (player.intersectsMesh(childs[j], false)) {
                    if (checkCrashPrecise(player, childs[j])) {
                        return true;
                    }
                }
            }
        }
        
        /* to increase the performances, at first a low precision
         * intersection check is executed, then only if this intersection check
         * returns true run a more precise intersection check
         */ 
        if (player.intersectsMesh(obstacles[i].getInstance(), false)) {
            if (checkCrashPrecise(player, obstacles[i].getInstance())){
                return true;
            }
        }
    }
    return false;
}

function checkCrashPrecise(player, obstacleInstance) {
    return player.intersectsMesh(obstacleInstance, true);
}
