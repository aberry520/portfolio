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
camera.position.setZ(30);
// renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xf7771e,
  // wireframe: true,
});
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
pointLight.intensity = 100;
ambientLight.intensity = 0.25;
scene.add(pointLight, ambientLight);
const lighthelper = new THREE.PointLightHelper(pointLight);
scene.add(lighthelper);
const torus = new THREE.Mesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(torus);
// renderer.render(scene, camera);
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
