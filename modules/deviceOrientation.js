import * as THREE from 'three';

export function setupDeviceOrientation(scene) {
  let modelGroup = scene.children.find(obj => obj.isGroup);
  let deviceAlpha = 0;
  let smoothedAlpha = 0;
  let orientMode = false;

  const compassBtn = document.getElementById('compassBtn');
  compassBtn.addEventListener('click', () => {
    orientMode = !orientMode;
    compassBtn.style.transform = orientMode ? 'rotate(45deg)' : 'rotate(0deg)';
  });

  window.addEventListener('deviceorientation', (event) => {
    if (!orientMode || !modelGroup) return;

    deviceAlpha = event.alpha || 0;
    smoothedAlpha += (deviceAlpha - smoothedAlpha) * 0.1;

    modelGroup.rotation.y = THREE.MathUtils.degToRad(-smoothedAlpha);
  });
}
