// FAQ toggle
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

// Animation loop (assuming ctx and particles are defined)
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
const apiKey = '07bf5d50456b5181632845cd6b13ad91';
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

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// See More toggle
const seeMoreButton = document.getElementById("see-more");
seeMoreButton.addEventListener("click", () => {
    const hiddenItems = document.querySelectorAll('.text-center.hidden');
    hiddenItems.forEach(item => item.classList.toggle('hidden'));
    seeMoreButton.textContent = seeMoreButton.textContent === "See More" ? "See Less" : "See More";
});

// Highlight current mobile page
const currentMobilePage = location.pathname.split("/").pop(); // e.g., 'index.html'
document.querySelectorAll("#mobile-menu .mobile-link").forEach(link => {
    if (link.getAttribute("href") === currentMobilePage) {
        link.classList.remove("text-blue-700");
        link.classList.add("bg-blue-700", "text-white", "rounded-lg");
    }
});

// Dynamic footer year
const startYear = 2023;
const currentYear = new Date().getFullYear();
document.getElementById("footer-text").innerHTML = `&copy; ${startYear} - ${currentYear} TechGuard IT Solutions. All Rights Reserved.`;

// Highlight current desktop menu page
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll("ul li a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.remove("bg-blue-700", "text-white");
        link.classList.add("bg-white", "text-blue-700", "border", "border-blue-700");
    }
});
