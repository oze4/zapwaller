removeAdblockDivs();
removeAdblockClassesFromAllElements();
removeNoScrollClassesFromAllElements();

function removeAdblockDivs() {
  const divs = document.querySelectorAll("div[class*='adblock']");
  const count = divs.length ? divs.length : 0;

  if (count) {
    divs.forEach((d) => d.parentNode.removeChild(d));
  }

  chrome.storage.sync.set({ removedDivs: count }, () => {});
}

function removeAdblockClassesFromAllElements() {
  const adblockEls = document.querySelectorAll("[class*='adblock']");
  const count = adblockEls.length ? adblockEls.length : 0;

  if (count) {
    removeClassesThatContain("adblock", adblockEls);
  }

  chrome.storage.sync.set({ removedClasses: count }, () => {});
}

function removeNoScrollClassesFromAllElements() {
  const noscrollEls = document.querySelectorAll("[class*='no-scroll']");
  const count = noscrollEls.length ? noscrollEls.length : 0;

  if (count) {
    removeClassesThatContain("no-scroll", noscrollEls);
  }

  chrome.storage.sync.set({ removedScroll: count }, () => {});
}

function removeClassesThatContain(someStr = "", nodeList) {
  if (someStr === "") return;

  nodeList.forEach((node) => {
    if (node.classList.length) {
      node.classList.forEach(cls => {
        if (cls.includes(someStr)) {
          node.classList.remove(cls);
        }
      });
    }
  });
}
