import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerHeight / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(80);
// renderer.render(scene, camera);

const earthtexture = new THREE.TextureLoader().load("images/earth2.jpeg");
const geometry = new THREE.SphereGeometry(10, 50, 50);
const material = new THREE.MeshStandardMaterial({
  // color: 0xf7771e,
  map: earthtexture,
  // wireframe: true,
  emissive: 0xffffff,
  emissiveIntensity: 0.01,
});
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-50, 0, 0);
pointLight.intensity = 2000;

ambientLight.intensity = 0.2;
scene.add(pointLight, ambientLight);
const lighthelper = new THREE.PointLightHelper(pointLight);
scene.add(lighthelper);
const torus = new THREE.Mesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(torus);
// renderer.render(scene, camera);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
const stars = Array(400).fill().forEach(addStars);

// const spacetexture = new THREE.TextureLoader().load("images/spacebg.png");
// scene.background = spacetexture;
const moontexture = new THREE.TextureLoader().load("images/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 50, 50),
  new THREE.MeshStandardMaterial({
    map: moontexture,
  })
);
moon.position.set(20, 30, 20);
scene.add(moon);
function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  torus.rotation.y += 0.001;
  // torus.rotation.z += 0.0001;
  // scene.rotation.x += 0.01;
  scene.rotation.y += 0.0005;
  // scene.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
