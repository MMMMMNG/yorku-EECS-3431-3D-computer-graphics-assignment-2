class Timeline {
    constructor() {
        this.controllers = [];
        this.onceControllers = [];
    }

    /**
     * Register a controller function to be executed in a specific time interval.
     * @param {number} start - The start time of the interval.
     * @param {number} end - The end time of the interval.
     * @param {Function} controller - The function that manipulates the scene. It expects a progress value (0 to 1).
     */
    from_to_do(start, end, controller) {
        this.controllers.push({ start, end, controller });
    }

    do_once_at(start, controller){
        this.onceControllers.push({start, controller});
    }

    /**
     * Determines which controllers to call based on the current time and invokes them with the appropriate progress.
     * @param {number} currtime - The current time.
     */
    doAnims(currtime) {
        this.controllers.forEach(({ start, end, controller }) => {
            if (currtime >= start && currtime <= end) {
                // Calculate the normalized progress between 0 and 1
                const progress = (currtime - start) / (end - start);
                controller(progress);
            }
        });

        this.onceControllers.forEach(({start, controller}) => {
            if(currtime >= start){
                controller();
            }
        });
        this.onceControllers = this.onceControllers.filter(i => i.start > currtime);
    }

    registerAll() {
        //var bc = getBulletCamController(vec3(0,0,0),10);
        /*var dolley = getDollyZoomCamController([100, 1, 0], [10, 1, 0], 91, 6);
        this.from_to_do(3,10, dolley);
        this.do_once_at(0.1, () => astronaut.doAnimInDraw = true);
        this.do_once_at(10, () => {
            astronaut.leftLegAngle = 60;
            astronaut.rightLegAngle = -60;
            astronaut.leftShoulderAngle = 100;
            astronaut.rightShoulderAngle = -100;
            astronaut.doAnimInDraw = false;
        });
        var sl = getStraightLineLookAtCamController([0,0,10], [10,10,10], [0,0,0]);
        this.from_to_do(14,20,sl);*/

        var one = getFromCurrentToTargetCamController([10,1,3],[0,1,10]);
        var two = getFromCurrentToTargetCamController([0,1,15],[0,0,20]);
        let delta = 5;
        let mineDelt = 5;

        timeline.from_to_do(delta+0,delta+1,getSpaceShipDoorAngleController(120));
        timeline.from_to_do(delta+0,delta+3,astronaut.getWalkingToController([-16,0.25,-10]));
        timeline.from_to_do(delta+3,delta+5,astronaut.getWalkingToController([-10, 0.25, 10]));
        timeline.from_to_do(delta+0,delta+5, astronaut.getWalkAnimController(10));
        timeline.from_to_do(delta+5,delta+6, astronaut.getPoseToController(astronaut.poseCrouch));
        timeline.from_to_do(delta+5,delta+6, astronaut.getWalkingToController([-10, -0.5, 10]))
        timeline.from_to_do(delta+5,delta+6, astronaut.getRotToController([30,0,0]));
        timeline.do_once_at(delta+6,() => astronaut.hasPickAxe = true);
        timeline.from_to_do(delta+6,delta+10+mineDelt, astronaut.getMiningController(32));
        timeline.from_to_do(delta+10+mineDelt,delta+11+mineDelt, astronaut.getRotToController([0,0,0]));

        delta += mineDelt; //longer mining session

        timeline.from_to_do(delta+10,delta+ 32, astronaut.getWalkAnimController(90));
        timeline.from_to_do(delta+10,delta+12, astronaut.getMoveCircularController(20, 0.5));
        timeline.from_to_do(delta+12,delta+13, astronaut.getWalkingToController([-40, 0.25,-25]));
        timeline.from_to_do(delta+13,delta+17, astronaut.getMoveCircularController(24)); //around rocket
        timeline.from_to_do(delta+17,delta+19, astronaut.getMoveCircularController(24, 0.5)); //around rocket
        timeline.from_to_do(delta+19,delta+21, astronaut.getWalkingToController([8, 0.25, 45])); // up to base
        timeline.from_to_do(delta+21,delta+24, astronaut.getMoveCircularController(-32)); //around base
        timeline.from_to_do(delta+24,delta+26, astronaut.getMoveCircularController(-32,0.75)); //around base
        timeline.from_to_do(delta+26,delta+27, astronaut.getWalkingToController([-16, 0.25, 13])); // across to rocket
        timeline.from_to_do(delta+27,delta+30, astronaut.getMoveCircularController(23, 0.75)); //around rocket
        timeline.from_to_do(delta+30,delta+31, astronaut.getWalkingToController([6, 0.25, 30])); // up to base
        timeline.from_to_do(delta+31,delta+31.5, astronaut.getMoveCircularController(-15, 0.25)); // into base
        timeline.do_once_at(delta+10,() => astronaut.hasPickAxe = false);

        timeline.from_to_do(delta+0,   delta+11, bear.getOscillatingPoseController(22, bear.poseStride1, bear.poseStride2));
        timeline.from_to_do(delta+11,  delta+31.5, bear.getOscillatingPoseController(63, bear.poseChase1, bear.poseChase2));
        timeline.from_to_do(delta+0,   delta+11,bear.getWalkingToController([-10, 3, 10]));
        timeline.from_to_do(delta+11,  delta+12.5, bear.getMoveCircularController(20, 0.5));
        timeline.from_to_do(delta+12.5,delta+13.5, bear.getWalkingToController([-40, 3,-25]));
        timeline.from_to_do(delta+13.5,delta+17.5, bear.getMoveCircularController(24)); //around rocket
        timeline.from_to_do(delta+17.5,delta+19.5, bear.getMoveCircularController(24, 0.5)); //around rocket
        timeline.from_to_do(delta+19.5,delta+21.5, bear.getWalkingToController([8, 3, 45])); // up to base
        timeline.from_to_do(delta+21.5,delta+24.5, bear.getMoveCircularController(-32)); //around base
        timeline.from_to_do(delta+24.5,delta+26.5, bear.getMoveCircularController(-32,0.75)); //around base
        timeline.from_to_do(delta+26.5,delta+27.5, bear.getWalkingToController([-16, 3, 13])); // across to rocket
        timeline.from_to_do(delta+27.5,delta+30.5, bear.getMoveCircularController(23, 0.75)); //around rocket
        timeline.from_to_do(delta+30.5,delta+31.5, bear.getWalkingToController([6, 3, 30])); // up to base
        timeline.from_to_do(delta+31.5,delta+32, bear.getPoseToController(bear.poseChill));

        //camera
        timeline.from_to_do(0,5, getStraightLineLookAtCamController([-300,50,400], [-20,5,0], [-16,6,-25]));
        timeline.from_to_do(5,10, getStraightLineLookAtCamController([-20,5,0], [-20,40,100], [-16,6,-25]));getBulletCamController
        timeline.from_to_do(10,15,getBulletCamController([-10,0,10],10,10))
        timeline.from_to_do(15,37, getFromCurrentToTargetCamController([-100,50,150],[0,0,0]));

    }
}