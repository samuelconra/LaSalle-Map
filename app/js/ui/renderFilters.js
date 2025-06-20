export function renderFilters(container) {
    const filters = [
        { id: 'Entrada', label: 'Entradas' },
        { id: 'Gimnasio', label: 'Gimnasios' },
        { id: 'Edificio', label: 'Edificios' },
        { id: 'Cancha', label: 'Canchas' },
        { id: 'Jardín', label: 'Jardines' },
        { id: 'Tienda', label: 'Tiendas' },
        { id: 'Auditorio', label: 'Auditorios' },
    ];

    container.innerHTML = filters.map(filter => `
        <button class="filter selected" data-filter="${filter.id}">
            <div class="filter-circle"><i class="fa-solid fa-check"></i></div>
            <p>${filter.label}</p>
        </button>
    `).join('');
}
