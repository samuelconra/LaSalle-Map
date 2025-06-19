import { addPlacesLayer, addRoadsLayer } from './layers.js';
import { getPlaces, getRoads } from '../services/geoData.js';
import { MAPBOX_TOKEN  } from '../config.js';

// MAPBOX DEFINITION
// ----------------------------------------------------------------------------------
mapboxgl.accessToken =  MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/samuelconra/cmbmp98yt00hr01s6gjk32dn4',
    projection: 'globe',
    zoom: 16.2,
    bearing: 270,
    pitch: 60,
    center: [-101.71133, 21.151994],
    attributionControl: false
});

map.addControl(new mapboxgl.NavigationControl());

// Add Points Layer, Popups & Select Options
map.on('load', async () => {
    const places = await getPlaces();
    const roads = await getRoads();
    
    addPlacesLayer(map, places);
    addRoadsLayer(map, roads);
});


const styleListDiv = document.getElementById('map-style-list');
const styleSection = document.getElementById('map-style-section');
const styleOptions = document.querySelectorAll('#map-style-list .option');

const sectionButtons = document.querySelectorAll('#sections-selector button');
const editorSection = document.getElementById('editor-section')
const routesSection = document.getElementById('routes-section')

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
        
        switch (style) {
            case 'default':
                map.setStyle('mapbox://styles/samuelconra/cmbmp98yt00hr01s6gjk32dn4');
                break;
            case 'satellite':
                map.setStyle('mapbox://styles/mapbox/satellite-v9');
                break;
            default:
                console.log('Estilo no reconocido');
        }

        const img = option.querySelector('img');
        const buttonImg = document.querySelector('#map-style-btn img');
        if (img && buttonImg) {
            buttonImg.src = img.src;
        }

        styleListDiv.style.display = 'none';
    });
});


sectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("selected")) return;
        sectionButtons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        const section = btn.getAttribute('data-section');
        editorSection.style.display = section == 'editor' ? 'flex' : 'none'
        routesSection.style.display = section == 'routes' ? 'flex' : 'none'
    });
});