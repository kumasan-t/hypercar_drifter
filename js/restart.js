function Restart(scene) {
    
    function disablePhysicsEngine() {
        scene.disablePhysicsEngine();
    }
    
    this.clearScene = function() {
        disablePhysicsEngine();
        despawnAll();
        resetCars();
        resetSpeeds();
        respawnPlanes();
    };
    
    function respawnPlanes() {
        planeManager = new Plane(-10,50);
        planeManager.spawn(scene);
    }
    
    function resetCarParticles() {
        fountain.position.x = car.position.x - .075;
        fountain.position.y = car.position.y;
        fountain.position.z = car.position.z - .1;
        fountain2.position.x = car.position.x + .075;
        fountain2.position.y = car.position.y;
        fountain2.position.z = car.position.z - .1;
    }
    
    function resetCars() {
        car = meshCar.createInstance("caar");
        car.rotation.y = -Math.PI / 2;
        car.position.x = 0;
        car.position.y = 0;
        car.xDirection = 0;
        car.yDirection = 0;
        car.isVisible = true;
        carGround = meshCarGround.createInstance("carGround");
        carGround.showBoundingBox = true;
        carGround.parent = car;        
    }
    
    function despawnAll() {
        planeManager.planeArray.forEach(function(curr) {curr.dispose()});
        for (var i = 0; i < obstaclesManager.obstacles_array.length; i++) {
            if (obstaclesManager.obstacles_array[i].getInstance().hasChild) {
                var childs = obstaclesManager.obstacles_array[i].getInstance().getChild();
                for (var j = 0; j < childs.length; j++)
                    childs.dispose();
            }
            obstaclesManager.obstacles_array[i].getInstance().dispose();
        } 
        car.dispose();
        carGround.dispose();
    }
    
    function resetSpeeds() {
        carSpeed = 3;
        obstacleSpeed = 1;
    }
}