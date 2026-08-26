const canvas = document.getElementById("scene");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
);

camera.position.set(0, 0.2, 8.5);


// ==================================================
// RENDERER
// ==================================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setClearColor(0x000000, 0);


// ==================================================
// LIGHTING
// ==================================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.1
);

scene.add(ambientLight);


const redLight = new THREE.PointLight(
    0xff3b3b,
    5.5,
    25,
    2
);

redLight.position.set(
    2.5,
    1.8,
    5.2
);

scene.add(redLight);


const blueLight = new THREE.PointLight(
    0x7cc6ff,
    3.2,
    22,
    2
);

blueLight.position.set(
    -4,
    1.5,
    3.5
);

scene.add(blueLight);


const rimLight = new THREE.DirectionalLight(
    0xffffff,
    1.4
);

rimLight.position.set(
    -3,
    3,
    4.5
);

scene.add(rimLight);


// ==================================================
// 3D ORBIT RINGS
// ==================================================

function createRibbonRing(
    color,
    radius,
    tube,
    rotationX,
    rotationY
) {

    const group = new THREE.Group();


    // Main ring

    const torus = new THREE.Mesh(

        new THREE.TorusGeometry(
            radius,
            tube,
            20,
            120
        ),

        new THREE.MeshPhysicalMaterial({

            color: color,

            emissive: color,

            emissiveIntensity: 0.25,

            transparent: true,

            opacity: 0.65,

            roughness: 0.2,

            metalness: 0.4

        })

    );


    torus.rotation.x = rotationX;

    torus.rotation.y = rotationY;


    group.add(torus);


    // Inner glow ring

    const innerGlow = new THREE.Mesh(

        new THREE.TorusGeometry(
            radius * 0.82,
            tube * 0.5,
            18,
            100
        ),

        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.18

        })

    );


    innerGlow.rotation.x = rotationX;

    innerGlow.rotation.y =
        rotationY + 0.7;


    group.add(innerGlow);


    return group;
}


// ==================================================
// RINGS
// ==================================================

const ringA = createRibbonRing(
    0xffffff,
    2.2,
    0.03,
    1.1,
    0.4
);

ringA.position.set(
    -0.8,
    0.5,
    -1.1
);

scene.add(ringA);


const ringB = createRibbonRing(
    0xd24242,
    1.7,
    0.026,
    0.8,
    1.7
);

ringB.position.set(
    1.4,
    -0.3,
    -0.8
);

scene.add(ringB);


const ringC = createRibbonRing(
    0xe5e5e5,
    2.8,
    0.02,
    1.8,
    0.8
);

ringC.position.set(
    0.4,
    0.8,
    -1.5
);

scene.add(ringC);


// ==================================================
// FLOATING PARTICLES
// ==================================================

const particleGeometry =
    new THREE.BufferGeometry();

const particleCount = 220;

const particlePositions =
    new Float32Array(
        particleCount * 3
    );


for (
    let i = 0;
    i < particleCount * 3;
    i += 3
) {

    particlePositions[i] =
        (Math.random() - 0.5) * 12;

    particlePositions[i + 1] =
        (Math.random() - 0.5) * 8;

    particlePositions[i + 2] =
        (Math.random() - 0.5) * 6;

}


particleGeometry.setAttribute(
    "position",

    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);


const particles = new THREE.Points(

    particleGeometry,

    new THREE.PointsMaterial({

        color: 0xdedede,

        size: 0.028,

        transparent: true,

        opacity: 0.7

    })

);


scene.add(particles);


// ==================================================
// MOUSE MOVEMENT
// ==================================================

let mouseX = 0;

let mouseY = 0;


window.addEventListener(
    "pointermove",

    function (event) {

        mouseX =
            (event.clientX /
                window.innerWidth) *
            2 - 1;

        mouseY =
            (event.clientY /
                window.innerHeight) *
            2 - 1;

    }
);


// ==================================================
// ANIMATION
// ==================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // ------------------------------
    // RING A
    // ------------------------------

    ringA.rotation.x =
        time * 0.45;

    ringA.rotation.z =
        time * 0.25;


    // ------------------------------
    // RING B
    // ------------------------------

    ringB.rotation.y =
        time * 0.5;

    ringB.rotation.x =
        time * 0.28 + 0.6;


    // ------------------------------
    // RING C
    // ------------------------------

    ringC.rotation.x =
        time * 0.22;

    ringC.rotation.y =
        -time * 0.35;


    // ------------------------------
    // CAMERA PARALLAX
    // ------------------------------

    camera.position.x +=
        (
            mouseX * 0.7 -
            camera.position.x
        ) * 0.025;


    camera.position.y +=
        (
            -mouseY * 0.35 -
            camera.position.y
        ) * 0.02;


    // ------------------------------
    // PARTICLES
    // ------------------------------

    particles.rotation.y =
        time * 0.02;

    particles.rotation.x =
        time * 0.01;


    renderer.render(
        scene,
        camera
    );

}


animate();


// ==================================================
// RESIZE
// ==================================================

function resize() {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height,
        false
    );

}


window.addEventListener(
    "resize",
    resize
);


resize();
// ==================================================
// SITE NAVIGATION
// ==================================================

function setupNavigation() {
    const sections = {
        home: ["#home", "#hero"],
        skills: ["#skills", "#skill"],
        projects: ["#projects", "#project"],
        about: ["#about"],
        connect: ["#connect", "#contact"]
    };

    document.addEventListener("click", (event) => {
        const control = event.target.closest("a, button");
        if (!control) return;

        const label = control.textContent.trim().toLowerCase();
        const key = label.includes("explore") ? "about" :
            Object.keys(sections).find((name) => label.includes(name));
        if (!key) return;

        const target = sections[key].map((selector) => document.querySelector(selector))
            .find(Boolean);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupNavigation);
} else {
    setupNavigation();
}
// ==================================================
// EXPLORE BUTTON
// ==================================================

const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", function () {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
});