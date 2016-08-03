function Propeller(propellerInstance) {
    this.type = "propellers";
    this.time = 0;
    this.rotationSpeed = 1;
    this.instance = propellerInstance;
    
    this.spawn = function() {
        this.instance.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
        this.instance.rotation.x = Math.PI / 2; 
        this.instance.position.x = 0; 
        this.instance.position.y = 0; 
        this.instance.position.z = 70; 
    };
    
    this.getInstance = function() {
        return this.instance;
    };
    
    this.update = function(speed,delta) {
        this.time += delta; 
        this.instance.position.z -= speed * delta;
        this.instance.position.x = 0.5 * Math.sin(globalTime + this.instance.position.z / 10);
        this.instance.rotate(BABYLON.Axis.Y,this.rotationSpeed*delta,BABYLON.Space.LOCAL);
    };

}

