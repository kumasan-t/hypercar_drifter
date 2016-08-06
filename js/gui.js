function guiGameover() {
    document.getElementById("gameover").style.display = "block";
    var gameoverCanvas = new BABYLON.ScreenSpaceCanvas2D(gameScene, {
        id: "gameoverCanvas",
        width: 1066, height: 600, backgroundFill: "#00000080"}
    );

    var retryButton = new BABYLON.Rectangle2D(
            {parent: gameoverCanvas, id: "retryBtn", x: 433, y: 60, width: 200, height: 80,
                fill: "#40C040FF", roundRadius: 10,
                children:
                        [
                            new BABYLON.Text2D("Retry", {marginAlignment: "h: center, v: center", fontName: "20pt Arial"})
                        ]
            });

    retryButton.pointerEventObservable.add(function () {
        gameScene.beginAnimation(retryButton, 0, 10, false);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    var animation = new BABYLON.Animation("sizeAnim3", "size", 60, BABYLON.Animation.ANIMATIONTYPE_SIZE,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Size(190, 70)});
    keys.push({frame: 3, value: new BABYLON.Size(200, 80)});
    animation.setKeys(keys);
    retryButton.animations.push(animation);
    
    var animation = new BABYLON.Animation("positionAnim3", "position", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Vector3(438,65,0)});
    keys.push({frame: 3, value: new BABYLON.Vector3(433,60,0)});
    keys.push({frame: 10, value: new BABYLON.Vector3(433,60,0)});
    animation.setKeys(keys);
    
    var event1 = new BABYLON.AnimationEvent(10, function () {
        document.getElementById("gameover").style.display = "none";
        gameoverCanvas.dispose();
        var restart = new Restart(gameScene);
        restart.clearScene();
    }, true);
    animation.addEvent(event1);
    retryButton.animations.push(animation);
    
    return canvas;
}

function guiMainMenu(scene) {
    var canvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
        id: "ScreenCanvas",
        width: 1066, height: 600, backgroundFill: "#00000080"}
    );

    var newGameButton = new BABYLON.Rectangle2D(
            {parent: canvas, id: "newGameBtn", x: 433, y: 100, width: 200, height: 80,
                fill: "#40C040FF", roundRadius: 10,
                children:
                        [
                            new BABYLON.Text2D("New Game", {marginAlignment: "h: center, v: center", fontName: "20pt Arial"})
                        ]
            });

    var creditsButton = new BABYLON.Rectangle2D(
            {parent: canvas, id: "creditsBtn", x: 900, y: 40, width: 120, height: 50,
                fill: "#40C040FF", roundRadius: 10,
                children:
                        [
                            new BABYLON.Text2D("Credits", {marginAlignment: "h: center, v: center", fontName: "14pt Arial"})
                        ]
            });

    var animation = new BABYLON.Animation("sizeAnim", "size", 60, BABYLON.Animation.ANIMATIONTYPE_SIZE,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Size(190, 70)});
    keys.push({frame: 3, value: new BABYLON.Size(200, 80)});
    animation.setKeys(keys);
    newGameButton.animations.push(animation);
    
    var animation = new BABYLON.Animation("positionAnim", "position", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Vector3(438,105,0)});
    keys.push({frame: 3, value: new BABYLON.Vector3(433,100,0)});
    keys.push({frame: 10, value: new BABYLON.Vector3(433,100,0)});
    animation.setKeys(keys);
    
    var event1 = new BABYLON.AnimationEvent(10, function () {
        canvas.dispose();
        currentScene = gameScene;
    }, true);
    animation.addEvent(event1);
    newGameButton.animations.push(animation);
    
    newGameButton.pointerEventObservable.add(function () {
        scene.beginAnimation(newGameButton, 0, 10, false);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    
    var animation = new BABYLON.Animation("sizeAnim2", "size", 60, BABYLON.Animation.ANIMATIONTYPE_SIZE,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Size(110, 40)});
    keys.push({frame: 3, value: new BABYLON.Size(120, 50)});
    animation.setKeys(keys);
    creditsButton.animations.push(animation);
    
    var animation = new BABYLON.Animation("positionAnim2", "position", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({frame: 0, value: new BABYLON.Vector3(905,45,0)});
    keys.push({frame: 3, value: new BABYLON.Vector3(900,40,0)});
    keys.push({frame: 10, value: new BABYLON.Vector3(900,40,0)});
    animation.setKeys(keys);
    
    var event1 = new BABYLON.AnimationEvent(10, function () {
        canvas.dispose();
    }, true);
    animation.addEvent(event1);
    creditsButton.animations.push(animation);
    
    creditsButton.pointerEventObservable.add(function () {
        scene.beginAnimation(creditsButton, 0, 10, false);
    }, BABYLON.PrimitivePointerInfo.PointerUp);
    
    return canvas;
}