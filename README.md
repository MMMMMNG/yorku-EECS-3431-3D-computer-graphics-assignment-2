EECS 3431 - 3D computer graphics
Fall 2024 York University, Toronto

Jessica Corkal & Marius Gebhardt

Email: jcorkal@my.yorku.ca Student ID: 219314095

Email: mmmm@my.yorku.ca Student ID: 221828934

Our animation follows the short story of an astronaut in a galaxy far, far away. As they're mining for space rocks, they encounter an unexpected visitor - a space bear!

We were able to implement multiple two(+)-level heirarchical objects (an astronaut, a spaceship, a base, and a bear), two mapped textures, a 360
fly around and additional camera movements, and animations connected to real time. Our programs frame rate is displayed in the console window 
every 2 seconds. We implemented classes for the bear and astronaut objects, and closures for the camera functionality and animation. We also implemented a skybox and attempted to implement a transparent shader effect. The transparency half works though becuase it doesn't always take into account the z-buffer when multiple transparent objects overlap; this results in the shader not knowing which transparent object is in front of the other.
This would be something we aim to fix in the future of this project.

---------- Learning Resources ----------------

Screen space reflections and refraction:
https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html

https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-refraction.html

Cubemap:
https://webglfundamentals.org/webgl/lessons/webgl-skybox.html

Transparency and Alpha Blending:
https://learnwebgl.brown37.net/11_advanced_rendering/alpha_blending.html 

-------------- Texture Citations ------------------

"Deserted terrestial planet in orange colors" (planet_skybox.webp) by Ruletkka. 2015, May 3, https://depositphotos.com/photos/mars.html?qview=71865897.

"Galaxy wallpaper in warm colors" (galaxy_wallpaper.jpg) by Freepik, https://www.freepik.com/free-ai-image/galaxy-wallpaper-warm-colors_280118555.htm#fromView=search&page=3&position=39&uuid=d0c3b73e-551b-48ff-9b6b-134a2f154eec.

"Seamless dirt texture" (dirt_texture.jpg) by hhh316. 2010, May 09, https://www.deviantart.com/hhh316/art/Seamless-dirt-texture-163426021.

-------------- External Library for skybox  ------------------
https://webglfundamentals.org/webgl/resources/webgl-utils.j
https://webglfundamentals.org/webgl/resources/m4.js
https://webglfundamentals.org/webgl/resources/primitives.js