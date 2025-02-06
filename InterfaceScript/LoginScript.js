// const usernameSpan = document.getElementById("usernameSpan");
// const usernameSpanCon = document.getElementById("usernameSpanCon");

// var supervisorData = localStorage.getItem("supervisorData");
// if (supervisorData) {
//     supervisorData = JSON.parse(supervisorData);
//     usernameSpan.innerHTML = capitalizeFirstLetter(supervisorData.fname) + " " + capitalizeFirstLetter(supervisorData.lname);
//     if (supervisorData.admin == true) {DisplayUsers();}
// }
// else {window.location.href = "../../Login.html";}

// function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
// function DisplayUsers() {
//     var displayUserIcon = document.createElement('i');
//     displayUserIcon.classList.add('fa');
//     displayUserIcon.classList.add('fa-user');
//     displayUserIcon.id = 'displayUser';
//     usernameSpanCon.appendChild(displayUserIcon);
//     displayUserIcon.onclick = function() {window.location.href = '../Users/Users.html';}
// }