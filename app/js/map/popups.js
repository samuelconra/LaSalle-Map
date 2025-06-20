export function addPlacesPopUps (map) {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    
    map.on('mouseenter', 'places-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        const id = e.features[0].properties.id;

        popup
            .setLngLat(coordinates)
            .setHTML(`<p><strong>${id}.</strong> ${name}</p>`)
            .addTo(map);
    });

    map.on('mouseleave', 'places-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}

export function addZonesPopUps (map) {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });
    
    map.on('click', 'zones-layer', (e) => {
        const name = e.features[0].properties.name;
        const id = e.features[0].properties.id;

        popup
            .setLngLat(e.lngLat)
            .setHTML(`<p><strong>${id}.</strong> ${name}</p>`)
            .addTo(map);
    });

    map.on('mouseenter', 'zones-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

    map.on('mouseleave', 'zones-layer', () => {
        map.getCanvas().style.cursor = '';
    });
}