document.addEventListener('DOMContentLoaded', () => {
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    const allTemplates = document.querySelectorAll('.cv-template');
    const allPanels = document.querySelectorAll('.editor-panel');
  
    // Скрыть всё
    allTemplates.forEach(t => t.style.display = 'none');
    allPanels.forEach(p => p.style.display = 'none');
  
    if (selectedTemplate) {
      const templateEl = document.getElementById(selectedTemplate);
      const panelEl = document.getElementById(`panel-${selectedTemplate}`);
  
      if (templateEl) templateEl.style.display = 'block';
      if (panelEl) panelEl.style.display = 'flex';
  
      // Автозаполнение из localStorage
      const inputs = panelEl.querySelectorAll('[data-target]');
      inputs.forEach(input => {
        const targetId = input.getAttribute('data-target');
        const stored = localStorage.getItem(`${selectedTemplate}-${targetId}`);
        if (stored && document.getElementById(targetId)) {
          document.getElementById(targetId).textContent = stored;
          input.value = stored;
        }
  
        input.addEventListener('input', () => {
          const val = input.value;
          const el = document.getElementById(targetId);
          if (el) el.textContent = val;
          localStorage.setItem(`${selectedTemplate}-${targetId}`, val);
        });
      });
    }
  });