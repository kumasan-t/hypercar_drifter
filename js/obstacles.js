function Obstacles(threshold){
    this.obstacles_array = [];
    this.threshold = threshold;
    
    this.add = function(o){
        obstacles_array.push(o);
    }
    
    this.despawn = function(){
        this.obstacles_array = this.obstacles_array.filter(function (e) {
	    if(e.position.z < threshold)
                e.dispose();
            return e.position.z >= threshold;
	});
    }
    
    this.update = function(speed, delta){
        for(var i = 0; i<obstacles_array.length; i++){
            obstacles_array[i].position.z -= speed * delta;
        }
    }
}