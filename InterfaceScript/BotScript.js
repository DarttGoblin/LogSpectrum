const robot = document.getElementById('robot');
const botArrowIcon = document.getElementById('arrowIcon');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const darkBgBotDiv = document.getElementById("darkBgBotDiv");
const chatContainer = document.getElementById("chatContainer");
const closingChatBot = document.getElementById('closingChatBot');

var chatOpened = false;

robot.onclick = more[3].onclick = function() {
    ChatBotState('block');
    if (!chatOpened) {AddMessage('botMessage', 'Hello! How can I assist you today?');}
    chatOpened = true;
    darkBgNavDiv.style.display = 'none';
    navCont.style.width = '0px';
    setTimeout(() => {navCont.style.display = 'none';}, 200);
}
closingChatBot.onclick = function() {ChatBotState('none')};
botArrowIcon.onclick = SendMessage;
userInput.onkeydown = function(event) {if (event.key === 'Enter') {SendMessage();}};

function SendMessage() {
    const inputValue = userInput.value;
    if (inputValue.trim() === '') return;

    AddMessage('userMessage', inputValue);
    userInput.value = '';
    userInput.disabled = true;

    setTimeout(() => {
        const { response, options } = GetBotResponse(inputValue);
        AddMessage('botMessage', response);
        if (options.length > 0) {appendButtons(options);}
        userInput.disabled = false;
    }, 1000);
}
function AddMessage(sender, message) {
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    messageElement.classList.add('botChatMsg');
    messageElement.classList.add(sender);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
function GetBotResponse(userInput) {
    userInput = userInput.toLowerCase();
    let response = '';
    let options = [];

    if (userInput.includes('hello') || userInput.includes('hi')) {
        response = 'Hello! How can I assist you today? Please choose from the following options:';
        options = ['Account Issue', 'Interface Question', 'Contact Support'];}
    else if (userInput.includes('help') || userInput.includes('support') || userInput.includes('assistance')) {response = 'Sure, I\'m here to help. What specifically do you need assistance with? Please provide more details.';}
    else if (userInput.includes('bye') || userInput.includes('goodbye') || userInput.includes('thanks')) {response = 'Goodbye! If you have any more questions, feel free to ask. Have a great day!';}
    else {
        response = 'I apologize, but I didn\'t quite understand your request. Could you please rephrase or provide more information? Alternatively, you can choose from the following options:';
        options = ['Account Issue', 'Interface Question', 'Contact Support'];
    }

    return { response, options };
}
function appendButtons(options) {
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('chatButtons');
        button.onclick = function () {handleOption(option);};
        chatBox.appendChild(button);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
function handleOption(option) {console.log('Selected option:', option);}
function ChatBotState(state) {
    darkBgBotDiv.style.display = state;
    chatContainer.style.display = state;
}