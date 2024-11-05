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