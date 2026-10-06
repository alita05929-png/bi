const copyBtn = document.getElementById('copy-ca');
const address = document.getElementById('contract-address');
const status = document.getElementById('copy-status');

copyBtn.addEventListener('click', async () => {
  const text = address.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const range = document.createRange();
    range.selectNode(address);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
  status.textContent = 'Copied!';
  setTimeout(() => { status.textContent = 'Tap to copy.'; }, 2000);
});

const flipCard = document.getElementById('flip-card');
const flipInner = document.getElementById('flip-inner');
const tapBtn = document.getElementById('tap-btn');
const tapStatus = document.getElementById('tap-status');

let tapState = 'idle';

function setStatus(text, kind) {
  tapStatus.textContent = text;
  tapStatus.className = 'tap-status show' + (kind ? ' ' + kind : '');
}

tapBtn.addEventListener('click', () => {
  if (tapState === 'idle') {
    tapState = 'denied';
    flipCard.classList.add('is-interacting');
    flipInner.classList.add('is-denied');
    setStatus('Denied ✗', 'denied');
    tapBtn.textContent = 'Try the new card';
    setTimeout(() => flipInner.classList.remove('is-denied'), 500);
  } else if (tapState === 'denied') {
    tapState = 'welcome';
    flipInner.classList.add('is-flipped');
    setTimeout(() => setStatus('Welcome ✓', 'welcome'), 500);
    tapBtn.textContent = 'Tap again';
  } else {
    tapState = 'idle';
    flipInner.classList.remove('is-flipped');
    flipCard.classList.remove('is-interacting');
    tapStatus.className = 'tap-status';
    tapBtn.textContent = 'Tap the old card';
  }
});
