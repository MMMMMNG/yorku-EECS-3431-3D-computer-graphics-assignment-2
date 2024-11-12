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
        //setColor(vec4(1.0,0.0,0.0,1.0)) ;
        drawScaledSphere(1.5, 2, 1.2);
        gPush(); {
            // Right
            gTranslate(1.5, 0.8, 0);
            drawArm(TIME, "right");
            
            //Left
            gTranslate(-3, 0, 0);
            drawArm(TIME, "left");
            
        }
        gPop();
        // Head and Helmet
        gPush();
        {
            gTranslate(0, 2.6, 0);
            drawScaledSphere(0.8, 0.8, 0.8);

            // apply transparent texture to helmet?
            //drawScaledSphere(1.0, 1.0, 1.0);

            // right eye
            gTranslate(0.3,0,0.65);
            drawEye();
            
            // left Eye
            gTranslate(-0.5, 0, 0);
            drawEye();

        }
        gPop();

        //left leg
        gTranslate(-0.8, -2, 0);
        drawLeg(TIME, "left");

        // right leg
        gTranslate(1.5, 0, 0);
        drawLeg(TIME+1.5, "right");
    }
    gPop();
}

function drawArm(TIME, arm) {
    const amplitude = 30;
    const freq = 1;
    var angle;
    if(arm == "right") {
        angle = (-1) * Math.sin(TIME * freq) * amplitude;
    } else {
        angle = Math.sin(TIME * freq) * amplitude;
    }
    
    
    gPush(); {
        // shoulder
        drawScaledSphere(0.2,0.2,0.2);
    }
    gPop();
    
    gPush(); {
        //arm
        gTranslate(0, -0.7, 0);
        gRotate(angle, 1, 0, 0);
        drawScaledSphere(0.2,0.5,0.2);

        gPush();{
            //elbow
            gTranslate(0, -0.5,0);
            drawScaledSphere(0.2,0.2,0.2);

            gPush();{
                // forearm
                gTranslate(0, -0.2, 0);
                drawScaledSphere(0.2, 0.5, 0.2);
                gPush(); {
                    // hand
                    gTranslate(0, -0.5, 0);
                    drawScaledSphere(0.3, 0.3, 0.3);
                }
                gPop();
            }
            gPop();
        }
        gPop();
    }
    gPop();
    
}

function drawLeg(TIME, leg) {
    const amplitude = 30;
    const freq = 1;
    var angle;
    if(leg == "right") {
        angle = (-1) * Math.sin(TIME * freq) * amplitude;
    } else {
        angle = Math.sin(TIME * freq) * amplitude;
    }
    
    gPush(); {
        // hip
        drawScaledSphere(0.5,0.5,0.5);
    }
    gPop();

    gPush(); {
        // thigh
        gTranslate(0, -0.5, 0);
        // rotate here to oscillate
        gRotate(angle, 1, 0, 0);
        drawScaledSphere(0.5,0.7,0.5);

        gPush();{
            // knee
            gTranslate(0, -0.5, 0);
            drawScaledSphere(0.5,0.5,0.5);

            gPush();{
                // leg
                gTranslate(0, -0.5, 0);
                drawScaledSphere(0.3, 0.5, 0.3);
                gPush(); {
                    // boot
                    gTranslate(0, -0.5, 0.2);
                    drawScaledSphere(0.3, 0.3, 0.5);
                }
                gPop();
            }
            gPop();            
        }
        gPop();
    }
    gPop();
}

function drawEye() {
    gPush() ;
    {
        setColor(vec4(1.0,1.0,1.0,1.0));
        drawScaledSphere(0.2, 0.2, 0.2);

        setColor(vec4(0.0,0.0,0.0,1.0));

        gTranslate(0.0, 0.0, 0.15);
        drawScaledSphere(0.1, 0.1, 0.1);

        // eyebrows
        gTranslate(0,0.2,0);
        drawScaledCube(0.1, 0.05, 0.05);

        setColor(vec4(1.0,0.0,0.0,1.0));    
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