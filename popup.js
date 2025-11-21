document.addEventListener('DOMContentLoaded', () => {
  const selectBtn = document.getElementById('selectMode');
  const clearBtn = document.getElementById('clearHidden');

  const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tab;
  };

  async function sendWithEnsure(tabId, action) {
    try {
      await chrome.tabs.sendMessage(tabId, { action });
    } catch (err) {
      try {
        await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
        await chrome.tabs.sendMessage(tabId, { action });
      } catch (injectErr) {
        throw injectErr;
      }
    }
  }

  if (selectBtn) {
    selectBtn.addEventListener('click', async () => {
      try {
        const tab = await getActiveTab();
        if (!tab || !tab.id) throw new Error('No active tab or unsupported page.');
        await sendWithEnsure(tab.id, 'startSelection');
      } catch (err) {
        console.error('Failed to start selection mode:', err);
        alert('Cannot start selection mode on this page. Try a regular webpage.');
      }
    });
  } else {
    console.error('Popup: selectMode button not found');
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
      try {
        const tab = await getActiveTab();
        if (!tab || !tab.id) throw new Error('No active tab or unsupported page.');
        await sendWithEnsure(tab.id, 'clearHidden');
      } catch (err) {
        console.error('Failed to clear hidden elements:', err);
        alert('Cannot clear on this page. Try a regular webpage.');
      }
    });
  } else {
    console.error('Popup: clearHidden button not found');
  }
});