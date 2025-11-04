import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const modelGroup = new THREE.Group();
let currentModel = null;

function loadModel(path) {
  if (currentModel) modelGroup.remove(currentModel);

  loader.load(`assets/${path}`, (gltf) => {
    const model = gltf.scene;

    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Scale appropriately
    const size = box.getSize(new THREE.Vector3());
    const scale = 3 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);

    currentModel = model;
    modelGroup.add(model);
  });
}

// Load the default model
loadModel('Insti_map_Final.glb');

export { modelGroup, loadModel, getCurrentModel: () => currentModel };
