// ================================
// FAQ Toggle
// ================================
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

// ================================
// Animation Loop (if canvas & particles exist)
// ================================
if (typeof ctx !== "undefined" && typeof particles !== "undefined") {
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        if (typeof drawConnections === "function") drawConnections();
        requestAnimationFrame(animate);
    };
    animate();
}

// ================================
// Date & Time Update
// ================================
function updateDateTime() {
    const dateTimeEl = document.getElementById('datetime');
    if (!dateTimeEl) return;

    const now = new Date();
    const dateTimeString = now.toLocaleString();
    dateTimeEl.textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ================================
// Weather using user's location
// ================================
const weatherEl = document.getElementById('weather');
const apiKey = '07bf5d50456b5181632845cd6b13ad91';

if (weatherEl && 'geolocation' in navigator) {
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
} else if (weatherEl) {
    weatherEl.textContent = 'Geolocation not supported';
}

// ================================
// Mobile Menu Toggle
// ================================
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ================================
// See More Toggle
// ================================
const seeMoreButton = document.getElementById("see-more");
if (seeMoreButton) {
    seeMoreButton.addEventListener("click", () => {
        const hiddenItems = document.querySelectorAll('.text-center.hidden');
        hiddenItems.forEach(item => item.classList.toggle('hidden'));
        seeMoreButton.textContent = seeMoreButton.textContent === "See More" ? "See Less" : "See More";
    });
}

// ================================
// Highlight Current Page
// ================================
const currentPage = location.pathname.split("/").pop();

// Desktop menu links
document.querySelectorAll("ul li a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.remove("bg-blue-700", "text-white");
        link.classList.add("bg-white", "text-blue-700", "border", "border-blue-700");
    }
});

// Mobile menu links
document.querySelectorAll("#mobile-menu .mobile-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.remove("text-blue-700");
        link.classList.add("bg-blue-700", "text-white", "rounded-lg");
    }
});
