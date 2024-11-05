var x = 0;
var y = 0;
var z = 0;

var currentLocation;


function drawAstronaut(TIME) {
    gPush();
    {
        // Torso
        gTranslate(x, y, z);
        currentLocation = modelMatrix; // save this matrix for animation continuation from previous location
        drawScaledSphere(1.5, 2, 1.2);

        // Head and Helmet
        gPush();
        {
            gTranslate(0, 2.6, 0);
            drawScaledSphere(0.6, 0.6, 0.6);

            // apply transparent texture to helmet?
            drawScaledSphere(0.8, 0.8, 0.8);

        }
        gPop();

        //left leg
        gTranslate(x-0.75, y-2.5, 0);
        drawLeg(TIME);

        // right leg
        gTranslate(x+1.5, 0, 0);
        drawLeg(TIME+1.5);
    }
    gPop();
}

function drawLeg(TIME) {
    const amplitude = 10;
    const freq = 1;
    const angle = Math.sin(TIME * freq) * amplitude;
    const angleOffset = 30;
    gPush();
    {
        //thigh
        gTranslate(0, 0.5, 0)
        gRotate(angle + angleOffset, 1, 0, 0)
        gTranslate(0, -1.1, 0);
        drawScaledSphere(0.3, 1, 0.3);
        //calve
        gTranslate(0, -1, 0)
        gRotate(angle + angleOffset, 1, 0, 0)
        gTranslate(0, -1.1, 0);
        drawScaledSphere(0.3, 1, 0.3);
        //foot
        gTranslate(0, -1, 0.5);
        drawScaledCube(0.5, 0.15, 1);
    }
    gPop();
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