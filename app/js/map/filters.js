import { renderFilters } from '../ui/renderFilters.js';

export function setupFilters(map) {
    const container = document.getElementById('filters-container');
    renderFilters(container);

    const activeFilters = new Set(['Entrada', 'Edificio', 'Cancha', 'Jardín', 'Tienda', 'Auditorio', 'Gimnasio']);

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

            // También actualizar zonas si corresponde
            if (['Cancha', 'Jardín'].includes(filterName)) {
                updateZonesVisibility(map, filterName, isActive);
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
}

function updateZonesVisibility(map, type, isVisible) {
    if (!map.getLayer('zones-layer')) return;

    const currentFilter = map.getFilter('zones-layer') || ['any'];

    const newFilter = ['any', ...(
        currentFilter.slice(1).filter(f =>
            !(Array.isArray(f) && f[0] === '==' && f[2] === type)
        )
    )];

    if (isVisible) {
        newFilter.push(['==', ['get', 'type'], type]);
    }

    map.setFilter('zones-layer', newFilter);
}