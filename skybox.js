"use strict";

let skyboxQuadBufferInfo;
let skyboxTexture;

function skyboxSetup(gl) {

  skyboxQuadBufferInfo = primitives.createXYQuadBufferInfo(gl);

  // Create a texture.
  skyboxTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);

  const faceInfos = [
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      url: 'Textures/computer-history-museum/pos-x.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      url: 'Textures/computer-history-museum/neg-x.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      url: 'Textures/computer-history-museum/pos-y.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      url: 'Textures/computer-history-museum/neg-y.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      url: 'Textures/computer-history-museum/pos-z.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      url: 'Textures/computer-history-museum/neg-z.jpg',
    },
  ];
  faceInfos.forEach((faceInfo) => {
    const {target, url} = faceInfo;

    // Upload the canvas to the cubemap face.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 512;
    const height = 512;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    // setup each face so it's immediately renderable
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

    // Asynchronously load an image
    const image = new Image();
    image.src = url;
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
      gl.texImage2D(target, level, internalFormat, format, type, image);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    });
  });
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

  function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }
}

  // Draw the scene.
  function renderSkybox(gl, skyboxProgramInfo, cameraPosition, target, up) {

    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix =
        m4.perspective(60 * Math.PI / 180, aspect, 1, 100);
    // Compute the camera's matrix using look at.
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    // We only care about direciton so remove the translation
    var viewDirectionMatrix = m4.copy(viewMatrix);
    viewDirectionMatrix[12] = 0;
    viewDirectionMatrix[13] = 0;
    viewDirectionMatrix[14] = 0;

    var viewDirectionProjectionMatrix = m4.multiply(
        projectionMatrix, viewDirectionMatrix);
    var viewDirectionProjectionInverseMatrix =
        m4.inverse(viewDirectionProjectionMatrix);


    // draw the skybox

    // let our quad pass the depth test at 1.0
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(skyboxProgramInfo.program);
    var viewDirectionProjectionMatrix =
        m4.multiply(projectionMatrix, viewMatrix);
    var viewDirectionProjectionInverseMatrix =
        m4.inverse(viewDirectionProjectionMatrix);

    // Set the uniforms
    gl.uniformMatrix4fv(
        viewDirectionProjectionInverseLocation, false,
        viewDirectionProjectionInverseMatrix);

    // Tell the shader to use texture unit 0 for u_skybox
    gl.uniform1i(skyboxLocation, 0);

    // let our quad pass the depth test at 1.0
    gl.depthFunc(gl.LEQUAL);

    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
  }