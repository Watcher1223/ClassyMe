const messages = []

// Adding event listeners for clicking button and entering while on text
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("click-this").addEventListener("click", function() {
        press();
    });

    var input =  document.getElementById("input");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("click-this").click();
        }
        //when enter is pressed, click function for button is activated
    });
});
/*
Press Function:
    Inputs: None
    Outputs: Changes messages thread, adds mew messages to messages array,
    clears text box
*/
function sortMessages() {
    messages.sort(sortFunction);
    console.log(messages);
}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

function press() {
    let inputValue = document.getElementById("input").value;
    if (inputValue == ""){
        console.log("please enter a message")
        return
    }
    let rand = Math.floor(Math.random() * 10);
    let messageTuple = [inputValue, rand];
    messages.push(messageTuple);
    sortMessages();

    document.getElementById("input").value = '';

    let thread = document.getElementById("thread");

    let messageElement = document.createElement('div');
    messageElement.className = 'sent-message';
    messageElement.innerHTML = inputValue;
    thread.appendChild(messageElement);

    let likeIcon = document.createElement('i');
    likeIcon.setAttribute('data-like-count', '0');
    likeIcon.id = inputValue + '_like';
    likeIcon.className = 'glyphicon glyphicon-thumbs-up';
    messageElement.appendChild(likeIcon);

    let replyIcon = document.createElement('i');
    replyIcon.id = inputValue + '_reply';
    replyIcon.className = 'glyphicon glyphicon-comment';
    messageElement.appendChild(replyIcon);

    let repliesDiv = document.createElement('div');
    repliesDiv.className = 'replies';
    repliesDiv.id = inputValue + '_replies';
    messageElement.appendChild(repliesDiv);
}


function likeMessage(event) {
    let likeIcon = event.target;
    let likeCount = parseInt(likeIcon.getAttribute('data-like-count'), 10);

    // Toggle the 'liked' class
    likeIcon.classList.toggle('liked');

    // Update the like count
    if (likeIcon.classList.contains('liked')) {
        likeCount += 1;
    } else {
        likeCount -= 1;
    }
    likeIcon.setAttribute('data-like-count', likeCount);
    likeIcon.textContent = likeCount;
}

function replyMessage(event) {
    let replyIcon = event.target;
    let messageId = replyIcon.id.replace('_reply', '');
    let replyInput = document.createElement('input');
    replyInput.setAttribute('type', 'text');
    replyInput.setAttribute('id', messageId + '_reply_input');
    replyInput.setAttribute('placeholder', 'Write a reply...');

    let sendReplyButton = document.createElement('button');
    sendReplyButton.setAttribute('id', messageId + '_send_reply');
    sendReplyButton.textContent = 'Send';

    replyIcon.parentNode.insertBefore(replyInput, replyIcon.nextSibling);
    replyIcon.parentNode.insertBefore(sendReplyButton, replyInput.nextSibling);

    sendReplyButton.addEventListener('click', function () {
        let replyText = document.getElementById(messageId + '_reply_input').value;
        if (replyText.trim() === '') return;

        let repliesDiv = document.getElementById(messageId + '_replies');
        repliesDiv.innerHTML += "<br />" + replyText;

        replyInput.remove();
        sendReplyButton.remove();
    });
}
// Add a message counter
let messageCounter = 0;

function press() {
    let inputValue = document.getElementById("input").value;
    if (inputValue == ""){
        console.log("please enter a message")
        return
    }
    let rand = Math.floor(Math.random() * 10);
    let messageTuple = [inputValue, rand, messageCounter];
    messages.push(messageTuple);
    sortMessages();

    document.getElementById("input").value = '';

    let thread = document.getElementById("thread");

    let messageElement = document.createElement('div');
    messageElement.className = 'sent-message';
    messageElement.innerHTML = inputValue;
    thread.appendChild(messageElement);

    let likeIcon = document.createElement('i');
    likeIcon.setAttribute('data-like-count', '0');
    likeIcon.id = messageCounter + '_like'; // Change this line
    likeIcon.className = 'glyphicon glyphicon-thumbs-up';
    messageElement.appendChild(likeIcon);

    let replyIcon = document.createElement('i');
    replyIcon.id = messageCounter + '_reply'; // Change this line
    replyIcon.className = 'glyphicon glyphicon-comment';
    messageElement.appendChild(replyIcon);

    let repliesDiv = document.createElement('div');
    repliesDiv.className = 'replies';
    repliesDiv.id = messageCounter + '_replies'; // Change this line
    messageElement.appendChild(repliesDiv);

    // Increment the messageCounter
    messageCounter++;
}

// ...
// Add event listener for clicking on a glyphicon-comment
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('glyphicon-thumbs-up')) {
        likeMessage(event);
        var extension_id = chrome.runtime.id
        chrome.runtime.sendMessage(extension_id, {
            message: "question was liked",
            purpose: "some_identifier"
        })
    } else if (event.target.classList.contains('glyphicon-comment')) {
        replyMessage(event);
    }
});

document.getElementById("teacher-identify").addEventListener("click", function (event) {
    var extension_id = chrome.runtime.id
    chrome.runtime.sendMessage(extension_id, {
        message: false,
        purpose: "student_designation"
    })
})

document.getElementById("go-live-button").addEventListener("click", function (event) {
    var extension_id = chrome.runtime.id
    chrome.runtime.sendMessage(extension_id, {
        message: "go-live",
        purpose: "go_live"
    })
})

document.getElementById("student-identify").addEventListener("click", function (event) {
    var extension_id = chrome.runtime.id
    chrome.runtime.sendMessage(extension_id, {
        message: true,
        purpose: "student_designation"
    })
})

document.getElementById("change-class-code-teacher").addEventListener("click", function (event) {
    const class_code = document.getElementById("class-code-input").value;
    console.log(class_code);
    var extension_id = chrome.runtime.id
    chrome.runtime.sendMessage(extension_id, {
        message: class_code,
        purpose: "class_code"
    })
})

document.getElementById("change-class-code-student").addEventListener("click", function (event) {
    const class_code = document.getElementById("class-code-input").value;
    console.log(class_code);
    var extension_id = chrome.runtime.id
    chrome.runtime.sendMessage(extension_id, {
        message: class_code,
        purpose: "class_code"
    })
})

// Add event listener for changing the width
document.getElementById("toggle-width").addEventListener("click", function () {
    toggleWidth();
  });

let wideWidth = false;

function toggleWidth() {
  const bodyElement = document.querySelector("body");
  if (wideWidth) {
    bodyElement.style.width = "500px";
    wideWidth = false;
  } else {
    bodyElement.style.width = "100%";
    wideWidth = true;
  }
}

// document.getElementById('teacher-identify').addEventListener('click', function () {
//     const teacherInputContainer = document.getElementById('teacher-input-container');
//     const existingInput = teacherInputContainer.querySelector('input');

//     if (!existingInput) {
//       const input = document.createElement('input');
//       input.setAttribute('type', 'text');
//       input.setAttribute('placeholder', 'Enter code');
//       teacherInputContainer.appendChild(input);
//     }
//   });

//   document.getElementById('student-identify').addEventListener('click', function () {
//     const studentInputContainer = document.getElementById('student-input-container');
//     const existingInput = studentInputContainer.querySelector('input');

//     if (!existingInput) {
//       const input = document.createElement('input');
//       input.setAttribute('type', 'text');
//       input.setAttribute('placeholder', 'Enter Class code');
//       studentInputContainer.appendChild(input);
//     }
//   });

document.getElementById('teacher-identify').addEventListener('click', function () {
    const teacherInputContainer = document.getElementById('teacher-input-container');
    const studentInputContainer = document.getElementById('student-input-container');
    teacherInputContainer.style.display = 'block';
    studentInputContainer.style.display = 'none';
  });

  document.getElementById('student-identify').addEventListener('click', function () {
    const teacherInputContainer = document.getElementById('teacher-input-container');
    const studentInputContainer = document.getElementById('student-input-container');
    studentInputContainer.style.display = 'block';
    teacherInputContainer.style.display = 'none';
  });
