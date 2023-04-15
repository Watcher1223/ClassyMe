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
    thread.innerHTML += "<br />" + inputValue + "<br />" + "<i data-like-count='0' id='" + inputValue + "' class='glyphicon glyphicon-thumbs-up'></i>";
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
    likeIcon.textContent = ' ' + likeCount;
}

// Add event listener for clicking on a glyphicon-thumbs-up
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('glyphicon-thumbs-up')) {
        likeMessage(event);
    }
});
