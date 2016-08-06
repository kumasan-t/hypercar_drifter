function mainMenuScene(){
    var menuScene = new BABYLON.Scene(engine);
    menuScene.clearColor = new BABYLON.Color3(.5, .5, .95);
               
    var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), 2, 50, menuScene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.intensity = 2;    
    menuScene.lampione = light0;
    
    initGround(menuScene);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 1.3, 10, BABYLON.Vector3.Zero(), menuScene);

    menuScene.update = mainMenuUpdateLoop;
    
    return menuScene;
}

function initGround(scene){
    var ground = BABYLON.Mesh.CreateDisc("disc", 6, 80, scene);

    material = new BABYLON.StandardMaterial("kosh5", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, .3);
    material.emissiveColor = new BABYLON.Color3(0.197647, 0.0117647, 0.150588);
    
    var material_diffuseTexture = new BABYLON.Texture('assets/pianospritemm.png', scene);
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

    ground.material = material;
    ground.rotation.x = Math.PI /2;
    ground.position.y = -1;
    
    return ground;
}

function mainMenuUpdateLoop(){
    var delta = 1/engine.fps;
    this.activeCamera.alpha += delta/5;
    this.lampione.exponent = 20 * Math.sin(globalTime*2) + 20;
    var color = this.lampione.exponent;
    this.lampione.diffuse = new BABYLON.Color3(1, color/40, color/40);
}