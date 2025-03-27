// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Characters for matrix effect
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>/?~';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

// Array to track the y position of each column
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -100;
}

// Draw the matrix rain
function drawMatrix() {
  // Semi-transparent black to create fade effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'; // Ajustando a opacidade do efeito Matrix
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Green text
  ctx.fillStyle = '#0F0';
  ctx.font = `${fontSize}px monospace`;

  // Draw characters
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const char = chars[Math.floor(Math.random() * chars.length)];
    
    // x coordinate of the drop
    const x = i * fontSize;
    // y coordinate of the drop
    const y = drops[i] * fontSize;
    
    // Draw the character
    ctx.fillText(char, x, y);
    
    // Move the drop down
    drops[i]++;
    
    // Randomly reset a drop to the top
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }
}

// Meteor effect
const meteors = [];

function createMeteor() {
  if (Math.random() > 0.97) {
    meteors.push({
      x: Math.random() * canvas.width,
      y: 0,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 5 + 3,
      tail: []
    });
  }
}

function drawMeteors() {
  for (let i = 0; i < meteors.length; i++) {
    const meteor = meteors[i];
    
    // Store current position in tail
    meteor.tail.push({x: meteor.x, y: meteor.y});
    
    // Limit tail length
    if (meteor.tail.length > 20) {
      meteor.tail.shift();
    }
    
    // Draw tail
    for (let j = 0; j < meteor.tail.length; j++) {
      const alpha = j / meteor.tail.length;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(meteor.tail[j].x, meteor.tail[j].y, meteor.size * (j / meteor.tail.length), 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Move meteor
    meteor.x += meteor.speed;
    meteor.y += meteor.speed;
    
    // Remove meteor if it goes off screen
    if (meteor.x > canvas.width || meteor.y > canvas.height) {
      meteors.splice(i, 1);
      i--;
    }
  }
}

// Animation loop
function animate() {
  drawMatrix();
  createMeteor();
  drawMeteors();
  requestAnimationFrame(animate);
}

animate();