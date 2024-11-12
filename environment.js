function drawFloor() {
    gPush();
    {
        gTranslate(right/2,bottom,0) ;
        setColor(vec4(1.0,0.0,0.0,1.0)) ;
        gScale(12, 2, 12);
        drawCube() ;
    }
    gPop();
}

function drawBase() {
    gPush(); {
        gTranslate(-2, 5, 4);
        //texture?
        drawSphere();
    }
    gPop();    
}