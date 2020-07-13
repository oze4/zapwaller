chrome.runtime.onInstalled.addListener(() => {
  const state = {
    enabled: true,
    removedDivs: 0,
    removedClasses: 0,
    removedScroll: 0,
  };

  chrome.storage.sync.set(state, () => {
    // Parameter-less callback here.
    // If there is an error, chrome.runtime.lastError will be set, per https://developer.chrome.com/extensions/storage#method-StorageArea-set
  });
});






// Some personal notes..
/**
 * This shows how you can hide the pop up within the extensions toolbar if the user is not on a certain domain/website.
 *
 * This requires `manifest.json` contain an entry for `page_action`.
 *
 * The below demo shows how to enable the pop up while the user is at 'developer.chrome.com'.
 */
// chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//   chrome.declarativeContent.onPageChanged.addRules([
//     {
//       conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: { hostEquals: 'developer.chrome.com' },
//         }),
//       ],
//       actions: [new chrome.declarativeContent.ShowPageAction()],
//     },
//   ]);
// });
