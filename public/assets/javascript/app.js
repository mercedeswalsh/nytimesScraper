document.addEventListener('click', e => {

  if (e.target.id === 'scrapeBtn') {
    document.getElementById('articleContainer').innerHTML = ''
    fetch('/articles')
      .then(articles => {
        articles.forEach(article => {
          document.getElementById('articleContainer').innerHTML += `
          <div class="card mb-4 articleCards">
            <h5 class="card-header danger-color text-white h5">${article.title}</h5>
            <div class="card-body">
              <p class="card-text">${article.summary}</p>
              <a href="#!" class="btn btn-elegant btn-lg">Save Article<i class="fas fa-heart ml-2" aria-hidden="true"></i></a>
            </div>
          </div>
          `
        })
      })
      .catch(e => console.error(e))
  }

})