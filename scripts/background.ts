chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

// chrome.omnibox.onInputEntered.addListener((text) => {
//   // Encode user input for special characters , / ? : @ & = + $ #
//   const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
//   chrome.tabs.create({ url: newURL });
// });