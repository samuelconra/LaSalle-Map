import { renderFilters } from '../ui/renderFilters.js';
import { renderSelects } from '../ui/renderSelects.js';
import { setupTargets } from './targets.js';

export function setupFilters(map) {
    const container = document.getElementById('filters-container');
    renderFilters(container);

    const activeFilters = new Set(['Administrativo', 'Recreativo', 'Jardín', 'Laboratorio', 'Tienda', 'Gimnasio', 'Cancha', 'Facultad', 'Auditorio']);

    container.querySelectorAll('.filter').forEach(button => {
        const filterName = button.getAttribute('data-filter');

        button.addEventListener("click", () => {
            button.classList.toggle("selected");

            const isActive = button.classList.contains("selected");
            if (isActive) {
                activeFilters.add(filterName);
            } else {
                activeFilters.delete(filterName);
            }

            updatePlacesLayer(map, activeFilters);

            if (['Cancha', 'Jardín'].includes(filterName)) {
                updateZonesVisibility(map, activeFilters);
            }

            if (map.getLayer('route-layer')) {
                map.removeLayer('route-layer');
            }
            if (map.getSource('route-source')) {
                map.removeSource('route-source');
            }
        });
    });
}

function updatePlacesLayer(map, filters) {
    const originalData = map._placesData;
    if (!originalData || !map.getSource('places-source')) return;

    const filtered = originalData.features.filter(f =>
        filters.size === 0 || filters.has(f.properties.type)
    );

    map.getSource('places-source').setData({
        type: 'FeatureCollection',
        features: filtered
    });

    renderSelects(filtered);
    setupTargets(map);
}

function updateZonesVisibility(map, filters) {
    const originalData = map._zonesData;
    if (!originalData || !map.getSource('zones-source')) return;

    const filtered = originalData.features.filter(f =>
        filters.size === 0 || filters.has(f.properties.type)
    );

    map.getSource('zones-source').setData({
        type: 'FeatureCollection',
        features: filtered
    });
}