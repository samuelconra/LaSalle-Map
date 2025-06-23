export function addPlacesPopUps (map) {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    
    map.on('mouseenter', 'places-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const name = e.features[0].properties.name;
        const type = e.features[0].properties.type;
        const description = e.features[0].properties.description;
        const coordinates = e.features[0].geometry.coordinates.slice();
        let popupHTML = '';

        if (type == 'Facultad') {
            const building = e.features[0].properties.building;
            const floors = e.features[0].properties.floors;
            const classrooms = e.features[0].properties.classrooms;
            const careers = e.features[0].properties.careers;
            const careersArray = Array.isArray(careers) ? careers : JSON.parse(careers);
            const careersList = careersArray?.join(' ') || 'Carreras no especificadas';

            popupHTML = `
                <div class="facultad-popup">
                    <div class="content">
                        <h4>${name}</h4>
                        
                        <p class="popup-type ${type}">${type}</p>

                        <div class="info">
                            <div class="careers">
                                ${
                                    careersArray.map(career => `<p>${career}</p>`).join('')
                                }
                            </div>
                            <div class="extra">
                                <strong>Características:</strong>
                                <p>${classrooms} salones, ${floors} pisos</p>
                            </div>
                        </div>

                        <div class="building">
                            <i class="fa-solid fa-building"></i>
                            <p>${building}</p>
                        </div>
                    </div>
                </div>
            `
        } else {
            popupHTML = `
                <div class="other-popup">
                    <div class="content">
                        <h4>${name}</h4>
                        
                        <p class="popup-type ${type}">${type}</p>
                        
                        <p class="description">${description}</p>
                </div>
            `
        }

        popup
            .setLngLat(coordinates)
            .setHTML(popupHTML)
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
        const type = e.features[0].properties.type;
        const description = e.features[0].properties.description;

        const popupHTML = `
                <div class="other-popup">
                    <div class="content">
                        <h4>${name}</h4>
                        
                        <p class="popup-type ${type}">${type}</p>
                        
                        <p class="description">${description}</p>
                </div>
            `

        popup
            .setLngLat(e.lngLat)
            .setHTML(popupHTML)
            .addTo(map);
    });

    map.on('mouseenter', 'zones-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

    map.on('mouseleave', 'zones-layer', () => {
        map.getCanvas().style.cursor = '';
    });
}