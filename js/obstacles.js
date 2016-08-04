function Obstacles(threshold, maxObstacles) {
    this.obstacles_array = [];
    this.obstacles_meshes = [];
    this.threshold = threshold;
    this.spawnTime = 0.8;
    this.elapsedTime = 0;
    this.totalMeshes = 0;
    this.maxObstacles = maxObstacles || 1; //If not specified as input,
                                           //default value is 1.
    
    this.add = function(o){
        this.obstacles_array.push(o);
    };
    
    this.despawn = function(){
        this.obstacles_array = this.obstacles_array.filter(function (e) {
	    if(e.getInstance().position.z < threshold)
                e.getInstance().dispose();
            return e.getInstance().position.z >= threshold;
	});
    };
    
    this.update = function(speed, delta){
        for(var i = 0; i<this.obstacles_array.length; i++){
            this.obstacles_array[i].update(speed,delta);
        }
    };
    
    this.spawn = function(scene, delta){
        if (this.obstacles_meshes.length == 0 ) {
            this.meshLoader(scene);
            return;
        }
        this.elapsedTime += delta;
        if(this.elapsedTime < (5*Math.exp(-0.05 * globalTime) + 0.2))
            return;
        this.elapsedTime = 0;
        //console.log("SPAWN: " + (5*Math.exp(-0.01 * globalTime) + 0.5));
       this.spawnObstacleGroup(this.meshPicker(this.maxObstacles));
    };
    
    this.spawnObstacleGroup = function(selectedObstacles) {
        for (var i = 0; i < selectedObstacles.length; i++) {
            selectedObstacles[i].spawn();
            this.add(selectedObstacles[i]);
        }
    };
    
    /**
     * In this is method we are required to check every selcted mesh type in
     * order to create the proper corresponding object. Further meshes must be
     * added manually to the switch case with the proper class.
     * @param {type} numberOfMeshes
     * @returns {Array|Obstacles.meshPicker.aboutToSpawn}
     */
    this.meshPicker = function(numberOfMeshes) {
        var aboutToSpawn = [];
        var i = 0;
        while(i < numberOfMeshes) {
            var randomIndex = this.getRandomInt(0,this.obstacles_meshes.length);
            var pickedMesh = this.obstacles_meshes[randomIndex];
            switch(pickedMesh.type) {
                case "nitro_barrel":
                    var nitroBarrel = new Barrel(pickedMesh.createInstance("B" + (this.totalMeshes < 10) ? "0" + this.totalMeshes : this.totalMeshes ));
                    aboutToSpawn.push(nitroBarrel);
                    i++;
                    this.totalMeshes++;
                    break;
                
                case "propeller" :
                    if (Math.random() < 0.1 ) {
                        console.log("aggiorno");
                        var propeller = new Propeller(pickedMesh.createInstance("P" + (this.totalMeshes < 10) ? "0" + this.totalMeshes : this.totalMeshes ))
                        aboutToSpawn.push(propeller);
                        i++;
                        this.totalMeshes++;
                    }
                    break;
                    
                default:
            }
        }
        return aboutToSpawn;
    };
    
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    
    this.meshLoader = function() {
        this.obstacles_meshes.push(meshPropellers);
        this.obstacles_meshes.push(meshBarrel);
    };
}