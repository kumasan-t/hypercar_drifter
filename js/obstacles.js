function Obstacles(threshold){
    this.obstacles_array = [];
    this.threshold = threshold;
    this.spawnTime = 5;
    this.elapsedTime = 0;
    
    this.add = function(o){
        this.obstacles_array.push(o);
    }
    
    this.despawn = function(){
        this.obstacles_array = this.obstacles_array.filter(function (e) {
	    if(e.position.z < threshold)
                e.dispose();
            return e.position.z >= threshold;
	});
    }
    
    this.update = function(speed, delta){
        for(var i = 0; i<this.obstacles_array.length; i++){
            this.obstacles_array[i].position.z -= speed * delta;
            this.obstacles_array[i].material.alpha = 1+(this.obstacles_array[i].position.z/5);
        }
    }
    
    this.spawn = function(scene, delta){
        this.elapsedTime += delta;
        if(this.elapsedTime < this.spawnTime)
            return;
        this.elapsedTime = 0;
        this.spawnTime -= this.spawnTime/100;
        console.log(this.spawnTime);
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.material = new BABYLON.StandardMaterial("", scene);
        sphere.position.z = 10;
        sphere.position.x = Math.random() *2;
        sphere.position.y = Math.random();
        this.add(sphere);
    }
}