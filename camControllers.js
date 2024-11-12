function getBulletCamController(centerOfRot, radius) {
    return function theController(time) {
        // Calculate angle in radians (complete circle over time 0 to 1)
        const angle = 2 * Math.PI * time;

        // Update the camera position (eye) to circle around centerOfRot
        eye[0] = centerOfRot[0] + radius * Math.cos(angle);
        eye[1] = centerOfRot[1]; // Maintain same y-level as centerOfRot
        eye[2] = centerOfRot[2] + radius * Math.sin(angle);

        // Set 'at' to always look at the center of rotation
        at[0] = centerOfRot[0];
        at[1] = centerOfRot[1];
        at[2] = centerOfRot[2];

        // Keep 'up' pointing in the y-direction
        up[0] = 0;
        up[1] = 1;
        up[2] = 0;
    };
}

function getStraightLineLookAtCamController(from, to, lookTarget) {
    return function theController(time) {
        // Interpolate the camera position (eye) from 'from' to 'to' based on time (0 to 1)
        eye[0] = from[0] + (to[0] - from[0]) * time;
        eye[1] = from[1] + (to[1] - from[1]) * time;
        eye[2] = from[2] + (to[2] - from[2]) * time;

        // Set 'at' to always look at the lookTarget position
        at[0] = lookTarget[0];
        at[1] = lookTarget[1];
        at[2] = lookTarget[2];

        // Keep 'up' pointing in the y-direction
        up[0] = 0;
        up[1] = 1;
        up[2] = 0;
    };
}
