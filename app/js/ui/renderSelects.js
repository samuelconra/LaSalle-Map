export function renderSelects (places) {
    const sourceSelect = document.getElementById('source-select');
    const targetsContainer = document.getElementById('targets-container');

    let optionsHTML = '<option value="-1">¿Dónde estás?</option>';

    optionsHTML += places.map(feature => {
        const id = feature.properties.id;
        const name = feature.properties.name;

        return `
            <option value="${id}">
                ${name}
            </option>
        `;
    }).join('');

    sourceSelect.innerHTML = optionsHTML;
    
    sourceSelect.addEventListener('change', () => {
        const value = sourceSelect.value;

        const features = window.map._placesData.features;
        features.forEach(f => {
            f.properties.isSource = String(f.properties.id) === value;
        });

        window.map.getSource('places-source').setData(window.map._placesData);
    });


    targetsContainer.innerHTML = places.map(feature => {
        const name = feature.properties.name;
        const type = feature.properties.type;
        const id = feature.properties.id;

        return `
            <button class="target" data-id="${id}">
                <h4>${name}</h4>
                <p>${type}</p>
            </button>
        `;
    }).join('');
}
