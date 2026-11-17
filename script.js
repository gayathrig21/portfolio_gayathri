// Each filter group controls only the cards in its own section.
document.querySelectorAll('.filters').forEach(group => {
  const section = group.closest('section');
  const buttons = [...group.querySelectorAll('[data-filter]')];
  const cards = [...section.querySelectorAll('.project-card[data-category]')];
  const status = section.querySelector('[role="status"]');
  group.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visible++;
    });
    if (status) {
      const noun = section.id === 'case-studies' ? 'case study' : 'project';
      status.textContent = visible + ' ' + (visible === 1 ? noun : noun === 'case study' ? 'case studies' : 'projects') + ' shown.';
    }
  }));
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
