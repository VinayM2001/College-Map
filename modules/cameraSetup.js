import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 2, 5);

const rendererDom = document.querySelector('canvas');
const controls = new OrbitControls(camera, rendererDom);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Adjust zoom range (distance)
controls.minDistance = 2;
controls.maxDistance = 10;

// Limit vertical angle
controls.maxPolarAngle = Math.PI * 0.95;

export { camera, controls };
