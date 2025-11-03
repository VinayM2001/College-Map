import * as THREE from 'three';

let orientMode = false;
let deviceAlpha = 0, smoothedAlpha = 0;
let modelGroupRef = null;

 // --- Orientation Mode (Align North) ---
    function handleOrientation(e) {
      if (!orientMode || !currentModel) return;
      const alpha = e.alpha;
      if (alpha == null) return;

      if (!hasInitial) { offset = alpha; hasInitial = true; }

      let diff = alpha - lastAlpha;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      lastAlpha += diff * 0.1;
      smoothAlpha = (lastAlpha - offset) % 360;

      modelGroup.rotation.y = THREE.MathUtils.degToRad(-smoothAlpha);
      document.getElementById('compassBtn').style.transform = `rotate(${smoothAlpha}deg)`;
    }


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
