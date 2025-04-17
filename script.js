const neuralWeb = document.getElementById('neural-web');
let nodes = [];
let lines = [];
const nodeCount = 7;
const nodeRadius = 25;
const lineDistance = 800;
const repulsionDistance = 150;
const repulsionStrengthmin = -5;
const repulsionStrengthmax = 5;
const repulsionStrengthdef = 5;
const replusionStrenthSinSpeed = 50; // Frequency of the sine wave
const speed = 5;
let repulsionStrength = repulsionStrengthdef; // Initialize with the default

function updateRepulsionStrength() {
    // Calculate the time-dependent angle using Math.sin
    // 'replusionStrenthSinSpeed' controls the rate of change (frequency)
    const angle = replusionStrenthSinSpeed * (Date.now() / 1000); // Date.now() returns milliseconds, /1000 converts to seconds

    // Calculate the sine wave value between -1 and 1
    const sineValue = Math.sin(angle);

    // Scale and shift the sine wave to fit within the desired range
    repulsionStrength = repulsionStrengthdef + sineValue * (repulsionStrengthmax - repulsionStrengthdef);  // Adjust around default

    // Optional: clamp the value if you want to be ABSOLUTELY sure it doesn't exceed min/max
    repulsionStrength = Math.max(repulsionStrengthmin, Math.min(repulsionStrengthmax, repulsionStrength));
}

// Example usage:  Call this function periodically to update 'repulsionStrength'
// For example, using setInterval:
setInterval(updateRepulsionStrength, 20); // Update every 20 milliseconds (50 times per second)

// Now you can use the 'repulsionStrength' variable in your code,
// and it will smoothly oscillate between repulsionStrengthmin and repulsionStrengthmax
// (approximately, depending on how you set the scaling in the calculation)

const maxDistanceToEdgeX = 300;
const maxDistanceToEdgeY = 150;
const egdeOffsetX = 200; // offset added
const egdeOffsetY = 0; // offset added
const debug = false;
let expandedNeuron = null;
let animationComplete = false;
let lineDrawingComplete = false;
const projects = [
    {
        title: "MagnetHub",
        description: "A Windows tool for safely downloading movies and TV shows from torrent websites, providing a more secure way to access content.",
        link: "https://github.com/IZvX/MagnetHub"
    },
    {
        title: "Linite",
        description: "A Linux-based tool similar to Ninite, designed to help automate the installation of multiple apps with just a click.",
        link: "https://github.com/IZvX/Linite"
    },
    {
        title: "Virtual Desktop",
        description: "A simulated virtual GNOME desktop environment built with web technologies, offering a unique browser-based experience.",
        link: "https://github.com/IZvX/virtualDesktop"
    },
    {
        title: "Batman Arkham Asylum Bio Page",
        description: "A bio page for Batman Arkham Asylum built using HTML, CSS, and JavaScript, mimicking the game's UI design.",
        link: "https://github.com/IZvX/BatmanAABio"
    },
    {
        title: "Money Management App",
        description: "A personal finance tracker that helps you monitor your earnings, spendings, and overall savings, providing a clear view of your financial situation.",
        link: "https://github.com/IZvX/MoneyManagment"
    },
    {
        title: "Analog Clock (Glassmorphism)",
        description: "An analog clock created with HTML, CSS, and JavaScript, designed in a glassmorphism style for a modern, sleek look.",
        link: "https://github.com/IZvX/AnalogClockGlassmorphism"
    },
    {
        title: "Analog Clock (Neumorphism)",
        description: "An analog clock built with HTML, CSS, and JavaScript, designed with neumorphism for a soft, minimalistic aesthetic.",
        link: "https://github.com/IZvX/AnalogClockNeumorphism"
    }
];


function createNodes() {
    neuralWeb.innerHTML = '';
    nodes = [];
    expandedNeuron = null;

    for (let i = 0; i < nodeCount; i++) {
        const project = projects[i % projects.length];

        const container = document.createElement('div');
        container.classList.add('neuron-container');

        // Initial positions outside the screen
        container.style.left = `${Math.random() > 0.5 ? -200 : window.innerWidth + 200}px`;
        container.style.top = `${Math.random() * window.innerHeight}px`;

        const node = document.createElement('div');
        node.classList.add('neuron');
        node.textContent = project.title.substring(0, 20);
        container.appendChild(node);

        const title = document.createElement('div');
        title.classList.add('neuron-title');
        title.textContent = project.title;
        container.appendChild(title);

        container.dataset.index = i;
        container.addEventListener('click', handleNodeClick);

        neuralWeb.appendChild(container);
        nodes.push(container);

        container.directionX = (Math.random() - 0.5);
        container.directionY = (Math.random() - 0.5);
    }

    if (debug) {
        visualizeMaxDistance();
    }
}

function isValidPosition(x, y) {
    return (
        x > maxDistanceToEdgeX + egdeOffsetX &&
        x < window.innerWidth - maxDistanceToEdgeX + egdeOffsetX &&
        y > maxDistanceToEdgeY + egdeOffsetY &&
        y < window.innerHeight - maxDistanceToEdgeY + egdeOffsetY
    );
}

function visualizeMaxDistance() {
    const debugCircle = document.createElement('div');
    debugCircle.classList.add('debug-circle');
    debugCircle.style.width = `${window.innerWidth - 2 * maxDistanceToEdgeX}px`;
    debugCircle.style.height = `${window.innerHeight - 2 * maxDistanceToEdgeY}px`;
    debugCircle.style.left = `${maxDistanceToEdgeX + egdeOffsetX}px`; // Apply offset
    debugCircle.style.top = `${maxDistanceToEdgeY + egdeOffsetY}px`; // Apply offset

    neuralWeb.appendChild(debugCircle);
}

function createLines() {
    const lineClass = 'line';
    const linesSelector = `.${lineClass}`;
    lines = []; // Reset local reference

    // Remove existing lines immediately.
    const existingLines = document.querySelectorAll(linesSelector);
    existingLines.forEach(line => line.remove());

    // Calculate node positions first and cache them
    const nodePositions = nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    });

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const pos1 = nodePositions[i];
            const pos2 = nodePositions[j];

            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < lineDistance) {
                const line = document.createElement('div');
                line.classList.add(lineClass);
                line.style.width = '0';  // Initial width 0

                const angle = Math.atan2(dy, dx);

                // Set initial line styles
                line.style.left = `${pos1.x}px`;
                line.style.top = `${pos1.y}px`;
                line.style.transformOrigin = '0 0';
                line.style.transform = `rotate(${angle}rad)`;

                neuralWeb.appendChild(line);
                lines.push({
                    line: line,
                    fromNodeIndex: i,
                    toNodeIndex: j,
                    drawn: false, // Track if the line has been fully drawn.
                    length: distance //Save the distance.
                });
            }
        }
    }
}

function drawLines() {
    createLines(); // Create lines first
    lineDrawingComplete = false; // Reset the flag each time lines are drawn.

    lines.forEach((lineObj, index) => {
        setTimeout(() => {
            lineObj.line.style.width = `${lineObj.length}px`;
            lineObj.line.classList.add('drawn');
            lineObj.drawn = true;  // Mark the line as drawn.

            if (index === lines.length - 1) {
                lineDrawingComplete = true;
            }
        }, index * 150);
    });
}

function updateLinePositions() {
    if (!lines) return; //If there are no lines.

    lines.forEach(lineObj => {
        if (!lineObj.line) return;

        const node1 = nodes[lineObj.fromNodeIndex];
        const node2 = nodes[lineObj.toNodeIndex];

        if (!node1 || !node2) {
            //Nodes no longer exist
            return;
        }

        //Get bounding rectangles
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();


        const pos1 = { x: rect1.left + rect1.width / 2, y: rect1.top + rect1.height / 2 };
        const pos2 = { x: rect2.left + rect2.width / 2, y: rect2.top + rect2.height / 2 };

        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        //Update line styles
        lineObj.line.style.left = `${pos1.x}px`;
        lineObj.line.style.top = `${pos1.y}px`;
        lineObj.line.style.transform = `rotate(${angle}rad)`;

        if (lineObj.drawn) {
            // If the line drawing animation is complete, update the width as well
            lineObj.line.style.width = `${distance}px`;
        } else {
            lineObj.length = distance; // Update the line with its new length for redraw on resize
        }
    });
}


function handleNodeClick(event) {
    if (!animationComplete || !lineDrawingComplete) return;

    const container = event.currentTarget;
    const neuron = container.querySelector('.neuron');

    if (neuron.classList.contains('expanded')) {
        collapseNeuron(neuron);
        return;
    }

    if (expandedNeuron) {
        collapseNeuron(expandedNeuron);
    }

    expandNeuron(neuron, container);
}

function expandNeuron(neuron, container) {
    const index = parseInt(container.dataset.index);
    const project = projects[index % projects.length];
    neuron.classList.add('expanded');
    neuron.textContent = `${project.description}`;
    neuron.style.width = '250px';
    neuron.style.height = '250px';
    neuron.style.borderRadius = '15px';
    neuron.style.color = '#fff';
    neuron.style.fontSize = '1em';
    expandedNeuron = neuron;
}

function collapseNeuron(neuron) {
    const container = neuron.parentNode;
    const index = parseInt(container.dataset.index);
    const project = projects[index % projects.length];

    neuron.classList.remove('expanded');
    neuron.textContent = project.title.substring(0, 20);
    neuron.style.width = '';
    neuron.style.height = '';
    neuron.style.borderRadius = '';
    neuron.style.color = '';
    neuron.style.fontSize = '';
    expandedNeuron = null;
}

function initialize() {
    createNodes();
    createStars(50);
}

window.addEventListener('resize', () => {
    initialize();
    startUpAnimation();
});

function moveNode(node) {
    let newX = node.x + node.directionX * speed;
    let newY = node.y + node.directionY * speed;

    for (let otherNode of nodes) {
        if (otherNode === node) continue;

        const dx = otherNode.x - newX;
        const dy = otherNode.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionDistance) {
            const repulsionX = (newX - otherNode.x) / distance;
            const repulsionY = (newY - otherNode.y) / distance;

            newX += repulsionX * repulsionStrength;
            newY += repulsionY * repulsionStrength;
        }
    }

    // Apply edge offset to the boundary checks
    if (newX < maxDistanceToEdgeX + egdeOffsetX) {
        newX = maxDistanceToEdgeX + egdeOffsetX;
        node.directionX *= -1;
    } else if (newX > window.innerWidth - maxDistanceToEdgeX - node.offsetWidth + egdeOffsetX) {
        newX = window.innerWidth - maxDistanceToEdgeX - node.offsetWidth + egdeOffsetX;
        node.directionX *= -1;
    }

    if (newY < maxDistanceToEdgeY + egdeOffsetY) {
        newY = maxDistanceToEdgeY + egdeOffsetY;
        node.directionY *= -1;
    } else if (newY > window.innerHeight - maxDistanceToEdgeY - node.offsetHeight + egdeOffsetY) {
        newY = window.innerHeight - maxDistanceToEdgeY - node.offsetHeight + egdeOffsetY;
        node.directionY *= -1;
    }


    node.x = newX;
    node.y = newY;

    node.style.transform = `translate(${newX}px, ${newY}px)`;
    node.style.left = '0';
    node.style.top = '0';
}

function updatePositions() {
    nodes.forEach(moveNode);
    updateLinePositions(); // Update line positions every frame.
    requestAnimationFrame(updatePositions);
}

function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        neuralWeb.appendChild(star);
    }
}

function prepareNodesForMovement() {
    nodes.forEach(node => {
        node.containerWidth = node.offsetWidth;
        node.containerHeight = node.offsetHeight;

        node.x = parseFloat(node.style.left);
        node.y = parseFloat(node.style.top);

        const neuronElement = node.querySelector('.neuron');
        node.offsetWidth = neuronElement.offsetWidth;
        node.offsetHeight = neuronElement.offsetHeight;
    });
}

function startUpAnimation() {
    nodes.forEach((node, index) => {
        // Apply edge offset to the target positions
        let targetX = maxDistanceToEdgeX + egdeOffsetX + (Math.random() * (window.innerWidth - 2 * maxDistanceToEdgeX));
        let targetY = maxDistanceToEdgeY + egdeOffsetY + (Math.random() * (window.innerHeight - 2 * maxDistanceToEdgeY));

        setTimeout(() => {
            node.style.transition = 'transform 1.2s ease-out, opacity 0.7s ease-out';
            node.style.transform = `translate(${targetX}px, ${targetY}px)`;
            node.style.left = '0';
            node.style.top = '0';
            node.classList.add('loaded');
            node.x = targetX;
            node.y = targetY;

            if (index === nodes.length - 1) {
                setTimeout(() => {
                    animationComplete = true;
                    drawLines();
                }, 1200);
            }
        }, index * 150);
    });
}

initialize();
prepareNodesForMovement();
updatePositions();
startUpAnimation();