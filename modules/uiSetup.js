import * as THREE from 'three';
import { camera, controls } from './cameraSetup.js';

function setupUI(loadModel, toggleOrientationMode) {
  const compassBtn = document.getElementById('compassBtn');
  const floorSelector = document.getElementById('floorSelector');
  const rendererDom = document.querySelector('canvas');
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let currentModel = null;

  // Floor selector
  floorSelector.addEventListener('change', (e) => {
    loadModel(e.target.value);
  });

  // Compass toggle
  compassBtn.addEventListener('click', () => {
    const orientOn = toggleOrientationMode();
    compassBtn.style.background = orientOn ? 'rgba(255,0,0,0.7)' : 'rgba(0,0,0,0.6)';
  });

  // Tap to re-center orbit pivot
  rendererDom.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    if (currentModel) {
      const intersects = raycaster.intersectObject(currentModel, true);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        controls.target.copy(point);
        controls.update();
      }
    }
  });
}

export { setupUI };
