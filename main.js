import { scene, renderer } from './modules/sceneSetup.js';
import { camera, controls } from './modules/cameraSetup.js';
import { addLights } from './modules/lightingSetup.js';
import { modelGroup, loadModel } from './modules/modelLoader.js';
import { initOrientation, toggleOrientationMode } from './modules/deviceOrientation.js';
import { setupUI } from './modules/uiSetup.js';

scene.add(modelGroup);
addLights(scene);
setupUI(loadModel, toggleOrientationMode);

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Initialize orientation
initOrientation(modelGroup);
