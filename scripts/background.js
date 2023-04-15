// Background handles data collection (grabbing URL to change slides)
let currentURL;

// Runs on tab changes.
chrome.tabs.onActivated.addListener(async function () {
    // if (currentURL.slice(0,36) == "https://docs.google.com/presentation/") 
    console.log("TAB CHANGED");
    currentURL = await getTab();
    console.log("Current URL: " + currentURL.slice(0,36));
})

// Runs on tab updates.
chrome.tabs.onUpdated.addListener(async function () {
    console.log("TAB UPDATED");
    currentURL = await getTab();
    console.log("Current URL: " + currentURL);
})

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].url;
}

