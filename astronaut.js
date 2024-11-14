class Astronaut {
    constructor() {
        this.x = -16;
        this.y = 6;
        this.z = -25;
        this.rot = [0,0,0];
        this.currentLocation = vec3(this.x, this.y, this.z);
        this.leftShoulderAngle = 0;
        this.rightShoulderAngle = 0;
        this.rightElbowAngle = -30;
        this.leftElbowAngle = -20;
        this.leftLegAngle = -100;
        this.rightLegAngle = 0;
        this.leftKneeAngle = 70;
        this.rightKneeAngle = 90;
        this.doAnimInDraw = false
        this.upperArmLength = 1;
        this.foreArmLength = 1;
        this.thighLength = 1.4;
        this.calveLength = 1;
        this.poseStride1 = {llt:-60,rlt:60,lkt:60,rkt:90,lst:-45,rst:90,le:-70,ret:-70};
        this.poseStride2 = {llt:60,rlt:-60,lkt:90,rkt:60,lst:90,rst:-45,le:-70,ret:-70};
        this.poseCrouch = {lst: 0, rst: 0, ret: -30, le: -20, llt: -100, rlt: 0, lkt: 70, rkt: 90};
        this.poseRightArmUp = {lst: -200, rst: 0, ret: -30, le: -20, llt: -100, rlt: 0, lkt: 70, rkt: 90};
        this.hasPickAxe = false;

    }

    draw(TIME) {

        gPush();
        {
            setColor(vec4(1.0, 1.0, 1.0, 1.0));
            gTranslate(this.x, this.y, this.z);
            //rotate body
            gRotate(this.rot[1], 0, 1, 0);
            gRotate(this.rot[0], 1, 0, 0);
            gRotate(this.rot[2], 0, 0, 1);
            // Torso
            this.currentLocation = modelMatrix; // save this matrix for animation continuation from previous location
            //setColor(vec4(1.0,0.0,0.0,1.0)) ;
            this.drawScaledSphere(1.5, 2, 1.2);

            // draw air tank
            gPush(); {
                gTranslate(0, 0.4, -1);
                this.drawScaledCube(1.2, 1.5, 0.5);
            }
            gPop();

            gPush(); {
                // Right
                gTranslate(1.5, 0.8, 0);
                this.drawArm(TIME, "right");

                //Left
                gTranslate(-3, 0, 0);
                this.drawArm(TIME, "left");

            }
            gPop();

            // draw logo
            gPush(); {
                setColor(vec4(0.0, 0.0, 1.0, 1.0))
                gTranslate(0.5, 1, 0.8);
                this.drawScaledSphere(0.3, 0.3, 0.3);

                setColor(vec4(1.0, 0.0, 0.0, 1.0));
                gTranslate(-0.05, 0, 0.02);
                this.drawScaledCube(0.05, 0.15, 0.28);

                gTranslate(0.2, 0, 0);
                this.drawScaledCube(0.05, 0.15, 0.28);

                gTranslate(-0.1, 0, 0);
                gRotate(45,0,0,1);
                this.drawScaledCube(0.05, 0.15, 0.3);

            }
            gPop();

            // Head and Helmet
            gPush();
            {
                setColor(vec4(1.0, 0.0, 0.0, 1.0)); // diff color?
                gTranslate(0, 2.6, 0);
                this.drawScaledSphere(0.8, 0.8, 0.8);

                // apply transparent texture to helmet?
                //drawScaledSphere(1.0, 1.0, 1.0);

                // right eye
                gTranslate(0.3, 0, 0.65);
                this.drawEye();

                // left Eye
                gTranslate(-0.5, 0, 0);
                this.drawEye();

            }
            gPop();

            setColor(vec4(1.0, 1.0, 1.0, 1.0));
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
        const upperHalf = this.upperArmLength / 2;
        const foreHalf = this.foreArmLength / 2;
        const amplitude = 20;
        const freq = 1;
        var angle;
        if (arm == "right") {
            angle = this.doAnimInDraw ? (-1) * Math.sin(TIME * freq) * amplitude : this.rightShoulderAngle;
        } else {
            angle = this.doAnimInDraw ? Math.sin(TIME * freq) * amplitude : this.leftShoulderAngle;
        }


        // shoulder
        this.drawScaledSphere(0.2, 0.2, 0.2);


        gPush(); {
            //armthis.
            gRotate(angle, 1, 0, 0);
            gTranslate(0, -upperHalf, 0);
            this.drawScaledSphere(0.2, upperHalf, 0.2);

            gPush(); {
                //elbow
                gTranslate(0, -upperHalf, 0);
                this.drawScaledSphere(0.2, 0.2, 0.2);

                gPush(); {
                    // forearm
                    gRotate(arm == "right" ? this.rightElbowAngle : this.leftElbowAngle, 1, 0, 0);
                    gTranslate(0, -foreHalf, 0);
                    this.drawScaledSphere(0.2, foreHalf, 0.2);
                    gPush(); {
                        // hand
                        gTranslate(0, -foreHalf, 0);
                        this.drawScaledSphere(0.3, 0.3, 0.3);
                        if(this.hasPickAxe && arm === "left"){
                            this.drawPickaxe();
                        }
                    }
                    gPop();
                }
                gPop();
            }
            gPop();
        }
        gPop();

    }

    drawPickaxe(){
        gPush();
        {
            
            setColor(vec4(160/255,82/255,45/255,1));
            gPush();
            {
                gTranslate(0,0,1.5);
                gScale(0.25,0.25,3);
                drawCylinder();

            }
            gPop();
            
            setColor(vec4(0.45,0.45,0.45,1));
            gTranslate(0,0,3);
            gScale(0.2,1.2,0.2);
            drawCube();

        }
        gPop();
        setColor(vec4(1,1,1,1));

    }

    drawLeg(TIME, leg) {
        const halfThigh = this.thighLength / 2;
        const halfCalve = this.calveLength / 2;
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
            this.drawScaledSphere(0.5, 0.5, 0.5);
        }
        gPop();

        gPush(); {
            // rotate here to oscillate
            gRotate(angle, 1, 0, 0);
            // thigh
            gTranslate(0, -halfThigh, 0);
            this.drawScaledSphere(0.5, halfThigh, 0.5);
            gTranslate(0,-halfThigh,0);

            gPush(); {
                //knee
                this.drawScaledSphere(0.5, 0.5, 0.5);
                gRotate(leg == "right" ? this.rightKneeAngle : this.leftKneeAngle, 1, 0, 0);

                gPush(); {
                    // leg
                    gTranslate(0, -halfCalve, 0);
                    this.drawScaledSphere(0.3, halfCalve, 0.3);
                    gPush(); {
                        // boot
                        gTranslate(0, -halfCalve, 0.2);
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

    getWalkingToController(target) {
        let thisAst = this;
        let first = true;
        let initial = [0, 0, 0];
    
        return function theController(time) {
            if (first) {
                first = false;
                initial = [thisAst.x, thisAst.y, thisAst.z];
            }
    
            // Interpolate between initial and target positions based on time
            thisAst.x = initial[0] + (target[0] - initial[0]) * time;
            thisAst.y = initial[1] + (target[1] - initial[1]) * time;
            thisAst.z = initial[2] + (target[2] - initial[2]) * time;
        };
    }

    getPoseToController({ llt, rlt, lkt, rkt, lst, rst, le, ret }) {
        let thisAst = this;
        let first = true;
        let initial = { lla: 0, rla: 0, lk: 0, rk: 0, ls: 0, rs: 0, le: 0, re: 0 };
    
        return function theController(time) {
            if (first) {
                first = false;
                // Capture the initial pose angles
                initial = {
                    lla: thisAst.leftLegAngle,
                    rla: thisAst.rightLegAngle,
                    lk: thisAst.leftKneeAngle,
                    rk: thisAst.rightKneeAngle,
                    ls: thisAst.leftShoulderAngle,
                    rs: thisAst.rightShoulderAngle,
                    le: thisAst.leftElbowAngle,
                    re: thisAst.rightElbowAngle
                };
            }
    
            // Interpolate each angle based on time
            thisAst.leftLegAngle = initial.lla + (llt - initial.lla) * time;
            thisAst.rightLegAngle = initial.rla + (rlt - initial.rla) * time;
            thisAst.leftKneeAngle = initial.lk + (lkt - initial.lk) * time;
            thisAst.rightKneeAngle = initial.rk + (rkt - initial.rk) * time;
            thisAst.leftShoulderAngle = initial.ls + (lst - initial.ls) * time;
            thisAst.rightShoulderAngle = initial.rs + (rst - initial.rs) * time;
            thisAst.leftElbowAngle = initial.le + (le - initial.le) * time;
            thisAst.rightElbowAngle = initial.re + (ret - initial.re) * time;
        };
    }
    getRotToController([x,y,z]) {
        let thisAst = this;
        let first = true;
        let initial = [0,0,0];
    
        return function theController(time) {
            if (first) {
                first = false;
                initial = [...thisAst.rot];
            }
    
            // Interpolate each angle based on time
            thisAst.rot[0] = x * time + initial[0] * (1-time);
            thisAst.rot[1] = y * time + initial[1] * (1-time);
            thisAst.rot[2] = z * time + initial[2] * (1-time);
        };
    }

    getWalkAnimController(amountOfStrides) {
        return this.getOscillatingPoseController(amountOfStrides, this.poseStride1, this.poseStride2);
    }

    getMiningController(hits){
        return this.getOscillatingPoseController(hits, this.poseCrouch, this.poseRightArmUp);
    }

    getOscillatingPoseController(oscillationAmount, poseA, poseB){
        let strideCount = 0;
        let currentPoseController = this.getPoseToController(poseA);
        let alternatingStride = true;
        let thisA = this;
    
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
                currentPoseController = thisA.getPoseToController(
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
}