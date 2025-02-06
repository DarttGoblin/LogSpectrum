const allSupervisorsTable = document.getElementsByTagName("tbody")[0];

if (!supervisorData.admin) {}
else {DisplayUsersTable();}

function DisplayUsersTable() {
    fetch('http://localhost:8010', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            supervisorData = JSON.parse(JSON.stringify(data.supervisorData));
            supervisorData.forEach(row => {if (!row.deleted) {allSupervisorsTable.appendChild(CreateTableRow(row));}});
        } else {console.log("Error: " + data.error);}
    })
    .catch(error => {console.log(error);});
}
function CreateTableRow(allSupervisorData) {
    const tr = document.createElement("tr");
    const delIcon = document.createElement("i");

    delIcon.classList.add('fa');
    delIcon.classList.add('fa-trash');
    delIcon.classList.add('delIcon');

    for (const key in allSupervisorData) {
        if (key == "passw") {continue;}
        if (key == "deleted") {continue;}
        const td = document.createElement("td");
        if (key == "admin") {
            if (allSupervisorData[key] == 1) {td.textContent = "Yes";}
            else {td.textContent = "No";}
        }
        else {td.textContent = allSupervisorData[key];}
        tr.appendChild(td);
        tr.appendChild(delIcon);
    }

    return tr;
}