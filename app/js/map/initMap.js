import { MAPBOX_TOKEN } from '../../config.js';
import { getPlaces, getRoads, getZones } from '../services/geoData.js';
import { renderSelects } from '../ui/renderSelects.js';
import { addPlacesLayer, addRoadsLayer, addZonesLayer } from './layers.js';
import { addPlacesPopUps, addZonesPopUps } from './popups.js';
import { setupTargets } from './targets.js';

export async function initMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;

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

    map.on('load', async () => {
        const places = await getPlaces();
        const roads = await getRoads();
        const zones = await getZones();

        map._placesData = places;
        map._zonesData = zones;
        
        addPlacesLayer(map, places);
        addPlacesPopUps(map);

        // addRoadsLayer(map, roads);
        addZonesLayer(map, zones);
        addZonesPopUps(map);

        renderSelects(places.features);
        setupTargets(map);

        map.setPaintProperty('buildings-lasalle', 'fill-extrusion-opacity', 0.9);
    });

    return map;
}