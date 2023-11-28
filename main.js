import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.SphereGeometry(3, 32, 32);
const material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("images/earth.jpg"),
  bumpMap: new THREE.TextureLoader().load("images/bump_map.jpg"),
  bumpScale: 0.005,
  specularMap: new THREE.TextureLoader().load("images/water_4k.png"),
  specular: new THREE.Color("grey"),
});
const cloud_geometry = new THREE.SphereGeometry(3 + 0.03, 32, 32);
const cloud_material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("images/fair_clouds_4k.png"),
  transparent: true,
});
const clouds = new THREE.Mesh(cloud_geometry, cloud_material);
scene.add(clouds);

const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-50, 0, 0);
pointLight.intensity = 2000;

ambientLight.intensity = 0.2;
scene.add(pointLight, ambientLight);
const lighthelper = new THREE.PointLightHelper(pointLight);
scene.add(lighthelper);
const earth = new THREE.Mesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(earth);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
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

const moontexture = new THREE.TextureLoader().load("images/moon2.jpg");
const moon_bump = new THREE.TextureLoader().load("images/normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moontexture,
    normalMap: moon_bump,
  })
);
moon.position.set(10, 10, 0);
scene.add(moon);
function animate() {
  requestAnimationFrame(animate);
  // earth.rotation.x += 0.01;
  earth.rotation.y += 0.0005;
  clouds.rotation.y += 0.0004;
  // earth.rotation.z += 0.0001;
  // scene.rotation.x += 0.01;
  // scene.rotation.y += 0.0005;
  // scene.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
