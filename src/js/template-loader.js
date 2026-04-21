document.addEventListener('DOMContentLoaded', function() {
  const loadTemplate = (id, url) => {
    const finalUrl = new URL(url, window.location.origin).href;
    return fetch(finalUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao carregar ${finalUrl}`);
        }
        return response.text();
      })
      .then(data => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = data;
        } else {
          console.error(`Elemento com id '${id}' não encontrado.`);
        }
      });
  };

  const headerPromise = loadTemplate('header-placeholder', 'templates/header.html');
  const footerPromise = loadTemplate('footer-placeholder', 'templates/footer.html');

  Promise.all([headerPromise, footerPromise])
    .then(() => {
      const event = new CustomEvent('templatesReady');
      document.dispatchEvent(event);
    })
    .catch(error => console.error('Falha catastrófica ao carregar templates:', error));
});