function Propeller(propellerCenterInstance,airScrewInstance1,airScrewInstance2) {
    this.type = "propellers";
    this.time = 0;
    this.rotationSpeed = 1;
    this.hasChild = true;
    this.instanceCenter = propellerCenterInstance;
    this.instanceAirScrew1 = airScrewInstance1;
    this.instanceAirScrew2 = airScrewInstance2;
    
    this.spawn = function() {
        this.instanceCenter.scaling = new BABYLON.Vector3(0.35, 0.35, 0.35);
        this.instanceCenter.rotate(BABYLON.Axis.X,Math.PI/2,BABYLON.Space.LOCAL);
        this.instanceCenter.position.x = 0; 
        this.instanceCenter.position.y = 0; 
        this.instanceCenter.position.z = 70; 
        this.instanceAirScrew1.parent = this.instanceCenter;
        this.instanceAirScrew2.parent = this.instanceCenter;
        this.instanceCenter.material = propellerCenterMaterial;
        this.instanceCenter.material.diffuseColor = blackColor;
        this.instanceAirScrew2.rotate(BABYLON.Axis.Y,Math.PI,BABYLON.Space.LOCAL);
    };
    
    this.getChilds = function() {
        return [this.instanceAirScrew1,
        this.instanceAirScrew2];
        };
    
    this.getInstance = function() {
        return this.instanceCenter;
    };
    
    this.dispose = function() {
        this.instanceCenter.dispose();
        this.instanceAirScrew1.dispose();
        this.instanceAirScrew2.dispose();
        return true;
    };
    
    this.update = function(speed,delta) {
        this.time += delta;
        this.instanceCenter.position.z -= speed * delta;
        this.instanceCenter.position.x = 0.5 * Math.sin(globalTime + this.instanceCenter.position.z / 10);
        this.instanceCenter.rotate(BABYLON.Axis.Y,this.rotationSpeed*delta,BABYLON.Space.LOCAL);
    };

}
