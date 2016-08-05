function Barrel(barrelInstance) {
    this.type = "nitro_barrel";
    this.instance = barrelInstance;
    this.hasChild = false;
    this.floatingSpeed = 0.55;
    this.spawnCenterX;
    this.spawn = function() {
        this.instance.scaling = new BABYLON.Vector3(.15, .25, .15);
        this.spawnCenterX = (Math.random() > 1/2 ) ? 1.2 * Math.random() : - 1.2 * Math.random();
        this.instance.position.y = (Math.random() > 1/2 ) ? 1.2 * Math.random() : - 1.2 * Math.random(); 
        this.instance.position.z = 70;
    };
    
    this.getInstance = function() {
        return this.instance;
    };
    
    this.dispose = function() {
        this.instance.dispose();
        return true;
    };
    
    this.update = function(speed,delta) {
        this.instance.position.z -= speed * delta;
        this.instance.material.alpha = 1+(this.instance.position.z/5);
        this.instance.position.x = this.spawnCenterX + 0.5 * Math.sin(globalTime + this.instance.position.z / 10);
        this.instance.rotate(BABYLON.Axis.X,this.floatingSpeed*delta,BABYLON.Scene.LOCAL);
        this.instance.rotate(BABYLON.Axis.Z,this.floatingSpeed*delta,BABYLON.Scene.LOCAL);
    };
}
