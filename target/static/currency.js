// Currency conversion functionality
class CurrencyConverter {
    constructor() {
        this.exchangeRate = 83.5; // USD to INR (approximate)
        this.currentCurrency = 'USD';
        this.originalPrices = new Map();
        this.init();
    }

    init() {
        // Wait for cars to load before initializing
        const checkCarsLoaded = () => {
            if (window.carsData && window.carsData.length > 0) {
                this.storePrices();
                this.addCurrencyToggle();
            } else {
                setTimeout(checkCarsLoaded, 100);
            }
        };
        checkCarsLoaded();
    }

    storePrices() {
        // Store original USD prices
        window.carsData.forEach((car, index) => {
            const priceValue = this.extractPrice(car.price);
            this.originalPrices.set(`car-${index}`, priceValue);
        });
    }

    addCurrencyToggle() {
        const filterBar = document.querySelector('.filter-bar');
        if (!filterBar) return;
        
        const currencyToggle = document.createElement('select');
        currencyToggle.id = 'currencyToggle';
        currencyToggle.innerHTML = `
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
        `;
        currencyToggle.addEventListener('change', () => this.toggleCurrency());
        filterBar.appendChild(currencyToggle);
    }

    toggleCurrency() {
        const currency = document.getElementById('currencyToggle').value;
        this.currentCurrency = currency;
        
        // Update prices in car cards
        const priceElements = document.querySelectorAll('.price');
        priceElements.forEach((priceElement, index) => {
            const originalPrice = this.originalPrices.get(`car-${index}`);
            if (originalPrice) {
                if (currency === 'INR') {
                    const inrPrice = Math.round(originalPrice * this.exchangeRate);
                    priceElement.textContent = `₹${inrPrice.toLocaleString('en-IN')}`;
                } else {
                    priceElement.textContent = `$${originalPrice.toLocaleString()}`;
                }
            }
        });
        
        // Update modal price if modal is open
        this.updateModalPrice();
    }

    updateModalPrice() {
        const modalPrice = document.getElementById('modalPrice');
        if (!modalPrice || !modalPrice.textContent) return;
        
        // Find which car is currently shown in modal
        const modalTitle = document.getElementById('modalTitle').textContent;
        const carIndex = window.carsData.findIndex(car => car.name === modalTitle);
        
        if (carIndex !== -1) {
            const originalPrice = this.originalPrices.get(`car-${carIndex}`);
            if (originalPrice) {
                if (this.currentCurrency === 'INR') {
                    const inrPrice = Math.round(originalPrice * this.exchangeRate);
                    modalPrice.textContent = `₹${inrPrice.toLocaleString('en-IN')}`;
                } else {
                    modalPrice.textContent = `$${originalPrice.toLocaleString()}`;
                }
            }
        }
    }

    extractPrice(priceText) {
        return parseInt(priceText.replace(/[^\d]/g, ''));
    }
}

// Initialize currency converter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.currencyConverter = new CurrencyConverter();
});