export function findNearestPlace(currentLocation, features) {
    const from = turf.point(currentLocation);
    const nearest = turf.nearestPoint(from, {
        type: 'FeatureCollection',
        features: features
    });
    return nearest;
}


export function createBufferAroundPoint(point, radius = 50) {
    return turf.buffer(turf.point(point), radius, { units: 'meters' });
}

export function getZoneArea(zoneFeature) {
    const area = turf.area(zoneFeature);
    return area.toFixed(2);
}

