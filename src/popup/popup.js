const removedDivsEl = document.getElementById("removedDivs");
const removedClassesEl = document.getElementById("removedClasses");
const removedScrollEl = document.getElementById("removedScroll");

if (removedDivsEl && removedClassesEl && removedScrollEl) {
  chrome.storage.sync.get(
    ["removedDivs", "removedClasses", "removedScroll"],
    ({ removedDivs, removedClasses, removedScroll }) => {
      removedDivsEl.innerHTML = `Removed divs: ${removedDivs}`;
      removedClassesEl.innerHTML = `Removed classes: ${removedClasses}`;
      removedScrollEl.innerHTML = `Removed scroll: ${removedScroll}`;
    }
  );
}

const submitEl = document.getElementById("submit");
const resultEl = document.getElementById("result");

if (submitEl && resultEl) {
  submitEl.onclick = (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: `
          function init() {
            try {
              function KeyPress(e) {
                const { keyCode } = window.event ? event : e;
                
                // If "a" is pressed, scroll up
                if (keyCode == 65) {
                  window.scrollBy(0, -100);
                }
              
                // If "z" is pressed, scroll down
                if (keyCode == 90) {
                  window.scrollBy(0, 100);
                }
              }

              document.onkeydown = KeyPress;
              return true;
            } catch (err) {
              console.log("[zap][ERROR]");
              console.traxe(err);
              return false;
            }
          }
          init();
      `,
        },
        (result) => {
          let r = `<p style="color: green;">Successfully added events! Press "a" to scroll up and "z" to scroll down.</p>`;
          if (!result) r = `<p style="color: red;">Unable to add events!</p>`;
          resultEl.innerHTML = `${r}`;
        }
      );
    });
  };
}

const isEnabledEl = document.getElementById("isEnabled");
const toggleButton = document.getElementById("toggle-enabled-disabled");

if (isEnabledEl && toggleButton) {
  chrome.storage.sync.get("enabled", ({ enabled }) => {
    let html = "";

    if (enabled === true) {
      html = `Enabled`;
      isEnabledEl.style.color = "green";
      toggleButton.innerText = "Disable extension";
    }

    if (enabled === false) {
      html = `Disabled`;
      isEnabledEl.style.color = "red";
      toggleButton.innerText = "Enable extension";
    }

    isEnabledEl.style.fontSize = '14px';
    isEnabledEl.innerHTML = `<small>${html}</small>`;
  });
}
