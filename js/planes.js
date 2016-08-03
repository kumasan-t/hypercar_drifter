function Plane(threshold, maxPlanes) {
    this.maxPlanes = maxPlanes;
    this.time = 0;
    this.totalPlanes = 0;
    this.threshold = threshold; 
    this.planeArray = [];
    this.planePosition = 0;
    this.planeDistance = 1.3;

    this.spawn = function (scene) {
        console.log("MAX: " +this.maxPlanes);
        for (var planes = 0; planes < this.maxPlanes; planes++) {
            var newPlaneInstance = meshPlane.createInstance("PLANE" + (this.planePosition < 10) ? "0" + this.planePosition : this.planePosition);
            newPlaneInstance.rotate(BABYLON.Axis.Y, this.planePosition * Math.PI / 4, BABYLON.Space.LOCAL);
            newPlaneInstance.position.z = this.planePosition * this.planeDistance;
            this.planePosition++;
            this.planeArray.push(newPlaneInstance);
        }
    }

    this.update = function (speed, delta) {
        this.time += delta;
        if (this.planePosition + 1 < this.maxPlanes) {
            return;
        }
        for (var i = 0; i < this.planeArray.length; i++) {
            this.planeArray[i].position.z -= speed * delta;

            if (this.planeArray[i].position.z < this.threshold)
                this.planeArray[i].position.z += this.maxPlanes * this.planeDistance;
            this.planeArray[i].position.x = 0.5 * Math.sin(globalTime + this.planeArray[i].position.z / 10);
        }
    }
}

