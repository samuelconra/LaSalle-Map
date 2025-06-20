export function addPlacesLayer (map, data) {
    if (map.getSource('places-source')) return;

    // data.features.forEach(f => {
    //     f.properties.isSource = false;
    //     f.properties.isTarget = false;
    // } );

    map.addSource('places-source', {
        type: 'geojson',
        data: data
    });

    // #4264fb
    //rgba(66, 100, 251, 0.8)
    map.addLayer({
        id: 'places-layer',
        type: 'circle',
        source: 'places-source',
        paint: {
            'circle-color': 'rgba(66, 100, 251, 0.7)',
            'circle-radius': 4,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#ffffff',
            'circle-emissive-strength': 0,
            'circle-opacity': [
                'case',
                ['==', ['get', 'type'], 'Jardín'], 0,
                ['==', ['get', 'type'], 'Cancha'], 0,
                1
            ],
            'circle-stroke-opacity': [
                'case',
                ['==', ['get', 'type'], 'Jardín'], 0,
                ['==', ['get', 'type'], 'Cancha'], 0,
                1
            ]
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

export function addZonesLayer (map, data) {
    if (map.getSource('zones-source')) return;

    map.addSource('zones-source', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'zones-layer',
        type: 'fill',
        source: 'zones-source',
        paint: {
            'fill-color': [
                'case',
                ['==', ['get', 'name'], 'Cancha de Basquetbol'], '#6e84c6',
                ['==', ['get', 'name'], 'Cancha de Volleyball'], '#6e84c6',
                ['==', ['get', 'type'], 'Cancha'], '#223824',
                ['==', ['get', 'type'], 'Jardín'], '#83916d',
                '#b2ffa5'
            ],
            'fill-opacity': 0.6,
            'fill-emissive-strength': 0.5,
        },
    }, 'places-layer');
}

export function addRouteLayer (map, data) {
    if (map.getLayer('route-layer')) {
        map.removeLayer('route-layer');
        map.removeSource('route-source');
    }

    map.addSource('route-source', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route-source',
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