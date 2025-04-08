document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.display === 'block';

        // Hide all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');

        // Toggle current answer
        answer.style.display = isVisible ? 'none' : 'block';
    });
});

    // Network waves effect
    const canvas = document.getElementById('network-waves');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 100;
    const cursor = { x: null, y: null };

    // Resize canvas
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track mouse movement
    window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
    });

    // Create particles
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Attraction to cursor
            if (cursor.x && cursor.y) {
                const dx = cursor.x - this.x;
                const dy = cursor.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150; // Strength of attraction
                    this.vx += force * (dx / distance) * 0.1;
                    this.vy += force * (dy / distance) * 0.1;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();
        }
    }

    // Initialize particles
    const initParticles = () => {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    };
    initParticles();

    // Draw connections between particles
    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
                    ctx.stroke();
                }
            }
        }
    };

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    };

    animate();

    
    // Update date and time every second
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        document.getElementById('datetime').textContent = dateTimeString;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Weather using user's location
    const apiKey = '07bf5d50456b5181632845cd6b13ad91'; // Replace with your OpenWeatherMap API key
    const weatherEl = document.getElementById('weather');

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        const temp = data.main.temp.toFixed(1);
                        const desc = data.weather[0].description;
                        const icon = data.weather[0].icon;
                        const location = data.name;
                        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                        weatherEl.innerHTML = `
                            <div class="flex items-center gap-2">
                                <img src="${iconUrl}" alt="${desc}" class="w-8 h-8">
                                <span>${location}: ${temp}°C, ${desc}</span>
                            </div>
                        `;
                    })
                    .catch(error => {
                        console.error('Weather fetch error:', error);
                        weatherEl.textContent = 'Weather unavailable';
                    });
            },
            error => {
                console.error('Geolocation error:', error);
                weatherEl.textContent = 'Location not allowed';
            }
        );
    } else {
        weatherEl.textContent = 'Geolocation not supported';
    }

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const seeMoreButton = document.getElementById("see-more");

        seeMoreButton.addEventListener("click", function() {
            const hiddenItems = document.querySelectorAll('.text-center.hidden');
            
            // Toggle visibility
            hiddenItems.forEach(item => item.classList.toggle('hidden'));
            
            // Change button text based on current state
            if (seeMoreButton.textContent === "See More") {
                seeMoreButton.textContent = "See Less";
            } else {
                seeMoreButton.textContent = "See More";
            }
        });
