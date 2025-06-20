import { createBufferAroundPoint } from './turfFunctions.js';

let currentBuffer = null;

export function drawBuffer(map, coordinates) {
    const buffer = createBufferAroundPoint(coordinates, 50);

    if (map.getLayer('buffer-layer')) {
        map.removeLayer('buffer-layer');
        map.removeSource('buffer-source');
    }

    map.addSource('buffer-source', {
        type: 'geojson',
        data: buffer
    });

    map.addLayer({
        id: 'buffer-layer',
        type: 'fill',
        source: 'buffer-source',
        paint: {
            'fill-color': '#fff',
            'fill-opacity': 0.7
        }
    });

    currentBuffer = buffer;
}
