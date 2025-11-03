import * as THREE from 'three';

let orientMode = false;
let deviceAlpha = 0, smoothedAlpha = 0;
let modelGroupRef = null;

function initOrientation(modelGroup) {
  modelGroupRef = modelGroup;

  window.addEventListener('deviceorientation', (event) => {
    if (orientMode && modelGroupRef) {
      deviceAlpha = event.alpha || 0;
      smoothedAlpha += (deviceAlpha - smoothedAlpha) * 0.1;
      modelGroupRef.rotation.y = THREE.MathUtils.degToRad(-smoothedAlpha);
    }
  });
}

function toggleOrientationMode() {
  orientMode = !orientMode;
  return orientMode;
}

export { initOrientation, toggleOrientationMode };
