class Bear {
    constructor(){
        this.x = -2;
        this.y = 0;
        this.z = 0;
        this.currentLocation = vec3(this.x,this.y,this.z);

    }

    draw(TIME) {

        gPush();
        {
            // Torso
            gTranslate(this.x, this.y, this.z);
            this.currentLocation = modelMatrix; // save this matrix for animation continuation from previous location
            //setColor(vec4(1.0,0.0,0.0,1.0)) ;
            this.drawScaledSphere(1.5, 2, 1.2);
            
            gPush(); {
                // Right
                gTranslate(1.5, 0.8, 0);
                this.drawArm(TIME, "right");

                //Left
                gTranslate(-3, 0, 0);
                this.drawArm(TIME, "left");

            }
            gPop();
            // Head and Ears
            gPush();
            {
                gTranslate(0, 2.6, 0);
                this.drawScaledSphere(0.8, 0.8, 0.8);

                // right eye
                gTranslate(0.3, 0, 0.65);
                this.drawEye();

                // left Eye
                gTranslate(-0.5, 0, 0);
                this.drawEye();


            }
            gPop();

            // draw ears
            // gPush();{
            //     gScale(5, 5, 5);
            //     gTranslate(0.3, 2, -0.2);
            //     this.drawCone();

            //     gTranslate(-0.5, 0, 0);
            //     this.drawCone();
            // }
            // gPop();

            //left leg
            gTranslate(-0.8, -2, 0);
            this.drawLeg(TIME, "left");

            // right leg
            gTranslate(1.5, 0, 0);
            this.drawLeg(TIME + 1.5, "right");
        }
        gPop();
    }

    drawArm(TIME, arm) {
        const amplitude = 20;
        const freq = 1;
        var angle;
        if (arm == "right") {
            angle = (-1) * Math.sin(TIME * freq) * amplitude;
        } else {
            angle = Math.sin(TIME * freq) * amplitude;
        }


        gPush(); {
            // shoulder
            this.drawScaledSphere(0.2, 0.2, 0.2);
        }
        gPop();

        gPush(); {
            //armthis.
            gTranslate(0, -0.7, 0);
            gRotate(angle*0.5, 1, 0, 0);
            gTranslate(0, 0.2, 0);
            this.drawScaledSphere(0.2, 0.5, 0.2);

            gPush(); {
                //elbow
                gTranslate(0, -0.5, 0);
                this.drawScaledSphere(0.2, 0.2, 0.2);

                gPush(); {
                    // forearm
                    gTranslate(0, -0.2, 0);
                    gRotate(angle, 1, 0, 0);
                    this.drawScaledSphere(0.2, 0.5, 0.2);
                    gPush(); {
                        // hand
                        gTranslate(0, -0.5, 0);
                        this.drawScaledSphere(0.3, 0.3, 0.3);
                    }
                    gPop();
                }
                gPop();
            }
            gPop();
        }
        gPop();

    }

    drawLeg(TIME, leg) {
        const amplitude = 30;
        const freq = 1;
        var angle;
        if (leg == "right") {
            angle = (-1) * Math.sin(TIME * freq) * amplitude;
        } else {
            angle = Math.sin(TIME * freq) * amplitude;
        }

        gPush(); {
            // hip
            this.drawScaledSphere(0.5, 0.5, 0.5);
        }
        gPop();

        gPush(); {
            // thigh
            gTranslate(0, -0.5, 0);
            // rotate here to oscillate
            gRotate(angle, 1, 0, 0);
            this.drawScaledSphere(0.5, 0.7, 0.5);

            gPush(); {
                // knee
                gTranslate(0, -0.5, 0);
                this.drawScaledSphere(0.5, 0.5, 0.5);

                gPush(); {
                    // leg
                    gTranslate(0, -0.5, 0);
                    this.drawScaledSphere(0.3, 0.5, 0.3);
                    gPush(); {
                        // boot
                        gTranslate(0, -0.5, 0.2);
                        this.drawScaledSphere(0.3, 0.3, 0.5);
                    }
                    gPop();
                }
                gPop();
            }
            gPop();
        }
        gPop();
    }

    drawEye() {
        gPush();
        {
            setColor(vec4(1.0, 1.0, 1.0, 1.0));
            this.drawScaledSphere(0.2, 0.2, 0.2);

            setColor(vec4(0.0, 0.0, 0.0, 1.0));

            gTranslate(0.0, 0.0, 0.15);
            this.drawScaledSphere(0.1, 0.1, 0.1);

            // eyebrows
            gTranslate(0, 0.2, 0);
            this.drawScaledCube(0.1, 0.05, 0.05);

            setColor(vec4(1.0, 0.0, 0.0, 1.0));
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

