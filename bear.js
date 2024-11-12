class Bear {
    constructor(){
        this.x = -2;
        this.y = -2;
        this.z = 0;
        this.currentLocation = vec3(this.x,this.y,this.z);
        this.leftShoulderAngle = 1;
        this.leftLegAngle = 2;
        this.rightLegAngle = 3;
        this.rightShoulderAngle = 4;
        this.doAnimInDraw = false

    }

    draw(TIME) {

        gPush();
        {
            // Torso
            gTranslate(this.x, this.y, this.z);
            this.currentLocation = modelMatrix; // save this matrix for animation continuation from previous location
            //setColor(vec4(1.0,0.0,0.0,1.0)) ;
            // ROTATE TORSO UP
            //gRotate(-90, 1, 0, 0);
            this.drawScaledSphere(1, 1, 2);

            gPush(); { // body
                gTranslate(0, 0, 1);
                this.drawScaledSphere(1.2,1,2);

                gTranslate(0, 0, -3);

            }
            gPop();
            
            gPush(); {
                // right arm
                gTranslate(1, -0.5, 2);
                this.drawAppendage(TIME, "right");

                // right leg
                gTranslate(0, 0, -3);
                this.drawAppendage(TIME + 1.5, "right");

                //left leg
                gTranslate(-1.8, 0, 0);
                this.drawAppendage(TIME, "left");

                // left arm
                gTranslate(0, 0, 3);
                this.drawAppendage(TIME, "left");
            }
            gPop();

            // Head and Ears
            gPush();
            {
                // neck
                gTranslate(0, 0.5, 2.3);

                this.drawScaledSphere(0.7, 0.7, 0.7);
                // head
                gTranslate(0, 0.3, 0.8);
                this.drawScaledSphere(0.7, 0.7, 0.7);

                // right eye
                gTranslate(0.4, 0.2, 0.4);
                this.drawEye();

                // left Eye
                gTranslate(-0.9, 0, 0);
                this.drawEye();


            }
            gPop();

            // draw mouth
            gPush(); {
                gTranslate(0, 0.8, 4);
                this.drawMouth();
            }
            gPop();

            // draw ears
            gPush(); {
                gTranslate(0.4, 0.8, -0.8);
                this.drawEars();
            }
            gPop();

        }
        gPop();
    }

    drawAppendage(TIME, leg) {
        const amplitude = 30;
        const freq = 1;
        var angle;
        if (leg == "right") {
            angle = this.doAnimInDraw ? (-1) * Math.sin(TIME * freq) * amplitude : this.rightLegAngle;
        } else {
            angle = this.doAnimInDraw ? Math.sin(TIME * freq) * amplitude : this.leftLegAngle;
        }

        gPush(); {
            // hip
            // ROTATE HERE FOR ALL LEGS
            //gRotate(20, 1, 0, 0);
            this.drawScaledSphere(0.5, 0.5, 0.5);
            // thigh
            gTranslate(0, -0.5, 0);
            this.drawScaledCube(0.35, 0.5, 0.35);

            gPush();{
                gTranslate(0,-0.6,0);
                // ROTATE HERE appendix for foot
                //gRotate(20, 0, 1, 0);
                this.drawScaledSphere(0.4, 0.4, 0.4);
                
                gTranslate(0, -0.2, 0.2);
                // foot
                this.drawScaledSphere(0.3, 0.3, 0.5);

                //4 nails
                gPush(); {
                    gRotate(10, 0, 1, 0);
                    gTranslate(0.05, 0,0);
                    this.drawFoot();
                }
                gPop();

                gPush(); {
                    gRotate(-10,0, 1, 0);
                    gTranslate(-0.05, 0,0);
                    this.drawFoot();
                }
                gPop();

                gPush(); {
                    gRotate(-20,0, 1, 0);
                    gTranslate(-0.1, 0,0);
                    this.drawFoot();
                }
                gPop();

                gPush(); {
                    gRotate(20,0, 1, 0);
                    gTranslate(0.1, 0,0);
                    this.drawFoot();
                }
                gPop();
                
            }
            gPop();
        }
        gPop();
    }

    drawFoot() {
        gPush(); {
            gTranslate(0,0,0.5);
            this.drawScaledSphere(0.1,0.1,0.1);
            
            gTranslate(0,0,0.1);
            gScale(0.1,0.1,0.1);
            drawCone();
        }
        gPop();
    }

    drawEye() {
        gPush();
        {
            setColor(vec4(0.0, 0.0, 0.0, 1.0));
            this.drawScaledSphere(0.2, 0.2, 0.2);

            setColor(vec4(1.0, 1.0, 1.0, 1.0));

            gTranslate(0.0, 0.0, 0.15);
            this.drawScaledSphere(0.1, 0.1, 0.1);

            // eyebrows
            setColor(vec4(0.0, 0.0, 0.0, 1.0));
            gTranslate(0, 0.2, 0);
            this.drawScaledCube(0.4, 0.05, 0.05);

            setColor(vec4(1.0, 0.0, 0.0, 1.0));
        }
        gPop();
    }

    drawEars() {
        gPush(); {
            
            gRotate(-90, 1, 0, 0);
            gScale(0.2,0.2,0.5);

            //right
            gPush();{
                gRotate(20, 0, 1, 0);
                drawCone();
            }
            gPop();
            
            gTranslate(-3.6, 1, 0);
            // left
            gPush();{
                gRotate(-20, 0, 1, 0);
                drawCone();
            }
            gPop();
        }
        gPop();
    }

    drawMouth() {
        gPush(); {
            // ROTATE HERE
            // top lip
            this.drawScaledCube(0.2, 0.1, 0.2);

            // bottom lip
            // ROTATE HERE
            gTranslate(0, -0.2, 0);
            this.drawScaledCube(0.15, 0.1, 0.2);

        }
        gPop();
    }

    drawScaledCube(sx, sy, sz) {
        gPush();
        {
            gScale(sx, sy, sz);
            drawCube();
        }
        gPop();
    }

    drawScaledSphere(sx, sy, sz) {
        gPush();
        {
            gScale(sx, sy, sz);
            drawSphere();
        }
        gPop();
    }

    drawScaledCone(sx, sy, sz) {
        gPush();
        {
            gScale(sx, sy, sz);
            drawCone();
        }
        gPop();
    }

}

