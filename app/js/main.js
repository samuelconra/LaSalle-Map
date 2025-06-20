import { initMap } from './map/initMap.js';
import { setupMapStyleSwitcher } from './map/mapStyles.js';
import { setupFilters } from './map/filters.js';
import { setupSectionButtons } from './ui/sections.js'

document.addEventListener('DOMContentLoaded', async () => {
    const map = await initMap();
    setupFilters(map);
    setupSectionButtons();
    setupMapStyleSwitcher(map);
});