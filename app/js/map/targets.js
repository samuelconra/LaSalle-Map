import { getRoute } from "../services/geoData.js";
import { drawBuffer } from "../turf/buffer.js";
import { findNearestPlace, getZoneArea } from "../turf/turfFunctions.js";
import { addRouteLayer, highlightNearestPlace } from "./layers.js";

let onClickRouteBtn;
let routeListenerAttached = false;

export function setupTargets(map) {
    const container = document.getElementById('targets-container');
    const getRoutesBtn = document.getElementById('getRoutesBtn');

    // Usar un Set persistente en el mapa
    if (!map._targets) map._targets = new Set();

    // Limpiar el set antes de generar nuevos botones
    map._targets.clear();

    container.querySelectorAll('.target').forEach(button => {
        const placeID = button.getAttribute('data-id');

        button.addEventListener('click', () => {
            button.classList.toggle("selected");

            const isActive = button.classList.contains("selected");
            if (isActive) {
                map._targets.add(placeID);
            } else {
                map._targets.delete(placeID);
            }
        });
    });

    // Asegurar una única instancia de la función con referencia al Set de map._targets
    if (!onClickRouteBtn) {
        onClickRouteBtn = async function () {
            const source = document.getElementById('source-select').value;

            if (source === '-1') {
                alert('Selecciona un origen.');
                return;
            }
            if (map._targets.size === 0) {
                alert('Selecciona al menos un destino.');
                return;
            }

            const data = await getRoute(source, map._targets);
            addRouteLayer(map, data);
        };
    }

    if (!routeListenerAttached) {
        getRoutesBtn.addEventListener('click', onClickRouteBtn);
        routeListenerAttached = true;
    } else {
        return;
    }

    // Otros listeners que deben añadirse solo una vez
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

        drawBuffer(map, sourceFeature.geometry.coordinates);
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
        alert(area);
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

        const nearest = findNearestPlace(sourceFeature.geometry.coordinates, otherFeatures);
        highlightNearestPlace(map, nearest);
    });
}
