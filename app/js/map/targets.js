import { getRoute } from "../services/geoData.js";
import { addRouteLayer } from "./layers.js";

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

        const data = await getRoute(source, targets);
        addRouteLayer(map, data)
    })

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