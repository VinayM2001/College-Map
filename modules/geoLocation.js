import * as THREE from 'three';

export function initGeoLocation(scene) {
  const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const markerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.set(0, 0.05, 0);
  scene.add(marker);

  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('GPS:', latitude, longitude);

        // 🔧 Example: Map lat/long to model space
        // Here you can map your campus coordinates scale
        marker.position.set(
          (longitude % 1) * 10,
          0.05,
          (latitude % 1) * 10
        );
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  } else {
    console.warn('Geolocation not supported.');
  }
}
