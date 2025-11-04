// modules/deviceOrientation.js
import * as THREE from 'three';

export function setupDeviceOrientation(scene, camera, controls, renderer) {
  let isDeviceOrientationMode = false;
  let pivotPoint = new THREE.Vector3(0, 0, 0); // Default rotation center

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let currentModel = null;

  // Function to enable/disable device orientation
  function toggleDeviceOrientation(model) {
    currentModel = model;
    isDeviceOrientationMode = !isDeviceOrientationMode;

    if (isDeviceOrientationMode) {
      window.addEventListener('deviceorientation', onDeviceOrientationChange, true);
      controls.enabled = false; // Disable manual controls
    } else {
      window.removeEventListener('deviceorientation', onDeviceOrientationChange, true);
      controls.enabled = true;
    }
  }

  // Update pivot point when click/tap action finishes
  function updatePivotOnClick(event) {
    if (!isDeviceOrientationMode || !currentModel) return;

    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(currentModel, true);

    if (intersects.length > 0) {
      pivotPoint.copy(intersects[0].point);
    }
  }

  // For desktop + touch
  renderer.domElement.addEventListener('mouseup', updatePivotOnClick);
  renderer.domElement.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    updatePivotOnClick(touch);
  });

  // Device orientation handler
  function onDeviceOrientationChange(event) {
    if (!isDeviceOrientationMode || !currentModel) return;

    const alpha = THREE.MathUtils.degToRad(event.alpha || 0);
    const beta = THREE.MathUtils.degToRad(event.beta || 0);
    const gamma = THREE.MathUtils.degToRad(event.gamma || 0);

    // Apply orientation rotation around the pivot point
    const quaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(beta, alpha, -gamma, 'YXZ'));

    currentModel.position.sub(pivotPoint); // Move pivot to origin
    currentModel.setRotationFromQuaternion(quaternion);
    currentModel.position.add(pivotPoint); // Move back
  }

  return { toggleDeviceOrientation };
}
