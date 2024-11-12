class Timeline {
    constructor() {
        this.controllers = [];
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
    }

    registerAll(){
        var bc = getBulletCamController(vec3(0,0,0),10);
        this.from_to_do(3,10, bc);
    }
}