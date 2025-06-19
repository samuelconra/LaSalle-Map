export function addPlacesLayer (map, data) {
    if (map.getSource('places-source')) return;

    data.features.forEach(f => {
        f.properties.isSource = false;
        f.properties.isTarget = false;
    } );

    map.addSource('places-source', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'places-layer',
        type: 'circle',
        source: 'places-source',
        paint: {
            'circle-color': [
                'case',
                ['==', ['get', 'isSource'], true], '#76b54a',
                ['==', ['get', 'isTarget'], true], '#e63946',
                '#4264fb'
            ],
            'circle-radius': 4,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#ffffff',
            'circle-emissive-strength': 0.7
        },
    });
}

export function addRoadsLayer (map, data) {
    if (map.getSource('roads-source')) return;

    map.addSource('roads-source', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'roads-layer',
        type: 'line',
        source: 'roads-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': 'orange',
            'line-width': 2
        }
    }, 'places-layer');
}