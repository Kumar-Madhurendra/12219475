export function createShortUrl(data) {
  const urls = JSON.parse(localStorage.getItem('shortUrls') || '[]');
  urls.push(data);
  localStorage.setItem('shortUrls', JSON.stringify(urls));
}

export function getShortUrls() {
  return JSON.parse(localStorage.getItem('shortUrls') || '[]');
}

export function saveClick(shortCode, clickData) {
  const urls = getShortUrls();
  const index = urls.findIndex(u => u.shortCode === shortCode);
  if (index !== -1) {
    urls[index].clicks.push(clickData);
    localStorage.setItem('shortUrls', JSON.stringify(urls));
  }
}
