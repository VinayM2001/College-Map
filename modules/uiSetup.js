export function setupUI(scene, camera, controls, loadModel, centerModel) {
  document.querySelectorAll('#floorBtns button').forEach(btn => {
    btn.addEventListener('click', () => {
      const modelName = btn.getAttribute('data-model');
      loadModel(scene, modelName);
    });
  });

  // Recenter when user taps
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  document.addEventListener('mouseup', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) centerModel(intersects[0].point, controls);
  });
}
