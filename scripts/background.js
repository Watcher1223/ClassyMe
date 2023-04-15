/// <reference types="chrome"/>


// chrome.tabs.onActivated.addListener(function (tabid, windowid) {
//     chrome.tabs.update({url: "https://www.loser.com"});
// });
chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition(activeInfo) {
  try {
    setTimeout(() => chrome.tabs.update({url: "https://www.coolmathgames.com"}), 50);
    console.log("Success.");
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}