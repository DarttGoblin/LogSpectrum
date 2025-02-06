const gear = document.getElementById("gear");
const settingsCont = document.getElementById("settingsCont");
const settingsDiv = document.getElementById("settingsDiv");
const darkBgSetDiv = document.getElementById("darkBgSetDiv");
const closingSetArrow = document.getElementById("closingSetArrow");
const modeSpan = document.getElementById("modeSpan");
const modeLogo = document.getElementById("modeLogo");
const optionsConts = document.getElementsByClassName("optionsConts");
const newAccountSpan = document.getElementById("newAccountSpan"); 
const newAccountIcon = document.getElementById("newAccountIcon");
const manageAccountIcon = document.getElementById("manageAccountIcon");
const manageAccountSpan = document.getElementById("manageAccountSpan");
const UsernameSpan = document.getElementById("usernameSpan");
const settingsOptionsCont = document.getElementById("settingsOptionsCont");

var updateBool = false;
var dlrangeBool = JSON.parse(localStorage.getItem("dlrangeBool"));

if (dlrangeBool == null) {
    dlrangeBool = false;
    currentMode = 'Dark Mode';
}
else {
    if (dlrangeBool == false) {currentMode = 'Dark Mode';}
    else {currentMode = 'Light Mode';}
}

const optionsElements = [];
const settingsOptions = ['Manage Account', 'Notification', 'Themes', 'Language', 'New Account', currentMode, 'Future Updates'];
const settingsOptionsIcons =  ['fa-user-cog' ,'fa-bell' ,'fa-paint-brush' ,'fa-language' ,'fa-user-plus' ,'fa-adjust', 'fa-calendar-alt'];
const settingsIconsMargin = ['20px', '30px', '27px', '20px', '20px', '27px', '30px'];
const updates = [
    'Save AI Assistant Chat',
    'Archive AI Assistant Chat',
    'Generate QR Code',
    'Upload Pictures',
    'Languages',
    'SMS Verification',
    'Email Verification',
    'Notifications',
    'Themes'
];

const updatesCon = CreateUpdatesDiv();
CreateSettings();

gear.onclick = function() {SettingsState("block", "300px", 50);}
closingSetArrow.onclick = function() {SettingsState("none", "0px", 0);}
darkBgSetDiv.onclick = function() {SettingsState("none", "0px", 0);}
// UsernameSpan.onclick = function() {window.location.href = "../Account/Account.html";}

function UpdateDivState() {
    if (!updateBool) {
        updatesCon.style.visibility = 'visible';
        updatesCon.style.height = '150px';
        return true;
    }
    else {
        updatesCon.style.height = '0px';
        setTimeout(() => {updatesCon.style.visibility = 'hidden';}, 300);
        return false;
    }
}
function CreateUpdatesDiv() {
    const updatesCon = document.createElement('div');
    updatesCon.classList.add('updatesCon');
    const spacer = document.createElement('div');
    spacer.classList.add('spacer');

    for (var i = 0; i < updates.length; i++) {
        const update = document.createElement('span');
        
        update.classList.add('update');
        update.textContent = updates[i];
        updatesCon.appendChild(update);
    }

    settingsDiv.appendChild(updatesCon);
    settingsDiv.appendChild(spacer);

    return updatesCon;
}
function CreateSettings() {
    for (var i = 0; i < settingsOptions.length; i++) {
        const optionsConts = document.createElement('div');
        const settingsIcons = document.createElement('i');
        const settingsSpans = document.createElement('span');

        optionsConts.classList.add('optionsConts');
        settingsIcons.classList.add('fa');
        settingsIcons.classList.add(settingsOptionsIcons[i]);
        settingsIcons.style.marginRight = settingsIconsMargin[i];
        settingsSpans.textContent = settingsOptions[i];


        optionsConts.appendChild(settingsIcons);
        optionsConts.appendChild(settingsSpans);

        settingsOptionsCont.appendChild(optionsConts);
        optionsElements.push(optionsConts);
    }

    for (let i = 0; i < settingsOptions.length; i++) {
        optionsConts[i].onclick = function() {
            // if (i == 4) {window.location.href = "../NewAccount/NewAccount.html";}
            // else if (i == 5) {ModeRange();}
            // else if (i == 6) {updateBool = UpdateDivState();}
            // else {alert('This service is not available now or it is a private service, check later!');}
            alert('This service is not available now or it is a private service, check later!');
        }
    }
}
function SettingsState(displayScl, widthScl, time) {
    darkBgSetDiv.style.display = displayScl;
    settingsCont.style.width = widthScl;
    closingSetArrow.style.display = displayScl;
    setTimeout(() => {settingsDiv.style.display = displayScl}, time);
}
function ModeRange() {
    if (!dlrangeBool) {
        optionsElements[5].querySelector('span').textContent = 'Light Mode';
        dlrangeBool = true;
        localStorage.setItem("dlrangeBool", dlrangeBool);
    }
    else {
        optionsElements[5].querySelector('span').textContent = 'Dark Mode';
        dlrangeBool = false;
        localStorage.setItem("dlrangeBool", dlrangeBool);
    }
    document.body.style.backgroundColor = 'transparent';
    document.body.style.backgroundImage = 'none';
}
