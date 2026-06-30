const qrDialog = document.getElementById('qrDialog');
const openQr = document.getElementById('openQr');
const shareButton = document.getElementById('shareButton');
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.qr-view');

openQr?.addEventListener('click', () => {
  if (typeof qrDialog.showModal === 'function') qrDialog.showModal();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    views.forEach(v => v.classList.toggle('active', v.id === target));
  });
});

shareButton?.addEventListener('click', async () => {
  const title = 'Carte de visite — Magali Charlet';
  const text = 'Magali Charlet — Développement économique territorial & partenariats stratégiques';
  const url = window.location.href;

  if (navigator.share && !url.startsWith('file:')) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (error) {}
  }

  const message = `${title}\n${text}\nTéléphone : 06 65 14 50 87\nE-mail : contact.charlet@gmail.com\nLinkedIn : https://www.linkedin.com/in/magalicharlet\nCarte : ${url}`;
  try {
    await navigator.clipboard.writeText(message);
    shareButton.textContent = 'Coordonnées copiées';
    setTimeout(() => { shareButton.textContent = 'Partager la carte'; }, 2000);
  } catch (error) {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
  }
});
