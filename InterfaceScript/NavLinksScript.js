const navLinks = document.getElementsByClassName("navLinks");
const responsiveNavLinks = document.getElementsByClassName('responsiveNavLinks');
const more = document.getElementsByClassName('more');
const hrDiv = document.getElementById('hrDiv');
const navCont = document.getElementById('navCont');
const darkBgNavDiv = document.getElementById('darkBgNavDiv');


const navLinksArray = [
    "../Dashboard/Dashboard.html",
    "../Log/Log.html",
    "../Reports/Reports.html",
    "../Help/Help.html",
];
const navLinksNames = ["Dashboard", "Log", "Reports", "Help"];

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = responsiveNavLinks[i].onclick = function() {
        // userData = JSON.parse(localStorage.getItem("supervisorData"));
        // actionMade = "navigate";
        // navigatedLink = navLinksNames[i];
        // fetch('http://localhost:8009', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({userData, actionMade, navigatedLink})
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {console.log("Log updates successfuly!");}
        //     else {console.log("Error updating log!");}
        // })
        // .catch(error => {
        //     console.log(error);
        //     console.log("Error updating log!");
        // });
        window.location.href = navLinksArray[i];
        // if (supervisorData) {window.location.href = navLinksArray[i];}
        // else {window.location.href = "../../Login.html";}
    }
    more[i].onclick = more[4].onclick = function() {
        alert('This service is not available now or it is a private service, check later!');
    }
}

// more.forEach(element => {
//     element.onclick = function() {
//         alert('hi')
//     }
// });

hrDiv.onclick = function() {
    darkBgNavDiv.style.display = 'block';
    navCont.style.display = 'block';
    setTimeout(() => {navCont.style.width = '250px';}, 10);
}
darkBgNavDiv.onclick = function() {
    darkBgNavDiv.style.display = 'none';
    navCont.style.width = '0px';
    setTimeout(() => {navCont.style.display = 'none';}, 200);
}