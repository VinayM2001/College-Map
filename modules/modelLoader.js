import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let currentModel, modelGroup;
const loader = new GLTFLoader();

export function loadModel(scene, path) {
  if (modelGroup) scene.remove(modelGroup);
  modelGroup = new THREE.Group();

  loader.load(`./assets/${path}`, (gltf) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = 3 / Math.max(size.x, size.y, size.z);

    model.position.sub(center);
    model.scale.setScalar(scale);
    modelGroup.add(model);
    scene.add(modelGroup);

    currentModel = model;
    console.log(`${path} loaded and centered`);
  });
}

export function centerModel(point, controls) {
  if (controls && point) {
    controls.target.copy(point);
    controls.update();
  }
}
