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


function getDollyZoomCamController(from, to, targetDistance, left) {
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
        const curDist = initialDistance * time;
        // Interpolate the camera position from 'from' to 'to'
        eye[0] = from[0] + directionNormalized[0] * curDist;
        eye[1] = from[1] + directionNormalized[1] * curDist;
        eye[2] = from[2] + directionNormalized[2] * curDist;

        //cal dist to target
        let distToTar = targetDistance - curDist;

        // Adjust FOV based on the dolly zoom effect formula
        fov = Math.atan(left / distToTar) * (180 / Math.PI); // back to degrees
    };
}

function getFromCurrentToTargetCamController(targetEye, targetAt, targetUp = [0, 1, 0]) {
    let firstTime = true;
    let fromEye = [0, 0, 0];
    let fromAt = [0, 0, 0];
    let fromUp = [0, 1, 0];

    return function theController(time) {
        if (firstTime) {
            firstTime = false;
            // Capture the current camera values only once
            fromEye = [...eye];
            fromAt = [...at];
            fromUp = [...up];
        }

        // Interpolate 'eye' from 'fromEye' to 'targetEye' based on time
        eye[0] = fromEye[0] + (targetEye[0] - fromEye[0]) * time;
        eye[1] = fromEye[1] + (targetEye[1] - fromEye[1]) * time;
        eye[2] = fromEye[2] + (targetEye[2] - fromEye[2]) * time;

        // Interpolate 'at' from 'fromAt' to 'targetAt' based on time
        at[0] = fromAt[0] + (targetAt[0] - fromAt[0]) * time;
        at[1] = fromAt[1] + (targetAt[1] - fromAt[1]) * time;
        at[2] = fromAt[2] + (targetAt[2] - fromAt[2]) * time;

        // Interpolate 'up' from 'fromUp' to 'targetUp' based on time
        up[0] = fromUp[0] + (targetUp[0] - fromUp[0]) * time;
        up[1] = fromUp[1] + (targetUp[1] - fromUp[1]) * time;
        up[2] = fromUp[2] + (targetUp[2] - fromUp[2]) * time;
    };
}