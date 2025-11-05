import { scene, renderer } from './modules/sceneSetup.js';
import { camera, controls } from './modules/cameraSetup.js';
import { addLights } from './modules/lightingSetup.js';
import { loadModel, centerModel } from './modules/modelLoader.js';
import { setupDeviceOrientation } from './modules/deviceOrientation.js';
import { setupUI } from './modules/uiSetup.js';
import { initGeoLocation } from './modules/geoLocation.js';

addLights(scene);
setupUI(scene, camera, controls, loadModel, centerModel);
setupDeviceOrientation(scene);
initGeoLocation(scene); // NEW GPS marker module

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
