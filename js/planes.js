function Plane(threshold, maxPlanes) {
    this.maxPlanes = maxPlanes;
    this.time = 0; // used to update the planes position
    this.totalPlanes = 0; // planes currently in front of the camera
    this.threshold = threshold; // z position before the despawn
    this.planeArray = [];
    this.planePosition = 0; // z position the nex plane is goin to be spawned at
    this.planeDistance = 1.3; // distance bewteen the planes

    /* Spawns the planes and add them to the array */
    this.spawn = function (scene) {
        for (var planes = 0; planes < this.maxPlanes; planes++) {
            var newPlaneInstance = meshPlane.createInstance("PLANE" + (this.planePosition < 10) ? "0" + this.planePosition : this.planePosition);
            newPlaneInstance.rotate(BABYLON.Axis.Y, this.planePosition * Math.PI / 4, BABYLON.Space.LOCAL);
            newPlaneInstance.position.z = this.planePosition * this.planeDistance;
            this.planePosition++;
            this.planeArray.push(newPlaneInstance);
        }
    }

    /* Update the planes position using the speed parameter and the time since the last render */
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

