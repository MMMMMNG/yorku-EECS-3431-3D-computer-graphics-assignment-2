class Bear {
    constructor(){
        this.x = -2;
        this.y = 3;
        this.z = -100;
        this.currentLocation = vec3(this.x,this.y,this.z);
        this.poseAngles = {fl:0,fr:0,bl:0,br:0,lip:0};
        this.poseStride1 = {fl:-45,fr:45,bl:45,br:-45,lip:0};
        this.poseStride2 = {fl:45,fr:-45,bl:-45,br:45,lip:0};
        this.poseChase1 = {fl:45,fr:45,bl:-45,br:-45,lip:0};
        this.poseChase2 = {fl:-45,fr:-45,bl:45,br:45,lip:0};
        this.poseChill = {fl:0,fr:0,bl:0,br:0,lip:0};
        this.rot = [0,0,0];

    }

    draw(TIME) {

        gPush();
        {
            // Torso
            setColor(vec4(0.5, 0.2, 0.0, 1.0));
            gTranslate(this.x, this.y, this.z);
            //rotate body
            gRotate(this.rot[1], 0, 1, 0);
            gRotate(this.rot[0], 1, 0, 0);
            gRotate(this.rot[2], 0, 0, 1);
            gScale(3,3,3);
            this.currentLocation = modelMatrix; // save this matrix for animation continuation from previous location
            
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
                this.drawAppendage("fr");

                // right leg
                gTranslate(0, 0, -3);
                this.drawAppendage("br");

                //left leg
                gTranslate(-1.8, 0, 0);
                this.drawAppendage("bl");

                // left arm
                gTranslate(0, 0, 3);
                this.drawAppendage("fl");
            }
            gPop();

            // Head and Ears
            gPush();
            {
                // neck
                gTranslate(0, 0.5, 2.3);
                this.drawScaledSphere(0.7, 0.7, 0.7);

                // helmet
                gTranslate(0, 0.3, 0.8);

                setColor(vec4(1.0, 1.0, 1.0, 0.2));
                // Enable alpha blending and set the percentage blending factors
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                // Turn off updating of the z-buffer
                gl.depthMask(false);
                
                drawScaledSphere(1.2, 1.2, 1.2);

                gl.disable(gl.BLEND);
                gl.depthMask(true);

                // head
                setColor(vec4(0.5, 0.2, 0.0, 1.0));
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
                gTranslate(0.4, 1.5, 3.2);
                this.drawEars();
            }
            gPop();

        }
        gPop();
    }

    drawAppendage(which) {

        gPush(); {
            // hip
            // ROTATE HERE FOR ALL LEGS
            const a = this.poseAngles[which];
            gRotate(a, 1, 0, 0);
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

            setColor(vec4(0.5, 0.2, 0.0, 1.0));
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

    getPoseToController(targetPose) {
        let thisBear = this;
        let first = true;
        let initial = {};
    
        return function theController(time) {
            if (first) {
                first = false;
                // Capture the initial pose angles
                initial = { ...thisBear.poseAngles };
            }
    
            // Interpolate each angle based on time
            thisBear.poseAngles = Object.keys(initial).reduce((acc, key) => {
                acc[key] = initial[key] + (targetPose[key] - initial[key]) * time;
                return acc;
            }, {});
        };
    }

    
    getOscillatingPoseController(oscillationAmount, poseA, poseB){
        let strideCount = 0;
        let currentPoseController = this.getPoseToController(poseA);
        let alternatingStride = true;
        let thisB = this;
    
        return function theController(time) {
            // Normalize time within each stride
            const strideTime = time * oscillationAmount - strideCount;
    
            // Call the current pose controller
            currentPoseController(strideTime);
    
            // Switch strides when time progresses to the next stride interval
            if (strideTime >= 1) {
                strideCount++;
                // Alternate between poseStride1 and poseStride2
                alternatingStride = !alternatingStride;
                currentPoseController = thisB.getPoseToController(
                    alternatingStride ? poseA : poseB
                );
            }
    
            // Stop after the specified amount of strides
            if (strideCount >= oscillationAmount) {
                // Optionally, finalize or reset to an idle pose if needed
                return;
            }
        };
    }

    getWalkingToController([x,y,z]){
        let thisBear = this;
        let first = true;
        let initial = [0,0,0];
    
        return function theController(time) {
            if (first) {
                first = false;
                // Capture the initial pose angles
                initial = [thisBear.x, thisBear.y, thisBear.z];
            }
    
            // Interpolate each coord based on time
            thisBear.x = initial[0] * (1-time) + x * time;
            thisBear.y = initial[1] * (1-time) + y * time;
            thisBear.z = initial[2] * (1-time) + z * time;
        };
    }

    getRotToController([x,y,z]) {
        let thisB = this;
        let first = true;
        let initial = [0,0,0];
    
        return function theController(time) {
            if (first) {
                first = false;
                initial = [...thisB.rot];
            }
    
            // Interpolate each angle based on time
            thisB.rot[0] = x * time + initial[0] * (1-time);
            thisB.rot[1] = y * time + initial[1] * (1-time);
            thisB.rot[2] = z * time + initial[2] * (1-time);
        };
    }

    getMoveCircularController(centerOfRotToRight, howMuchToComplete = 1.0) {
        let thisBear = this;
        let first = true;
        let center = { x: 0, z: 0 };
        let startAngle = 0;
        let initialPosition = { x: 0, z: 0 };
        let initialHeading = 0;
        const radius = Math.abs(centerOfRotToRight);
    
        return function theController(time) {
            if (first) {
                first = false;
                // Capture the initial position and heading
                initialPosition = { x: thisBear.x, z: thisBear.z };
                initialHeading = thisBear.rot[1];
    
                // Calculate the center of rotation based on initial heading
                const angleRad = -initialHeading * (Math.PI / 180);
                center = {
                    x: initialPosition.x - centerOfRotToRight * Math.cos(angleRad),
                    z: initialPosition.z - centerOfRotToRight * Math.sin(angleRad)
                };
    
                // Calculate the start angle (relative to the center)
                startAngle = Math.atan2(initialPosition.z - center.z, initialPosition.x - center.x);
            }
    
            // Calculate the current angle along the arc based on time
            const currentAngle = startAngle + (time * howMuchToComplete * Math.PI * 2); // assuming full rotation over time 1
    
            // Calculate the new position along the arc
            thisBear.x = center.x + radius * Math.cos(currentAngle);
            thisBear.z = center.z + Math.sign(centerOfRotToRight)  * radius * Math.sin(currentAngle);
    
            // Update the heading to stay tangent to the circle
            thisBear.rot[1] = (-currentAngle * 180) / Math.PI; // convert to degrees and adjust to tangent
            if(centerOfRotToRight < 0){
                thisBear.rot[1] = -thisBear.rot[1] + 180;
            }
        };
    }


}

