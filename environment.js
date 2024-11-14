function getRandomPositions(rocks) {
    const positions = [];
    for (let i = 0; i < rocks; i++) {
        positions.push({
            x: getRandomNum(-50, 51),  // random value between -50 and 50
            y: -4,  
            z: getRandomNum(-50, 51),   // between -50 and 50
            scale: getRandomNum(0.2, 1.1) // between 0.2 and 1
        });
    }
    return positions;
}

function drawFloor() {
    // floor
    gPush();
    {
        gTranslate(right/2,bottom,0) ;
        setColor(vec4(1.0,0.0,0.0,1.0)) ;
        gScale(far, 2, far);
        drawCube() ;
    }
    gPop();

    // draw scattered rocks 
    gPush(); {
        // fixed rock for mining animation
        setColor(vec4(0.3, 0.3, 0.3, 1.0)) ;
        gTranslate(-10, -4, 12);
        drawScaledSphere(1,1,1);
    }
    gPop(); 

    // random rocks
    randomPositions.forEach(position => {
        gPush(); {
            gTranslate(position.x, position.y, position.z);
            drawScaledSphere(position.scale, position.scale, position.scale);
        }
        gPop();
    });
}

function drawBase() {
    gPush(); {
        setColor(vec4(1.0, 0.945, 0.851, 1.0)) ;
        gTranslate(40, -1, 45);
        //texture?
        drawScaledSphere(18,18,18);

        gTranslate(-15,0,0);
        drawScaledCube(8, 8, 6);
    }
    gPop();    
}
let spaceShipDoorRotationAngle = 0;
function drawShip(TIME) {
    gPush();{
        gTranslate(-16, 5, -25);
        // body
        gPush();{
            setColor(vec4(1.0,1.0,1.0,1.0));
            gRotate(90, 1,0,0);
            drawScaledCylinder(12, 16, 12);
        }
        gPop();
        // door
        gPush();{
            gTranslate(0,-3,7);
            
            gPush(); {
                setColor(vec4(0.0,0.0,0.0,1.0));
                gTranslate(0,2,-0.1);
                drawScaledCube(1.5,3.5,0.99);
            }
            gPop();

            setColor(vec4(1.0,1.0,1.0,1.0));
            // ROTATE DOOR HERE OR SLIDE
            gTranslate(0,-3,0.5);
            gRotate(spaceShipDoorRotationAngle, 1,0,0);
            gTranslate(0,4.5,0);
            drawScaledCube(2,4.5,0.4);
        }
        gPop();
        // thrusters
        gPush();{
            gRotate(-90, 1,0,0);
            gTranslate(0,-3,-6); // y is -z
            drawScaledCone(3,4,3);

            gPush(); {
                gTranslate(2,5,0);
                drawScaledCone(3,4,3);
    
                gTranslate(-5,0,0);
                drawScaledCone(3,4,3);
            }
            gPop();
        }
        gPop();
        // top
        gPush();{
            setColor(vec4(1.0,0.0,0.0,1.0));
            gTranslate(0,9,1);
            gRotate(-90, 1,0,0);
            drawScaledCone(8,8,8);
        }
        gPop();
        
    }
    gPop();
}

function getSpaceShipDoorAngleController(toAngle){
    let first = true;
    let initAngle = 0;
    return function contr(time){
        if(first){
            first = false;
            initAngle = spaceShipDoorRotationAngle;
        }
        spaceShipDoorRotationAngle = initAngle * (1-time) + toAngle * time;
    }
}

function getRandomNum(min, max) { // min inclusive, max exclusive
    return Math.random() * (max - min) + min;
  }

function drawScaledCube(sx, sy, sz) {
    gPush();
    {
        gScale(sx, sy, sz);
        drawCube();
    }
    gPop();
}

function drawScaledSphere(sx, sy, sz) {
    gPush();
    {
        gScale(sx, sy, sz);
        drawSphere();
    }
    gPop();
}

function drawScaledCylinder(sx, sy, sz) {
    gPush();
    {
        gScale(sx, sy, sz);
        drawCylinder();
    }
    gPop();
}

function drawScaledCone(sx, sy, sz) {
    gPush();
    {
        gScale(sx, sy, sz);
        drawCone();
    }
    gPop();
}