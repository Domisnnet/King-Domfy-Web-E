document.addEventListener('DOMContentLoaded', function() {
  function loadTemplate(id, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(error => console.error('Error loading template:', error));
  }

  loadTemplate('header-placeholder', '/templates/header.html');
  loadTemplate('footer-placeholder', '/templates/footer.html');
});