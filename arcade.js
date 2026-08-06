const Arcade = {
    getCoins: function() {
        return parseInt(localStorage.getItem('arcade_coins')) || 0;
    },
    addCoins: function(amount) {
        let current = this.getCoins();
        let multiplier = this.getPowerup('coin_multiplier') ? 2 : 1;
        let total = current + (amount * multiplier);
        localStorage.setItem('arcade_coins', total);
        this.updateUI();
        return total;
    },
    deductCoins: function(amount) {
        let current = this.getCoins();
        if (current >= amount) {
            localStorage.setItem('arcade_coins', current - amount);
            this.updateUI();
            return true;
        }
        return false;
    },
    getInventory: function() {
        return JSON.parse(localStorage.getItem('arcade_inventory')) || [];
    },
    hasItem: function(itemId) {
        return this.getInventory().includes(itemId);
    },
    buyItem: function(itemId, price) {
        if (this.hasItem(itemId)) return true;
        if (this.deductCoins(price)) {
            let inventory = this.getInventory();
            inventory.push(itemId);
            localStorage.setItem('arcade_inventory', JSON.stringify(inventory));
            return true;
        }
        return false;
    },
    getEquippedSkin: function() {
        return localStorage.getItem('arcade_skin') || 'default';
    },
    setEquippedSkin: function(skinId) {
        localStorage.setItem('arcade_skin', skinId);
    },
    getEquippedTheme: function() {
        return localStorage.getItem('arcade_theme') || 'default';
    },
    setEquippedTheme: function(themeId) {
        localStorage.setItem('arcade_theme', themeId);
        this.applyTheme();
    },
    getPowerup: function(powerupId) {
        return localStorage.getItem('powerup_' + powerupId) === 'true';
    },
    setPowerup: function(powerupId, state) {
        localStorage.setItem('powerup_' + powerupId, state ? 'true' : 'false');
    },
    applyTheme: function() {
        const theme = this.getEquippedTheme();
        document.body.classList.remove('theme-cyberpunk', 'theme-matrix', 'theme-sunset');
        if (theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }
    },
    updateUI: function() {
        const el = document.getElementById('coin-count');
        if (el) el.innerText = this.getCoins();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Arcade.updateUI();
    Arcade.applyTheme();
});
