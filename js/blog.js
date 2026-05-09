let allPosts = [];

async function loadPosts() {
  try {
    const response = await fetch('data/blog.json');
    const data = await response.json();
    allPosts = data.posts;
    displayPosts('all');
  } catch (error) {
    document.getElementById('postsGrid').innerHTML = '<div class="loading">No posts found</div>';
  }
}

function displayPosts(filter) {
  const grid = document.getElementById('postsGrid');
  let posts = [...allPosts];

  if (filter === 'recent') {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filter === 'oldest') {
    posts.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (posts.length === 0) {
    grid.innerHTML = '<div class="loading">No posts yet</div>';
    return;
  }

  grid.innerHTML = posts.map(post => `
    <div class="post-card" onclick="window.location.href='${post.url || '#'}'">
      ${post.icon ? `<div class="post-icon">${post.icon}</div>` : ''}
      <div class="post-content">
        <div class="post-meta">
          <span>${post.date}</span>
          <span>${post.readTime || 'unkown read time'}</span>
        </div>
        <div class="post-title">${post.title}</div>
        <div class="post-excerpt">${post.excerpt}</div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayPosts(btn.dataset.filter);
  });
});

loadPosts();
