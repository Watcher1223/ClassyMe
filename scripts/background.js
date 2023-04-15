// Background handles data collection (grabbing URL to change slides)
let currentURL;
let classCode;

const student = true

// Runs on tab changes.
chrome.tabs.onActivated.addListener(async function () { 
  if (!student) {
    console.log("TAB CHANGED");
    currentURL = await getTab();
    console.log("Current URL: " + currentURL);
  }
})

// Runs on tab updates.
chrome.tabs.onUpdated.addListener(async function () {
  if (currentURL.slice(0,36) == "https://docs.google.com/presentation" && !student) {
    console.log("TAB UPDATED");
    currentURL = await getTab();
    console.log("Current URL: " + currentURL);
    const http = new EasyHTTP;
    const data = {
      "code": classCode,
      "url": currentURL
    }
    http.put(`https://live-student-feedback-backend.herokuapp.com/classes/${classCode}`, data).then(data => console.log(data)).catch(error => console.log(error));
  }
})

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].url;
}

class EasyHTTP {
  async put(url, data) {

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response;

    return resData
  }

  async get(url) {
    const response = await fetch(url);

    const resData = await response; 

    return resData
  }
}

chrome.runtime.onMessage.addListener(async function(message, sender) {
  if (message.purpose == "student_designation") {
    student = message.message

  } else if (message.purpose == "go_live") {
    const http = new EasyHTTP
    let liveURL = await http.get(`https://live-student-feedback-backend.herokuapp.com/classes/${classCode}`)
    goLive(liveURL)

  } else if (message.purpose == "class_code") {
    classCode = message.message
  }
})

async function goLive(liveURL) {
  chrome.tabs.update(undefined, {url: liveURL})
}