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
}

function drawBase() {
    gPush(); {
        gTranslate(-2, 5, 4);
        //texture?
        drawSphere();
    }
    gPop();    
}

function drawShip() {
    gPush();{

    }
    gPop();
}