/*
 * GetOut
 * Lightweight content-hider Chrome extension
 * @Author: Cosmic-fi (https://github.com/cosmic-fi)
 * License: MIT
 * -------------------------------------------------
 * This file is part of the GetOut browser extension.
 * You are free to use, modify and distribute it under the MIT license.
 * A copy of the license is included in the root of the project.
 */

let selectionMode = false;
let hoveredEl = null;

const storageKey = `hiddenEls::${location.hostname}`;
let hiddenEls = [];

async function loadHiddenEls() {
  const res = await chrome.storage.sync.get(storageKey);
  const legacy = JSON.parse(localStorage.getItem('hiddenEls') || '[]');
  hiddenEls = Array.isArray(res[storageKey]) ? res[storageKey] : [];
  if (hiddenEls.length === 0 && legacy.length > 0) {
    hiddenEls = legacy;
    try {
      await chrome.storage.sync.set({ [storageKey]: legacy });
      localStorage.removeItem('hiddenEls');
    } catch (e) {
      console.error('Failed to migrate legacy localStorage data:', e);
    }
  }
}

function applyHiddenEls() {
  hiddenEls.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => (el.style.display = 'none'));
  });
}

(async () => {
  try {
    await loadHiddenEls();
    applyHiddenEls();
  } catch (e) {
    console.error('Failed to load/apply hidden elements:', e);
  }
})();

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === 'startSelection') {
    selectionMode = true;
    document.body.style.cursor = 'crosshair';
    alert('Click on any element to hide it. Press ESC to exit selection mode.');
  } else if (msg.action === 'clearHidden') {
    hiddenEls = [];
    try {
      await chrome.storage.sync.set({ [storageKey]: [] });
    } catch (e) {
      console.error('Failed to clear storage.sync for this site:', e);
    }
    location.reload();
  }
});

document.addEventListener('mouseover', (e) => {
  if (!selectionMode) return;
  if (hoveredEl) hoveredEl.style.outline = '';
  hoveredEl = e.target;
  hoveredEl.style.outline = '2px solid orange';
});

document.addEventListener('mouseout', () => {
  if (hoveredEl) hoveredEl.style.outline = '';
});

document.addEventListener('click', async (e) => {
  if (!selectionMode) return;
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;
  const selector = getUniqueSelector(el);

  el.style.display = 'none';
  hiddenEls.push(selector);
  try {
    await chrome.storage.sync.set({ [storageKey]: hiddenEls });
  } catch (err) {
    console.error('Failed to save hidden element to storage.sync:', err);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && selectionMode) {
    selectionMode = false;
    document.body.style.cursor = '';
    if (hoveredEl) hoveredEl.style.outline = '';
    alert('Exited selection mode.');
  }
});

function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.className) return `${el.tagName.toLowerCase()}.${el.className.trim().split(/\s+/).join('.')}`;
  return el.tagName.toLowerCase();
}