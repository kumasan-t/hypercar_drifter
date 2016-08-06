function gameScene() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(.5, .5, .95);

    scene.clearColor = new BABYLON.Color3(.95, .95, .95);

    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.groundColor = new BABYLON.Color3(0.5, 0, 0.5);
    light.intensity = 1;

    specularLight = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, -1), scene);
    specularLight.diffuseColor = new BABYLON.Color3(0, 0, 0);
    specularLight.specularColor = new BABYLON.Color3(1, 1, 1);
    specularLight.range = 10;
    specularLight.intensity = 10;

    fountain = BABYLON.Mesh.CreateBox("fountain", .1, scene);
    fountain.isVisible = false;
    var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("assets/Flare.png", scene);
    particleSystem.minEmitBox = new BABYLON.Vector3(-0, 0, 0);
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(1, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 1, 0);
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.04;
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = .5;
    particleSystem.emitRate = 100;
    particleSystem.direction1 = new BABYLON.Vector3(0.1, 0.1, -2);
    particleSystem.direction2 = new BABYLON.Vector3(-0.1, -0.1, -2);
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = 0;
    particleSystem.emitter = fountain;
    fountain2 = fountain.clone();
    particleSystem.start();

    BABYLON.SceneLoader.ImportMesh("", "assets/", "supercar.babylon", scene, function (meshes) {
        meshCar = meshes[0];
        BABYLON.SceneLoader.ImportMesh("", "assets/", "sottocar.babylon", scene, function (bottom) {
            bottom[0].parent = meshCar;
            bottom[0].position.x = 1.1;
            bottom[0].position.z = 0;
            bottom[0].material = new BABYLON.StandardMaterial("", scene);
            bottom[0].material.diffuseColor = new BABYLON.Color3(.05, .05, .05);
            bottom[0].material.specularColor = new BABYLON.Color3(0, 0, 0);
            meshCarGround = bottom[0];
            meshCarGround.showBoundingBox = true;
            meshCarGround.isVisible = false;
            meshCar.checkCollision = true;
            meshCar.scaling = new BABYLON.Vector3(.085, .085, .085);
            meshCar.isVisible = false;
            car = meshCar.createInstance("caar");
            car.rotation.y = -Math.PI / 2;
            car.position.x = 0;
            car.position.y = 0;
            car.xDirection = 0;
            car.yDirection = 0;
            car.isVisible = true;
            carGround = meshCarGround.createInstance("carGround");
            carGround.showBoundingBox = true;
            carGround.parent = car;
            carLoaded = true;
        });
    });

    var planeMaterial = loadPlaneMaterial(scene);
    BABYLON.SceneLoader.ImportMesh("", "assets/", "pianohuhu.babylon", scene, function (meshes) {
        meshes[0].rotation.x = -Math.PI / 2;
        meshes[0].scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
        meshes[0].material = planeMaterial;
        meshes[0].isVisible = false;
        meshPlane = meshes[0];
        planeLoaded = true;
        planeManager.spawn(scene);
    });

    BABYLON.SceneLoader.ImportMesh("", "assets/", "barilenitro.babylon", scene, function (meshes) {
        meshBarrel = meshes[0];
        meshBarrel.type = "nitro_barrel";
        meshBarrel.isVisible = false;
        meshBarrel.checkCollision = true;
        barrelLoaded = true;
    });

    BABYLON.SceneLoader.ImportMesh("", "assets/", "centro.babylon", scene, function (meshes) {
        meshPropellerCenter = meshes[0];
        meshPropellerCenter.type = "propeller";
        meshPropellerCenter.position.z = 10;
        propellerLoaded = true;
        meshPropellerCenter.checkCollision = true;
        meshPropellerCenter.isVisible = false;
        propellerCenterLoaded = true;
    });
    BABYLON.SceneLoader.ImportMesh("", "assets/", "pala.babylon", scene, function (meshes) {
        meshAirScrew = meshes[0];
        meshAirScrew.parent = meshPropellerCenter;
        meshAirScrew.type = "propeller";
        meshAirScrew.checkCollision = true;
        meshAirScrew.isVisible = false;
        airScrewLoaded = true;
    });

    propellerCenterMaterial = new BABYLON.StandardMaterial("blackMaterial", scene);
    blackColor = new BABYLON.Color3(0, 0, 0);

    obstaclesManager = new Obstacles(-15);

    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    scene.fogDensity = 1;
    scene.fogStart = 10.0;
    scene.fogEnd = 50.0;

    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, -2.5), scene);

    scene.update = gameUpdateLoop;

    globalTime = 0;

    return scene;
}

function gameUpdateLoop() {

    document.getElementById("counter").innerHTML = engine.fps.toFixed(2);
    if (obstacleSpeed > 0)
        obstacleSpeed = 3 + 12 * (1 - Math.exp(-0.01 * globalTime));

    if (carLoaded & barrelLoaded & propellerLoaded) {
        var xMovement = 0, yMovement = 0;
        if (keys.left == 1)
            xMovement += 1;
        if (keys.right == 1)
            xMovement -= 1;
        if (keys.up == 1)
            yMovement += 1;
        if (keys.down == 1)
            yMovement -= 1;
        if (carSpeed > 0)
            updateRotation(car, 1 / engine.fps, xMovement, yMovement);

        if (carSpeed > 0) {
            car.position.x -= carSpeed / engine.fps * car.xDirection;
            car.position.y += carSpeed / engine.fps * car.yDirection;

            if (car.position.x > 1) {
                car.position.x = 1;
            }
            if (car.position.y > .5) {
                car.position.y = .5;
            }
            if (car.position.x < -1) {
                car.position.x = -1;
            }

            if (car.position.y < -.5) {
                car.position.y = -.5;
            }
        }

        specularLight.position.x = car.position.x * 4;
        specularLight.position.y = car.position.y * 4;

        if (obstacleSpeed > 0) {
            obstaclesManager.update(obstacleSpeed, 1 / engine.fps);
            obstaclesManager.despawn();
            obstaclesManager.spawn(gameScene, 1 / engine.fps);
            planeManager.update(obstacleSpeed, 1 / engine.fps);
            if (checkCrash(carGround, obstaclesManager.getCurrentObstacles())) {
                obstacleSpeed = 0;
                carSpeed = 0;
                guiGameover();
                gameover(car, planeManager.planeArray, obstaclesManager.obstacles_array, gameScene, 1 / engine.fps);
            }
        }

        fountain.position.x = car.position.x - .075;
        fountain.position.y = car.position.y;
        fountain.position.z = car.position.z - .1;
        fountain2.position.x = car.position.x + .075;
        fountain2.position.y = car.position.y;
        fountain2.position.z = car.position.z - .1;
    }
}

function loadPlaneMaterial(scene) {
    var material = new BABYLON.StandardMaterial('a', scene);
    material.alpha = 1;
    material.backFaceCulling = true;
    material.specularPower = 64;
    material.useSpecularOverAlpha = true;
    material.useAlphaFromDiffuseTexture = false;

    //Diffuse definitions;
    var material_diffuseTexture = new BABYLON.Texture('assets/pianospritep.png', scene);
    material_diffuseTexture.uScale = 1;
    material_diffuseTexture.vScale = 1;
    material_diffuseTexture.coordinatesMode = 0;
    material_diffuseTexture.uOffset = 0;
    material_diffuseTexture.vOffset = 0;
    material_diffuseTexture.uAng = 0;
    material_diffuseTexture.vAng = 0;
    material_diffuseTexture.level = 1;
    material_diffuseTexture.coordinatesIndex = 0;
    material_diffuseTexture.hasAlpha = false;
    material_diffuseTexture.getAlphaFromRGB = false;
    material.diffuseTexture = material_diffuseTexture;
    material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

    //Emissive definitions;

    material.emissiveColor = new BABYLON.Color3(0.04, 0.99, 0.76);

    //Texture parameters ;
    var material_emissiveTexture = new BABYLON.Texture('assets/pianosprites2.png', scene);
    material_emissiveTexture.uScale = 1;
    material_emissiveTexture.vScale = 1;
    material_emissiveTexture.coordinatesMode = 0;
    material_emissiveTexture.uOffset = 0;
    material_emissiveTexture.vOffset = 0;
    material_emissiveTexture.uAng = 0;
    material_emissiveTexture.vAng = 0;
    material_emissiveTexture.level = 1;
    material_emissiveTexture.coordinatesIndex = 0;
    material_emissiveTexture.hasAlpha = false;
    material_emissiveTexture.getAlphaFromRGB = false;
    material.emissiveTexture = material_emissiveTexture;

    //Ambient definitions;
    material.ambientColor = new BABYLON.Color3(0.00, 0.00, 0.00);

    //Specular definitions;
    material.specularColor = new BABYLON.Color3(1.00, 1.00, 1.00);

    //Specular texture Parameters ;
    var material_specularTexture = new BABYLON.Texture('assets/pianosprites2.png', scene);
    material_specularTexture.uScale = 1;
    material_specularTexture.vScale = 1;
    material_specularTexture.coordinatesMode = 0;
    material_specularTexture.uOffset = 0;
    material_specularTexture.vOffset = 0;
    material_specularTexture.uAng = 0;
    material_specularTexture.vAng = 0;
    material_specularTexture.level = 1;
    material_specularTexture.coordinatesIndex = 0;
    material_specularTexture.hasAlpha = false;
    material_specularTexture.getAlphaFromRGB = false;
    material.specularTexture = material_specularTexture;

    material.freeze();
    return material;
}