import { getRoute } from "../services/geoData.js";
import { drawBuffer } from "../turf/buffer.js";
import { findNearestPlace, getZoneArea } from "../turf/turfFunctions.js";
import { addRouteLayer, highlightNearestPlace } from "./layers.js";

export function setupTargets(map) {
    const container = document.getElementById('targets-container');
    const getRoutesBtn = document.getElementById('getRoutesBtn');

    const targets = new Set();

    container.querySelectorAll('.target').forEach(button => {
        const placeID = button.getAttribute('data-id');

        button.addEventListener('click', () => {
            button.classList.toggle("selected");

            const isActive = button.classList.contains("selected");
            if (isActive) {
                targets.add(placeID);
            } else {
                targets.delete(placeID);
            }
        });
    });

    getRoutesBtn.addEventListener('click', async () => {
        const source = document.getElementById('source-select').value;

        if (source === '-1'){
            alert('Selecciona un origen.')
            return;
        } else if (targets.size === 0) {
            alert('Selecciona al menos un destino.');
            return;
        }

        const data = await getRoute(source, targets);
        addRouteLayer(map, data)
    })

    const bufferBtn = document.getElementById('buffer-btn');
    bufferBtn.addEventListener('click', () => {
        const sourceSelect = document.getElementById('source-select');
        const selectedValue = sourceSelect.value;

        if (selectedValue === '-1') {
            alert('Selecciona un punto de origen.');
            return;
        }

        const sourceFeature = map._placesData.features[selectedValue - 1];

        if (!sourceFeature) {
            alert('No se encontró el punto seleccionado.');
            return;
        }

        const coordinates = sourceFeature.geometry.coordinates;
        drawBuffer(map, coordinates);
    });


    let isSelectingZone = false;
    document.getElementById('area-btn').addEventListener('click', () => {
        alert('Haz clic en una zona del mapa para calcular su área.');
        isSelectingZone = true;
    });

    map.on('click', 'zones-layer', (e) => {
        if (!isSelectingZone) return;

        const zoneFeature = e.features[0];
        const area = getZoneArea(zoneFeature);
        alert(area)
        isSelectingZone = false;
    });





    document.getElementById('nearest-btn').addEventListener('click', () => {
        const sourceSelect = document.getElementById('source-select');
        const selectedValue = sourceSelect.value;

        if (selectedValue === '-1') {
            alert('Por favor selecciona un punto de origen.');
            return;
        }

        const sourceFeature = map._placesData.features[selectedValue - 1];

        if (!sourceFeature) {
            alert('No se encontró el punto seleccionado.');
            return;
        }

        const otherFeatures = map._placesData.features.filter(f =>
            String(f.properties.id) !== String(selectedValue)
        );

        console.log(otherFeatures)

        const nearest = findNearestPlace(
            sourceFeature.geometry.coordinates,
            otherFeatures
        );

        highlightNearestPlace(map, nearest);
    });
}

// async function calcRoute () {
//     const source = sourceSelect.value;
//     const target = targetSelect.value;

//     if (source === target){
//         alert('Ya estás en ese sitio.');
//         return;
//     } else if (source === "0" || target === "0") {
//         alert('Elige un lugar disponible');
//         return;
//     }

//     const data = await getRoute(source, targets);

//     addRouteLayer(map, data);
//     addRoutePopUp(map);
// }