export function setupSectionButtons() {
    const sectionButtons = document.querySelectorAll('#sections-selector button');
    const editorSection = document.getElementById('editor-section');
    const routesSection = document.getElementById('routes-section');

    sectionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("selected")) return;

            sectionButtons.forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");

            const section = btn.getAttribute('data-section');
            editorSection.style.display = section === 'editor' ? 'flex' : 'none';
            routesSection.style.display = section === 'routes' ? 'flex' : 'none';
        });
    });
}