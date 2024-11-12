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


function getDollyZoomCamController(from, to, targetDistance) {
    // Precompute the initial distance from 'from' to 'to' for setting 'at' and 'up'
    const direction = [
        to[0] - from[0],
        to[1] - from[1],
        to[2] - from[2],
    ];
    const initialDistance = Math.sqrt(direction[0]**2 + direction[1]**2 + direction[2]**2);

    // Normalize the direction vector
    const directionNormalized = [
        direction[0] / initialDistance,
        direction[1] / initialDistance,
        direction[2] / initialDistance,
    ];

    // Compute 'at' point: far ahead in the direction of movement
    at[0] = to[0] + directionNormalized[0];
    at[1] = to[1] + directionNormalized[1];
    at[2] = to[2] + directionNormalized[2];

    // Compute 'up' vector in the plane made with the y-axis
    const upYPlane = [
        -directionNormalized[2], 0, directionNormalized[0]
    ];
    up[0] = upYPlane[0];
    up[1] = 1;
    up[2] = upYPlane[2];

    // Return the controller function for the dolly zoom effect
    return function theController(time) {
        // Interpolate the camera position from 'from' to 'to'
        eye[0] = from[0] + directionNormalized[0] * initialDistance * time;
        eye[1] = from[1] + directionNormalized[1] * initialDistance * time;
        eye[2] = from[2] + directionNormalized[2] * initialDistance * time;

        // Calculate current distance to the target object based on the interpolation
        const currentDistance = initialDistance * (1 - time) + targetDistance * time;

        // Adjust FOV based on the dolly zoom effect formula
        const focalLength = 1 / Math.tan((fov * Math.PI) / 360); // Convert FOV to focal length
        fov = 2 * Math.atan(targetDistance / currentDistance * focalLength) * (180 / Math.PI); // Convert back to degrees
    };
}