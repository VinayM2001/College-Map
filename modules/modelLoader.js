import * as THREE from 'three';

const modelGroup = new THREE.Group();
let currentModel = null;

function createFloorGeometry() {
  const geometry = new THREE.BoxGeometry(8, 0.3, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.1,
    roughness: 0.8
  });
  return new THREE.Mesh(geometry, material);
}

function createWall(width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({
    color: 0xd4a574,
    metalness: 0,
    roughness: 0.9
  });
  return new THREE.Mesh(geometry, material);
}

function createRoof() {
  const geometry = new THREE.ConeGeometry(6, 2, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    metalness: 0,
    roughness: 0.8
  });
  return new THREE.Mesh(geometry, material);
}

function createCampusView() {
  const group = new THREE.Group();

  // Create 4 buildings
  const buildings = [
    { x: -3, y: 0, z: -3, width: 2, depth: 2 },
    { x: 3, y: 0, z: -3, width: 2, depth: 2 },
    { x: -3, y: 0, z: 3, width: 2, depth: 2 },
    { x: 3, y: 0, z: 3, width: 2, depth: 2 },
  ];

  buildings.forEach(building => {
    // Building structure
    const wall = createWall(building.width, 1.5, building.depth);
    wall.position.set(building.x, building.y + 0.75, building.z);
    group.add(wall);

    // Roof
    const roof = createRoof();
    roof.scale.set(building.width / 6, 0.5, building.depth / 6);
    roof.position.set(building.x, building.y + 1.5, building.z);
    group.add(roof);
  });

  // Ground floor
  const ground = createFloorGeometry();
  ground.position.y = -0.15;
  group.add(ground);

  return group;
}

function createFloorPlan(floorNumber) {
  const group = new THREE.Group();

  // Floor base
  const floor = createFloorGeometry();
  floor.position.y = 0;
  group.add(floor);

  // Add rooms (simple boxes)
  const roomCount = 6;
  for (let i = 0; i < roomCount; i++) {
    const room = createWall(1.2, 0.01, 1.2);
    room.position.set(
      (i - roomCount / 2) * 1.5 + 1.5,
      0.15,
      Math.sin(i) * 2
    );
    group.add(room);

    // Room label
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Room ${i + 1}`, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const labelGeom = new THREE.PlaneGeometry(1, 1);
    const label = new THREE.Mesh(labelGeom, labelMaterial);
    label.position.set(room.position.x, room.position.y + 0.1, room.position.z);
    label.rotation.x = -Math.PI / 2;
    label.scale.set(0.8, 0.8, 0.8);
    group.add(label);
  }

  return group;
}

function loadModel(path) {
  if (currentModel) modelGroup.remove(currentModel);

  let model;

  if (path === 'Insti_map_Final.glb') {
    model = createCampusView();
  } else if (path === 'G_floor_Final.glb') {
    model = createFloorPlan('Ground');
  } else if (path === '1st_floor_Final.glb') {
    model = createFloorPlan('1st');
  } else if (path === '2nd_floor_Final.glb') {
    model = createFloorPlan('2nd');
  } else {
    model = createCampusView();
  }

  currentModel = model;
  modelGroup.add(model);
}

// Load the default model
loadModel('Insti_map_Final.glb');

export { modelGroup, loadModel, getCurrentModel: () => currentModel };
