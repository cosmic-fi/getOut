
<img width="1286" height="482" alt="Frame 33" src="https://github.com/user-attachments/assets/fab7da2b-a24b-45b0-87fb-c695bfb502a1" />

# GetOut – click-to-hide anything on the web  
GetOut is a browser extension that helps you get rid of any elements on any page with just a single click and hide it forever.

---

## 1-second preview
1. Install the extension  
2. Browse to any site  
3. Click the GetOut icon → “Enter selection mode”  
4. Click the element you hate → it vanishes  
5. It stays gone every time you come back (synced across devices)


## Quick install (Chrome / Edge / Brave / Opera)
| Step | What to do |
|------|------------|
| 1 | Download the latest `GetOut.zip` from [Releases](https://github.com/cosmic-fi/GetOut/releases) and unzip it anywhere you prefer |
| 2 | Open your prefered browser and navigate to the extensions page, for Google chrome it would be at this location `chrome://extensions` or just type `<yourbrowser-name>://extensions` in the address bar |
| 3 | Look anywhere on the page and find where it says **“Developer mode”** and toggle it |
| 4 | Click **“Load unpacked”**, navigate to where you unzipped the file and choose `GetOut` folder |
| 5 | Pin the 🎯 icon for one-click access |

That’s it—no sign-up, no permissions prompt, no restart.


## First-run in 15 seconds
1. Visit any page (e.g. YouTube sidebar)  
2. Click the 🎯 GetOut icon  
3. Click **Enter selection mode** – cursor becomes a cross-hair  
4. Hover → orange outline appears → click the annoyance → gone  
5. Press `Esc` (or click the icon again) to exit selection mode  

The element will stay hidden every time you reload the page or come back later.


## Need to bring things back?
Click **Clear hidden elements** in the popup – the page refreshes and everything is restored.


## Where are my hides stored?
Locally in your browser’s synced storage (`chrome.storage.sync`) under the key  
`hiddenEls::&lt;hostname&gt;`.  
Nothing leaves your device; no external servers; no analytics.


## Developer setup (build from source)
| Step | Command |
|------|---------|
| Clone | `git clone https://github.com/cosmic-fi/GetOut.git` |
| (optional) Lint | `npm i && npm run lint` |
| Load | `chrome://extensions` → Developer mode → Load unpacked → pick the folder |

Pull requests welcome—keep it tiny & fast.


## Troubleshooting cheat-sheet
| Symptom | Fix |
|---------|-----|
| Icon greyed out on `chrome://` pages | Normal – extension can’t run on browser-internal URLs |
| Element re-appears after login | Site changed its HTML; hide it again (new selector) |
| Sync lost after reinstall | Log back into Chrome – data lives in your Google account |

More Q&A in the [Wiki](https://github.com/cosmic-fi/GetOut/wiki).


## License
MIT © [Cosmic-fi](https://github.com/cosmic-fi) – see `LICENSE` file.  
Spread the word, don’t re-upload to Chrome Web Store without permission.
