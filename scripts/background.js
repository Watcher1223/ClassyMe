// Background handles data collection (grabbing URL to change slides)
let currentURL;
let classCode;

var student = true

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
  if (currentURL.slice(0,36) == "https://docs.google.com/presentation" && !student &&classCode) {
    console.log("TAB UPDATED");
    currentURL = await getTab();
    console.log("Current URL: " + currentURL);
    const http = new HTTP;
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

class HTTP {
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

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response;

    return resData
  }
}

chrome.runtime.onMessage.addListener(async function(message, sender) {
  if (message.purpose == "student_designation") {
    student = message.message

  } else if (message.purpose == "go_live") {
    const http = new HTTP
    let liveURL = await http.get(`https://live-student-feedback-backend.herokuapp.com/classes/${classCode}`);
    liveURL.json().then((json_result) => {
      console.log(json_result.url);
      goLive(json_result.url);
    });

  } else if (message.purpose == "class_code") {
    classCode = message.message

    if (!student) {
      const http = new HTTP
      if (currentURL == undefined) {
        url = getTab();

        url.then((url) => {
          console.log(url);
          if (url.slice(0,36) == "https://docs.google.com/presentation") {
            currentURL = url
          }        
          
        })
      }
      if (currentURL != undefined) {
        let data = {
          code: classCode,
          url: currentURL
        };
        console.log(data);
        let result = await http.post(`https://live-student-feedback-backend.herokuapp.com/classes`, data);
        console.log(result);
        
      }
    }
  } 
})

async function goLive(liveURL) {
  chrome.tabs.update(undefined, {url: liveURL})
}