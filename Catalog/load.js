// Load content from file when a link is clicked
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Link clicked:', this.getAttribute('href'));
    const file = this.getAttribute('data-file');
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.error('Error loading content:', error));
  });
});
