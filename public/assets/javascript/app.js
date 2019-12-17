// Helper function to display articles
const updateArticleList = isSaved => {
  document.getElementById('articleContainer').innerHTML = ''
  console.log('updating article list')
  axios.get('/articles', { isSaved })
    .then(articles => {
      if (articles.length > 0) {
        articles.forEach(article => 
          document.getElementById('articleContainer').innerHTML += `
            <div class="card mb-4 articleCards">
              <h5 class="card-header danger-color text-white h5">${article.title}</h5>
              <div class="card-body">
                <p class="card-text">${article.summary}</p>
                ${
                  isSaved
                    ? `
                    <a href="#!" class="btn btn-elegant btn-lg deleteBtn" data-id=${article._id}>
                      Delete Saved Article
                      <i class="fas fa-trash-alt ml-2" aria-hidden="true"></i>
                    </a>
                    <a href="#!" class="btn btn-elegant btn-lg noteBtn" data-id=${article._id}>
                      Notes
                      <i class="far fa-sticky-note ml-2" aria-hidden="true"></i>
                    </a>
                    `
                    : `
                    <a href="#!" class="btn btn-elegant btn-lg saveBtn" data-id=${article._id}>
                      Save Article
                      <i class="fas fa-heart ml-2" aria-hidden="true"></i>
                    </a>
                  `
                }
              </div>
            </div>
        `)
      } else {
        console.log('need articles')
        document.getElementById('articleContainer').innerHTML = `
          <div class="card mb-4 articleCards danger-color">
            <h5 class="card-header text-white h5">NEED ARTICLE</h5>
          </div>
        `
      }
    })
    .catch(e => console.error(e))
}

// Event Listeners
document.addEventListener('click', e => {

  // Scrape more articles
  if (e.target.id === 'scrapeBtn') {
    axios.get('/scrape')
      .then(() => updateArticleList(false))
      .catch(e => console.error(e))
  }

  // Save article
  if (e.target.classList.contains('saveBtn')) {
    axios.update(`/articles/${e.target.ddataset.id}`, { isSaved: true })
      .then(() => updateArticleList(false))
      .catch(e => console.error(e))
  }

  // Clear unsaved articles
  if (e.target.id === 'clearBtn') {
    axios.delete('/articles', { isSaved: false })
      .then(() => updateArticleList(false))
      .catch(e => console.error(e))
  }

  // Delete saved article
  if (e.target.classList.contains('deleteBtn')) {
    axios.delete(`/articles/${e.target.dataset.id}`)
      .then(() => updateArticleList(true))
      .catch(e => console.error(e))
  }

  // Show notes for article
  if (e.target.classList.contains('noteBtn')) {
    axios.get(`/notes/article/${e.target.dataset.id}`)
      .then(notes => {
        // Have modal popup with the article notes
      })
      .catch(e => console.error(e))
  }

})

if (window.location.href.includes('Saved')) {
  updateArticleList(true)
} else {
  updateArticleList(false)
}