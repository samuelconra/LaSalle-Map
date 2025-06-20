export function renderFilters(container) {
    const filters = [
        { id: 'Entrada', label: 'Entradas' },
        { id: 'Administrativo', label: 'Administrativos' },
        { id: 'Recreativo', label: 'Recreativos' },
        { id: 'Jardín', label: 'Jardines' },
        { id: 'Laboratorio', label: 'Laboratorios' },
        { id: 'Tienda', label: 'Tiendas' },
        { id: 'Gimnasio', label: 'Gimnasios' },
        { id: 'Cancha', label: 'Canchas' },
        { id: 'Facultad', label: 'Facultades' },
        { id: 'Auditorio', label: 'Auditorios' },
    ];

    container.innerHTML = filters.map(filter => `
        <button class="filter selected" data-filter="${filter.id}">
            <div class="filter-circle"><i class="fa-solid fa-check"></i></div>
            <p>${filter.label}</p>
        </button>
    `).join('');
}
