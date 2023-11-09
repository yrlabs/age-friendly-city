// A function to remove the loading screen
function removeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-overlay');
    if (loadingScreen) {
        loadingScreen.style.display = 'none'; // Hide the loading screen
    }
}
// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf7eab3 )
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 0.5, 1);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function updateCameraPosition() {
    // Ensure the camera's position stays within the defined limits
    if (camera.position.y < minHeight) {
        camera.position.y = minHeight;
    } else if (camera.position.y > maxHeight) {
        camera.position.y = maxHeight;
    }
}
// Load the JSON font data and create text geometry here
const text = new THREE.FontLoader();
let textMesh; // Define a variable for the text mesh

// Load the JSON font data
text.load('kindergarten_Medium.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Move cursor to explore', {
        font: font,
        size: 0.1, // Adjust size as needed
        height: 0.01, // Adjust height as needed
        curveSegments: 12,
    });

    // Create and add a Mesh to your scene
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.3, 0.7, -0.5); // Adjust the position as needed
    textMesh.scale.set(0.5, 0.5, 0.5); // Adjust the scale as needed
    scene.add(textMesh);
});
const clock = new THREE.Clock(); 
const mixers = [];
setTimeout(removeLoadingScreen, 2500);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add a mousemove event listener to update the mouse position
document.addEventListener('mousemove', (event) => {
    // Calculate the mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Add a click event listener
document.addEventListener('click', () => {
    // Raycast from the camera
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(scene.children, true);

    // If there are intersections, handle the clicked object
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        // Handle the clicked object here
    }
});
// Load your 3D city model
const loader = new THREE.GLTFLoader();
loader.load('citymodel1.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);

    const building1 = model.getObjectByName('aparment garden');
    building1.addEventListener('click', () => {
        // Handle the click event for "building1"
    });
    
});

// Load the bus model
const busLoader = new THREE.GLTFLoader();
busLoader.load('bus.glb', (gltf) => {
    const busModel = gltf.scene;
    busModel.scale.set(0.1, 0.1, 0.1);
    scene.add(busModel);

    // Create an animation mixer for the bus model
    const mixer = new THREE.AnimationMixer(busModel);

    // Get the animation clip by name ("Cube.001" in this case)
    const busAnimationClip = THREE.AnimationClip.findByName(gltf.animations, 'Cube.001Action');

    if (busAnimationClip) {
        // Create an animation action
        const busAnimationAction = mixer.clipAction(busAnimationClip);

        // Play the animation
        busAnimationAction.play();

        // Add the mixer to an array to update it in your animation loop
        mixers.push(mixer);
    }
    setTimeout(removeLoadingScreen, 2100);

});
const directionalLight = new THREE.DirectionalLight(0xfaddd4, 0.6);
directionalLight.position.set(1, 1, 1); // Set the light's position
directionalLight.intensity = 0.9; // Adjust the intensity as needed
scene.add(directionalLight);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xf2c883, 0.9); // Choose a color that fits your scene
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xFBD1B3, 0xC6BE8, 0.3); // Adjust colors and intensity as needed
hemisphereLight.position.set(0, 1, 0); // Adjust the position as needed
scene.add(hemisphereLight);

// Set the target position
const target = new THREE.Vector3(0, 0, 0);

// Define zoom limits
const minDistance = 0.5; // Minimum allowable distance
const maxDistance = 2.5; // Maximum allowable distance

// Update the camera position based on zoom limits
function updateCameraZoom() {
    const zoomScale = camera.position.distanceTo(target);

    if (zoomScale < minDistance) {
        const direction = camera.position.clone().sub(target).normalize();
        camera.position.copy(target).add(direction.multiplyScalar(minDistance));
    } else if (zoomScale > maxDistance) {
        const direction = camera.position.clone().sub(target).normalize();
        camera.position.copy(target).add(direction.multiplyScalar(maxDistance));
    }
}

// Handle mouse wheel event for zooming
document.addEventListener('wheel', (event) => {
    // Adjust zoom sensitivity as needed
    const zoomSensitivity = 0.1;

    const direction = camera.position.clone().sub(target).normalize();
    camera.position.sub(direction.multiplyScalar(event.deltaY * zoomSensitivity));

    // Update camera position to clamp zoom
    updateCameraZoom();
});

// Initialize OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Optional: You can customize the controls, such as limiting rotation or zooming
controls.minPolarAngle = 0; // Minimum vertical angle (in radians)
controls.maxPolarAngle = Math.PI; // Maximum vertical angle (in radians)
controls.enableDamping = true; // Enable smooth camera movement
// Disable vertical panning (optional)
controls.enablePan = false;

// Define the minimum and maximum height for the camera
const minHeight = 0; // Minimum height (adjust as needed)
const maxHeight = 0.8; // Maximum height (adjust as needed)

// Create a hotspot object (e.g., a sphere)



// Add a click event listener to the button element in your HTML
document.getElementById('buttonschool').addEventListener('click', () => {
    // When the button is clicked, open a separate webpage
    window.location.href = 'https://bottlenose-glitter-exception.glitch.me/?room=rapid_dolphin_679';
})

document.getElementById('buttonhospital').addEventListener('click', () => {
    window.location.href = 'https://imported-kiwi-taxicab.glitch.me/?room=powerful_monkey_140'; 
});
document.getElementById('buttonpark').addEventListener('click', () => {
    window.location.href = 'https://pinto-gray-cement.glitch.me/?room=tasty_panda_364'; 
});
document.getElementById('buttonhousing').addEventListener('click', () => {
    window.location.href = 'https://rocky-harvest-border.glitch.me/?room=pretty_panda_774';
});

document.getElementById('buttontowncentre').addEventListener('click', () => {
    window.location.href = 'https://excellent-adventurous-oil.glitch.me/?room=lazy_butterfly_944';
});
document.getElementById('buttoncarpark').addEventListener('click', () => {
    window.location.href = 'https://ultra-arrow-crowd.glitch.me/?room=lame_dragon_314';
});
    // Animation loop
function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();

    // Update your animations, controls, and camera position here
    mixers.forEach((mixer) => {
        mixer.update(deltaTime);
    });
    // Update your controls and animations here
    controls.update(); // Update OrbitControls

    // Ensure camera height stays within defined limits
    updateCameraPosition();

    renderer.render(scene, camera);
}

animate();




