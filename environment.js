function generateRandomPositions(count) {
    const positions = [];
    for (let i = 0; i < count; i++) {
        positions.push({
            x: getRandomNum(-12, 13),  // random value between -12 and 12
            y: -4,  
            z: getRandomNum(-12, 13),   // between -12 and 12
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
        setColor(vec4(0.529, 0.784, 0.988, 1.0)) ;
        gTranslate(12, -2, 12);
        //texture?
        drawScaledSphere(8,8,8);
    }
    gPop();    
}

function drawShip() {
    gPush();{
        gTranslate(-4, 2, -10);
        // body
        gPush();{
            setColor(vec4(1.0,1.0,1.0,1.0));
            gRotate(90, 1,0,0);
            drawScaledCylinder(8, 10, 8);
        }
        gPop();
        // door
        gPush();{
            gTranslate(0,0,4);
            
            gPush(); {
                setColor(vec4(0.0,0.0,0.0,1.0));
                drawScaledCube(1.5,1.5,1);
            }
            gPop();

            setColor(vec4(1.0,1.0,1.0,1.0));
            // ROTATE DOOR HERE
            gRotate(-120, 1,0,0);
            drawScaledCube(2,2,1);
        }
        gPop();
        // thrusters
        gPush();{
            gRotate(-90, 1,0,0);
            gTranslate(0,-3,-4); // y is -z
            drawScaledCone(2,3,2);

            gPush(); {
                gTranslate(2,5,0);
                drawScaledCone(2,3,2);
    
                gTranslate(-4,0,0);
                drawScaledCone(2,3,2);
            }
            gPop();
        }
        gPop();
        // top
        gPush();{
            setColor(vec4(1.0,0.0,0.0,1.0));
            gTranslate(0,6,1);
            gRotate(-90, 1,0,0);
            drawScaledCone(5,5,5);
        }
        gPop();
        
    }
    gPop();
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