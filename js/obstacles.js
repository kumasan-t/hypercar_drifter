function Obstacles(threshold){
    this.obstacles_array = [];
    this.obstacles_meshes = [];
    this.threshold = threshold;
    this.spawnProbability; 
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
        if (this.obstacles_meshes.length == 0 ) {
            this.meshLoader();
            return;
        }
        this.elapsedTime += delta;
        if(this.elapsedTime < this.spawnTime)
            return;
        this.elapsedTime = 0;
        this.spawnTime -= this.spawnTime/100;
        console.log(this.spawnTime);
       this.spawnObstacleGroup(this.meshPicker(1));
    }
    
    this.spawnObstacleGroup = function(selectedObstacles) {
        for (var i = 0; i < selectedObstacles.length; i++) {
            selectedObstacles[i].scaling = new BABYLON.Vector3(.25, .25, .25);
            selectedObstacles[i].position.x = (Math.random() > 1/2 ) ? Math.random() * 3 : - Math.random() * 3; 
            selectedObstacles[i].position.y = (Math.random() > 1/2 ) ? 1.2* Math.random() : - 1.2* Math.random(); 
            selectedObstacles[i].position.z = 10; 
            this.add(selectedObstacles[i]);
        }
    }
    
    this.meshPicker = function(numberOfMeshes) {
        var aboutToSpawn = [];
        var i = 0;
        var j = 0;
        while(i < numberOfMeshes) {
            if (Math.random() >= this.spawnProbability) {
                var newObstacleInstance = this.obstacles_meshes[j].createInstance("M" + i);
                aboutToSpawn.push(newObstacleInstance);
                i++;
            }
            j++;
            j >= this.obstacles_meshes.length ? j = 0 : j = j;
        }
        return aboutToSpawn;
    }
    
    this.meshLoader = function() {
        var cylinder = BABYLON.MeshBuilder.CreateCylinder("cyl", {}, scene);
        cylinder.material = new BABYLON.StandardMaterial("", scene);
        var box = BABYLON.Mesh.CreateBox("box",1,scene);
        box.material = new BABYLON.StandardMaterial("", scene);
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.material = new BABYLON.StandardMaterial("", scene);
        cylinder.position.z = -15;
        box.position.z = -15;
        sphere.position.z = -15;
        this.obstacles_meshes.push(cylinder);
        this.obstacles_meshes.push(box);
        this.obstacles_meshes.push(sphere);
        this.spawnProbability = 1/this.obstacles_meshes.length;
    }
}