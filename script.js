// Select existing HTML elements, then listen for a visitor's interaction.
const filterGroup = document.querySelector('.filters');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
const filterStatus = document.querySelector('#filter-status');

// Without JavaScript, all projects remain visible and the filters stay hidden.
filterGroup.hidden = false;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });

    projectCards.forEach((card) => {
      const matches = category === 'all' || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
