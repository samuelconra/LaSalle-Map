import { addPlacesLayer } from './layers.js';

export function setupMapStyleSwitcher(map) {
    const styleListDiv = document.getElementById('map-style-list');
    const styleSection = document.getElementById('map-style-section');
    const styleOptions = document.querySelectorAll('#map-style-list .option');

    let styleTimeout;

    function showList() {
        clearTimeout(styleTimeout);
        styleListDiv.style.display = 'flex';
    }

    function hideList() {
        styleTimeout = setTimeout(() => {
            styleListDiv.style.display = 'none';
        }, 1000);
    }

    styleSection.addEventListener('mouseenter', showList);
    styleSection.addEventListener('mouseleave', hideList);

    styleOptions.forEach(option => {
        option.addEventListener('click', () => {
            const style = option.getAttribute('data-style');
            const styleUrls = {
                default: 'mapbox://styles/samuelconra/cmbmp98yt00hr01s6gjk32dn4',
                satellite: 'mapbox://styles/mapbox/satellite-v9'
            };

            const newStyle = styleUrls[style] || styleUrls.default;

            map.once('style.load', () => {
                addPlacesLayer(map, map._placesData);
            });

            map.setStyle(newStyle);

            const img = option.querySelector('img');
            const buttonImg = document.querySelector('#map-style-btn img');
            if (img && buttonImg) buttonImg.src = img.src;

            styleListDiv.style.display = 'none';
        });
    });
}