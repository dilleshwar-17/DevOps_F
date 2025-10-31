// Car data - will be loaded from XML
window.carsData = [];

// Car images mapping
const carImages = {
    "Rolls Royce Phantom": "https://images7.alphacoders.com/108/1083815.jpg",
    "Bentley Continental GT": "https://images3.alphacoders.com/103/1034491.jpg",
    "Ferrari SF90 Stradale": "https://www.supercars.net/blog/wp-content/uploads/2020/07/2020-Ferrari-SF90-Stradale-014-1600.jpg",
    "Lamborghini Aventador SVJ": "https://m.media-amazon.com/images/I/91CJ-iJedIL._AC_UF894%2C1000_QL80_.jpg",
    "McLaren 765LT": "https://images.unsplash.com/photo-1652449661780-f25fc1cce90a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWNsYXJlbiUyMDc2NWx0fGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
    "Porsche 911 GT3 RS": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2022/Products/911-GT3-RS-Premiere/_BKOS6959_edit_V02_highres.jpeg/jcr%3Acontent/_BKOS6959_edit_V02_highres.jpeg",
    "Aston Martin DBS Superleggera": "https://www.supercars.net/blog/wp-content/uploads/2020/10/2019-Aston-Martin-DBS-Superleggera-001-2000-scaled.jpg",
    "Mercedes-AMG GT Black Series": "https://gtspirit.com/wp-content/uploads/2020/07/Mercedes-AMG-GT-Black-Series7-1068x712.jpg",
    "BMW M8 Competition Coupe": "https://images.unsplash.com/photo-1667328609102-e51a715bfa53?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIwbTh8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "Audi R8 V10 Performance": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVkaSUyMHI4fGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
    "Maserati MC20": "https://images.openai.com/static-rsc-1/dwYaXP2-i8ZgsNdmoTvebyA7uqa_YTCOFrb13g0ZACI6vhjVngUmw_BFcKJn2wq-_hW-Pd4Tfzt3otIMyBSL14vG1VBEgAdGpDVyUIOPDA9ubhSJXCc9w44iIrhKc7_vhP53Viidmzegz8AfMunqrA",
    "Jaguar F-Type SVR": "https://media.production.jlrms.com/alf/images/2019-06/1eace3f5-6187-4840-9f0d-82ce6a7e932f/JagFTYPESVRCoupeLocation17021611.jpg?VersionId=8cVlwSioZHGk8Ba_CauxncFl9I_9jKmv",
    "Lexus LFA": "https://mag.lexus.co.uk/wp-content/uploads/sites/3/2020/12/LexusLFA.145967.jpg",
    "Koenigsegg Regera": "https://s.yimg.com/ny/api/res/1.2/M9Eyfva.HOAvoThCtkCgbg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https%3A//media.zenfs.com/en/robb_report_967/bd35b6fd261c7a179d19d75d36016362",
    "Bugatti Chiron": "https://bugatti.imgix.net/677aa8b9531541bbada7c4e0/chiron-sport-og.jpg",
    "Pagani Huayra BC": "https://www.supercars.net/blog/wp-content/uploads/2016/12/Pagani-Huayra-BC.jpg",
    "Tesla Model S Plaid": "https://www.edmunds.com/assets/m/tesla/model-s/2021/oem/2021_tesla_model-s_sedan_plaid_fq_oem_1_600.jpg",
    "Rimac Nevera": "https://web-cdn.rimac-automobili.com/wp-content/uploads/2021/05/31101405/intro_slider_07_optimised.jpg",
    "Lotus Evija": "https://i.pinimg.com/736x/4f/dc/a2/4fdca287bf1eb818276efb7f75beff1d.jpg",
    "Gordon Murray T.50": "https://www.supercars.net/blog/wp-content/uploads/2020/09/2022-Gordon-Murray-T.50-001-2160-scaled.jpg"
};

// Fallback car data
const fallbackCars = [
    { name: "Rolls Royce Phantom", price: 460000, engine: "6.75L V12", horsepower: 563, acceleration: 5.1, drivetrain: "AWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "The pinnacle of luxury motoring with hand-crafted excellence and unparalleled comfort." },
    { name: "Bentley Continental GT", price: 230000, engine: "6.0L W12", horsepower: 626, acceleration: 3.6, drivetrain: "AWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "British luxury meets performance in this grand tourer with exquisite craftsmanship." },
    { name: "Ferrari SF90 Stradale", price: 625000, engine: "4.0L V8 Hybrid", horsepower: 986, acceleration: 2.5, drivetrain: "AWD", fuelType: "Hybrid", transmission: "8-Speed Automatic", description: "Ferrari's most powerful production car with revolutionary hybrid technology." },
    { name: "Lamborghini Aventador SVJ", price: 573000, engine: "6.5L V12", horsepower: 759, acceleration: 2.8, drivetrain: "AWD", fuelType: "Gasoline", transmission: "7-Speed Automatic", description: "The ultimate expression of Lamborghini's naturally aspirated V12 legacy." },
    { name: "McLaren 765LT", price: 382500, engine: "4.0L V8 Twin-Turbo", horsepower: 754, acceleration: 2.7, drivetrain: "RWD", fuelType: "Gasoline", transmission: "7-Speed Automatic", description: "Track-focused supercar with Formula 1 derived aerodynamics and technology." },
    { name: "Porsche 911 GT3 RS", price: 223800, engine: "4.0L Flat-6", horsepower: 518, acceleration: 3.2, drivetrain: "RWD", fuelType: "Gasoline", transmission: "7-Speed PDK", description: "The most track-focused 911 with motorsport-derived engineering excellence." },
    { name: "Aston Martin DBS Superleggera", price: 316300, engine: "5.2L V12 Twin-Turbo", horsepower: 715, acceleration: 3.4, drivetrain: "RWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "British grand tourer combining brutal performance with elegant sophistication." },
    { name: "Mercedes-AMG GT Black Series", price: 335000, engine: "4.0L V8 Twin-Turbo", horsepower: 720, acceleration: 3.2, drivetrain: "RWD", fuelType: "Gasoline", transmission: "7-Speed Automatic", description: "The most powerful AMG GT with race-bred technology and aerodynamics." },
    { name: "BMW M8 Competition Coupe", price: 135000, engine: "4.4L V8 Twin-Turbo", horsepower: 617, acceleration: 3.2, drivetrain: "AWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "Bavarian precision engineering with track-focused performance and luxury." },
    { name: "Audi R8 V10 Performance", price: 208100, engine: "5.2L V10", horsepower: 602, acceleration: 3.2, drivetrain: "AWD", fuelType: "Gasoline", transmission: "7-Speed Automatic", description: "German supercar with naturally aspirated V10 and Quattro all-wheel drive." },
    { name: "Maserati MC20", price: 210000, engine: "3.0L V6 Twin-Turbo", horsepower: 621, acceleration: 2.9, drivetrain: "RWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "Italian supercar marking Maserati's return to racing heritage and innovation." },
    { name: "Jaguar F-Type SVR", price: 125000, engine: "5.0L V8 Supercharged", horsepower: 575, acceleration: 3.5, drivetrain: "AWD", fuelType: "Gasoline", transmission: "8-Speed Automatic", description: "British sports car with distinctive design and thunderous supercharged V8." },
    { name: "Lexus LFA", price: 375000, engine: "4.8L V10", horsepower: 552, acceleration: 3.6, drivetrain: "RWD", fuelType: "Gasoline", transmission: "6-Speed Sequential", description: "Limited production Japanese supercar with carbon fiber construction and F1 sound." },
    { name: "Koenigsegg Regera", price: 1900000, engine: "5.0L V8 Hybrid", horsepower: 1500, acceleration: 2.8, drivetrain: "RWD", fuelType: "Hybrid", transmission: "Direct Drive", description: "Swedish hypercar with revolutionary direct-drive hybrid powertrain technology." },
    { name: "Bugatti Chiron", price: 3000000, engine: "8.0L W16 Quad-Turbo", horsepower: 1479, acceleration: 2.4, drivetrain: "AWD", fuelType: "Gasoline", transmission: "7-Speed Automatic", description: "The ultimate expression of automotive luxury and performance engineering." },
    { name: "Pagani Huayra BC", price: 2800000, engine: "6.0L V12 Twin-Turbo", horsepower: 789, acceleration: 2.8, drivetrain: "RWD", fuelType: "Gasoline", transmission: "7-Speed Sequential", description: "Italian hypercar combining art, science, and extreme aerodynamic performance." },
    { name: "Tesla Model S Plaid", price: 130000, engine: "Electric Motors", horsepower: 1020, acceleration: 1.9, drivetrain: "AWD", fuelType: "Electric", transmission: "Single-Speed", description: "Electric luxury sedan with record-breaking acceleration and cutting-edge technology." },
    { name: "Rimac Nevera", price: 2400000, engine: "Electric Motors", horsepower: 1914, acceleration: 1.85, drivetrain: "AWD", fuelType: "Electric", transmission: "Single-Speed", description: "Croatian electric hypercar setting new standards for electric performance." },
    { name: "Lotus Evija", price: 2100000, engine: "Electric Motors", horsepower: 1972, acceleration: 2.9, drivetrain: "AWD", fuelType: "Electric", transmission: "Single-Speed", description: "British electric hypercar with revolutionary aerodynamics and lightweight construction." },
    { name: "Gordon Murray T.50", price: 2500000, engine: "3.9L V12", horsepower: 654, acceleration: 3.4, drivetrain: "RWD", fuelType: "Gasoline", transmission: "6-Speed Manual", description: "The spiritual successor to the McLaren F1 with pure driving experience focus." }
];

// Load cars from XML or use fallback
async function loadCarsFromXML() {
    try {
        const response = await fetch('cars-data.xml');
        if (!response.ok) throw new Error('XML not found');
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const cars = xmlDoc.querySelectorAll('car');
        if (cars.length === 0) throw new Error('No cars in XML');
        
        window.carsData = Array.from(cars).map(car => {
            const name = car.querySelector('name').textContent;
            const price = parseInt(car.querySelector('price').textContent);
            return {
                name: name,
                price: `$${price.toLocaleString()}`,
                image: carImages[name] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
                engine: car.querySelector('engine').textContent,
                horsepower: car.querySelector('horsepower').textContent + " HP",
                acceleration: "0-60 mph in " + car.querySelector('acceleration').textContent + "s",
                drivetrain: car.querySelector('drivetrain').textContent,
                fuelType: car.querySelector('fuelType').textContent,
                transmission: car.querySelector('transmission').textContent,
                description: car.querySelector('description').textContent
            };
        });
    } catch (error) {
        console.log('Using fallback car data:', error.message);
        // Use fallback data
        window.carsData = fallbackCars.map(car => ({
            name: car.name,
            price: `$${car.price.toLocaleString()}`,
            image: carImages[car.name] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
            engine: car.engine,
            horsepower: car.horsepower + " HP",
            acceleration: "0-60 mph in " + car.acceleration + "s",
            drivetrain: car.drivetrain,
            fuelType: car.fuelType,
            transmission: car.transmission,
            description: car.description
        }));
    }
    
    renderCars();
}

// Render cars in the grid
function renderCars() {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';
    
    window.carsData.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-car', index);
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=250&fit=crop'">
            <h3>${car.name}</h3>
            <p class="price">${car.price}</p>
            <button class="buy-btn">View Details</button>
        `;
        carsGrid.appendChild(carCard);
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-btn').forEach((button) => {
        button.addEventListener('click', function() {
            const carIndex = this.parentElement.getAttribute('data-car');
            showCarModal(carIndex);
        });
    });
    
    // Add search and filter functionality
    addSearchAndFilter();
}

// Search and filter functionality
function addSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const priceFilter = document.getElementById('priceFilter');
    
    function filterCars() {
        const searchTerm = searchInput.value.toLowerCase();
        const priceRange = priceFilter.value;
        const carCards = document.querySelectorAll('.car-card');
        
        carCards.forEach((card) => {
            const carIndex = parseInt(card.getAttribute('data-car'));
            const car = window.carsData[carIndex];
            const price = parseInt(car.price.replace(/[^\d]/g, ''));
            const matchesSearch = car.name.toLowerCase().includes(searchTerm);

            let matchesPrice = true;
            if (priceRange === 'low') matchesPrice = price < 100000;
            else if (priceRange === 'medium') matchesPrice = price >= 100000 && price <= 200000;
            else if (priceRange === 'high') matchesPrice = price > 200000;

            card.style.display = matchesSearch && matchesPrice ? 'block' : 'none';
        });
    }
    
    if (searchInput) searchInput.addEventListener('input', filterCars);
    if (priceFilter) priceFilter.addEventListener('change', filterCars);
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CTA button
document.querySelector('.cta-btn').addEventListener('click', function() {
    document.querySelector('#cars').scrollIntoView({
        behavior: 'smooth'
    });
});

// Modal functionality
const modal = document.getElementById('carModal');
const closeBtn = document.querySelector('.close');

function showCarModal(carIndex) {
    const car = window.carsData[carIndex];
    
    document.getElementById('modalTitle').textContent = car.name;
    document.getElementById('modalPrice').textContent = car.price;
    document.getElementById('modalEngine').textContent = car.engine;
    document.getElementById('modalHorsepower').textContent = car.horsepower;
    document.getElementById('modalAcceleration').textContent = car.acceleration;
    document.getElementById('modalDrivetrain').textContent = car.drivetrain;
    document.getElementById('modalFuelType').textContent = car.fuelType;
    document.getElementById('modalTransmission').textContent = car.transmission;
    document.getElementById('modalDesc').textContent = car.description;
    
    modal.style.display = 'block';
    
    // Update currency if converter is available
    if (window.currencyConverter) {
        window.currencyConverter.updateModalPrice();
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.background = '#1a1a1a';
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadCarsFromXML();
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}