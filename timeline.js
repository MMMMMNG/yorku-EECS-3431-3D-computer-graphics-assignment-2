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

        timeline.from_to_do(0,1,getSpaceShipDoorAngleController(120));
        timeline.from_to_do(0,3,astronaut.getWalkingToController([-16,0.25,-10]));
        timeline.from_to_do(3,5,astronaut.getWalkingToController([-10, 0.25, 10]));
        timeline.from_to_do(0, 5, astronaut.getWalkAnimController(10));
        timeline.from_to_do(5,6, astronaut.getPoseToController(astronaut.poseCrouch));
        timeline.from_to_do(5,6, astronaut.getWalkingToController([-10, -0.5, 10]))
        timeline.from_to_do(5,6, astronaut.getRotToController([30,0,0]));
        timeline.do_once_at(6,() => astronaut.hasPickAxe = true);
        timeline.from_to_do(6,10, astronaut.getMiningController(16));
        timeline.from_to_do(10,11, astronaut.getRotToController([0,0,0]));

        
        timeline.from_to_do(10, 40, astronaut.getWalkAnimController(90));
        timeline.from_to_do(10,12, astronaut.getMoveCircularController(20, 0.5));
        timeline.from_to_do(12,13, astronaut.getWalkingToController([-40, 0.25,-25]));
        timeline.from_to_do(13,17, astronaut.getMoveCircularController(24));
        timeline.from_to_do(17,19, astronaut.getMoveCircularController(24, 0.5));
        timeline.from_to_do(19,20, astronaut.getWalkingToController([8, 0.25, 45]));
        timeline.from_to_do(20,23, astronaut.getMoveCircularController(-32));
        timeline.from_to_do(23,24, astronaut.getMoveCircularController(-32,0.75));
        timeline.from_to_do(24,25, astronaut.getWalkingToController([20, 0.25, 13]));
        timeline.from_to_do(25,26, astronaut.getMoveCircularController(-16,0.5));
        timeline.do_once_at(10,() => astronaut.hasPickAxe = false);

        timeline.from_to_do(0,20, bear.getOscillatingPoseController(50, bear.poseStride1, bear.poseStride2));
        timeline.from_to_do(0,20, bear.getMoveCircularController(40, 0.75));
    }
}