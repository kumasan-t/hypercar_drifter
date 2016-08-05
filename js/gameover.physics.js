function gameover(player, planes, obstacles, scene, timestep){
    scene.collisionsEnabled = false;
    scene.clearColor = new BABYLON.Color3(.5, .5, .95);
    scene.fogDensity = 0;
    scene.fogMode = null;
    scene.enablePhysics(new BABYLON.Vector3(0,-0.1, 0), new BABYLON.CannonJSPlugin());
    scene.getPhysicsEngine().setTimeStep(timestep); 
    player.rotation.x =  0;
    //player.rotation.y =  0;
    player.rotation.z =  0;
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9, friction:0 }, scene);
    player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 2, 10));
    for(var i = 0; i < planes.length ; i++){
        planes[i].physicsImpostor = new BABYLON.PhysicsImpostor(planes[i], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9, friction:0 }, scene);
        planes[i].physicsImpostor.applyImpulse(new BABYLON.Vector3(2*Math.random()-1, 5*Math.random(), 0), planes[i].getAbsolutePosition());
    }
        
    for(var i = 0; i < obstacles.length ; i++){
        obstacles[i].getInstance().physicsImpostor = new BABYLON.PhysicsImpostor(obstacles[i].getInstance(), BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9, friction:0 }, scene);
        obstacles[i].getInstance().physicsImpostor.setLinearVelocity(new BABYLON.Vector3(5*Math.random()-1, 2*Math.random(), 0));
    }
    
}

