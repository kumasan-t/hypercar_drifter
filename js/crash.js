function checkCrash(player, obstacles) {
    for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i].getInstance().position.z > 2.5) {
            return false;
        }
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
