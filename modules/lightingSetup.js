import * as THREE from 'three';

export function addLights(scene) {
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  hemi.position.set(0, 50, 0);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(10, 19, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  scene.add(sun);
}
