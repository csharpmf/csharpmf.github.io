let allNews = [];

async function loadNews() {
  try {
    const response = await fetch('data/news.json');
    const data = await response.json();
    allNews = data.news;
    displayNews('all');
  } catch (error) {
    document.getElementById('newsGrid').innerHTML = '<div class="loading">No news found</div>';
  }
}

function displayNews(filter) {
  const grid = document.getElementById('newsGrid');
  let news = [...allNews];

  if (filter !== 'all') {
    news = news.filter(item => item.category === filter);
  }

  news.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (news.length === 0) {
    grid.innerHTML = '<div class="loading">No news in this category</div>';
    return;
  }

  grid.innerHTML = news.map(item => `
    <div class="news-card">
      ${item.icon ? `<div class="news-icon">${item.icon}</div>` : ''}
      <div class="news-content">
        <div class="news-meta">
          <span>${item.date}</span>
          <span>${item.source || 'Unknown'}</span>
        </div>
        <div class="news-category">${item.category}</div>
        <div class="news-title">${item.title}</div>
        <div class="news-summary">${item.summary}</div>
        ${item.url ? `<a href="${item.url}" target="_blank" class="news-link">read more →</a>` : ''}
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayNews(btn.dataset.filter);
  });
});

loadNews();
