const URL = 'http://localhost:3000'

export async function getPlaces () {
    const res = await fetch(`${URL}/places`);
    return await res.json()
}

export async function getRoads () {
    const res = await fetch(`${URL}/roads`);
    return await res.json()
}

export async function getRoute(source, targets) {
    const queryParams = new URLSearchParams();
    queryParams.append('source', source);

    targets.forEach(target => {
        queryParams.append('target', target);
    });

    const res = await fetch(`${URL}/routes?${queryParams.toString()}`);
    return await res.json();
}
