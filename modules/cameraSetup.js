import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(5, 4, 6);

export const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI * 0.48; // tilt limit
controls.target.set(0, 0, 0);
controls.update();
