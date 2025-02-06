const chatCon = document.getElementById("chatCon");
const searchEng = document.getElementById("searchEng");
const helpArrowIcon = document.getElementById("helpArrowIcon");

var placeHInterval = setInterval(GeneratePlaceHolders, 7000);
var suggetionsOff = true;

GeneratePlaceHolders();
CreateSuggetionsButtons();

searchEng.onkeydown = function(event) {if (event.key == 'Enter') {SendPrompt(searchEng.value);}}
helpArrowIcon.onclick = function() {SendPrompt(searchEng.value);}

function GenerateWaitSign() {
    const waitingSpan = document.createElement('span');
    const waitingIcon = document.createElement('i');
    const sender = document.createElement("span");

    sender.textContent = 'LogSpectrum';
    sender.classList.add('references');

    waitingIcon.classList.add('fa');
    waitingIcon.classList.add('fa-gear');
    waitingIcon.classList.add('waitingIconStyle');
    waitingIcon.classList.add('rotateAnimation');

    waitingSpan.appendChild(sender);
    waitingSpan.appendChild(waitingIcon);

    chatCon.appendChild(waitingSpan);
    return waitingSpan;
}
function CreateSuggetionsButtons() {
    const parentDiv = document.createElement('div');
    const logoImg = document.createElement('img');
    const buttonsCont = document.createElement('div');
    const childButtonOne = document.createElement('button');
    const childButtonTwo = document.createElement('button');
    const childButtonThree = document.createElement('button');
    const buttonIconOne = document.createElement('i'); 
    const buttonIconTwo = document.createElement('i'); 
    const buttonIcontThree = document.createElement('i'); 

    const ruleWritingTipsChoice = ruleWritingTips[Math.floor(Math.random() * ruleWritingTips.length)]
    const troubleshootingGuideChoice = troubleshootingGuide[Math.floor(Math.random() * troubleshootingGuide.length)]
    const securityBestPracticesChoice = securityBestPractices[Math.floor(Math.random() * securityBestPractices.length)]

    logoImg.src = 'HelpMedia/logoImg.png';

    parentDiv.classList.add('parentDivStyle');
    logoImg.classList.add('logoImgStyle');
    buttonsCont.classList.add('buttonsContStyle');
    childButtonOne.classList.add('childButtonStyle');
    childButtonTwo.classList.add('childButtonStyle');
    childButtonThree.classList.add('childButtonStyle');

    buttonIconOne.classList.add('fa');
    buttonIconTwo.classList.add('fa');
    buttonIcontThree.classList.add('fa');
    buttonIconOne.classList.add('fa-pencil');
    buttonIconTwo.classList.add('fa-wrench');
    buttonIcontThree.classList.add('fa-lock');
    buttonIconOne.id = 'ruleWritingIcon';
    buttonIconTwo.id = 'troubleshootingIcon';
    buttonIcontThree.id = 'securityIcon';

    childButtonOne.appendChild(buttonIconOne);
    childButtonTwo.appendChild(buttonIconTwo);
    childButtonThree.appendChild(buttonIcontThree);

    childButtonOne.innerHTML += '<br><br>' + ruleWritingTipsChoice; 
    childButtonTwo.innerHTML += '<br><br>' + troubleshootingGuideChoice; 
    childButtonThree.innerHTML += '<br><br>' + securityBestPracticesChoice;

    buttonsCont.appendChild(childButtonOne);
    buttonsCont.appendChild(childButtonTwo);
    buttonsCont.appendChild(childButtonThree);

    parentDiv.appendChild(logoImg);
    parentDiv.appendChild(buttonsCont);

    chatCon.appendChild(parentDiv);    

    childButtonOne.onclick = function() {SendPrompt(ruleWritingTipsChoice);}
    childButtonTwo.onclick = function() {SendPrompt(troubleshootingGuideChoice);}
    childButtonThree.onclick = function() {SendPrompt(securityBestPracticesChoice);}
}
function GenerateUserChatSpan(chatSpanContent) {
    var chatSpan = document.createElement("span");
    var sender = document.createElement("span");
    chatSpan.textContent = chatSpanContent;
    sender.textContent = 'User';
    chatSpan.classList.add('chatSpans');
    chatSpan.classList.add('prompts');
    sender.classList.add('references');
    chatCon.appendChild(sender);
    chatCon.appendChild(chatSpan);
    chatCon.scrollTop = chatCon.scrollHeight;
    searchEng.value = '';
}
function GenerateAIChatSpan(chatSpanContent) {
    var chatSpan = document.createElement("span");
    var sender = document.createElement("span");
    sender.textContent = 'LogSpectrum';
    chatSpan.classList.add('chatSpans');
    chatSpan.classList.add('aiResp');
    sender.classList.add('references');
    chatCon.appendChild(sender);
    chatCon.appendChild(chatSpan);
    chatCon.scrollTop = chatCon.scrollHeight;
    searchEng.value = '';
    var chatSpanContentArray = chatSpanContent.split("");
    for (var i = 0; i < chatSpanContentArray.length; i++) {
        (function(index) {
            setTimeout(() => { chatSpan.textContent += chatSpanContentArray[index]; }, 10 * index);
        })(i);
    }
}
function SendPrompt(prompt) {
    if (prompt == '') {return;}
    searchEng.disabled = true;
    if (suggetionsOff) {
        chatCon.innerHTML = '';
        chatCon.style.display = 'block';
        suggetionsOff = false;
    }
    GenerateUserChatSpan(prompt);
    const waitingSpan = GenerateWaitSign();
    fetch('http://localhost:8014', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            chatCon.removeChild(waitingSpan);
            GenerateAIChatSpan(data.aiResponse);
            searchEng.disabled = false;
        }
        else {
            chatCon.removeChild(waitingSpan);
            console.log(data.error);
            alert("An error has been occured! Try again later.");
            searchEng.disabled = false;
        }
    })
    .catch(error => {
        chatCon.removeChild(waitingSpan);
        console.log(error);
        alert("An error has been occured! Try again later.");
        searchEng.disabled = false;
    });
}
function GeneratePlaceHolders() {
    var networkConcept = placeHolders[Math.floor(Math.random() * (placeHolders.length))];
    var networkConceptArray = networkConcept.split("");
    searchEng.placeholder = "";
    for (var i = 0; i < networkConceptArray.length; i++) {
        (function(index) {
            setTimeout(() => { searchEng.placeholder += networkConceptArray[index]; }, 50 * index);
        })(i);
    }
}