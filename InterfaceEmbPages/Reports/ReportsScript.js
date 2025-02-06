const anamoliestbody = document.getElementsByTagName("tbody")[0];
const abnormalLinetbody = document.getElementsByTagName("tbody")[1];
const analysisTable = document.getElementById("analysisTable");
const analysisParaCon = document.getElementById("analysisParaCon");

const nonParsedFileLog = JSON.parse(localStorage.getItem('nonParsedFileLog'));
const anomalyLogs = JSON.parse(localStorage.getItem('anomalyLogs'));

let index = 1;
let anomalyIndex = 1;

if (nonParsedFileLog != null) {DisplayAbnormalLines();}
if (anomalyLogs == null) {
    analysisParaCon.style.display = 'none';
    analysisTable.style.display = 'none';
}
else {DisplayAnamolyLines();}

function DisplayAbnormalLines() {nonParsedFileLog.forEach(line => {AppendAbnormalLineToTable(line);});}
function DisplayAnamolyLines() {anomalyLogs.forEach(line => {AppendAnamolyLineToTable(line);});}
function AppendAbnormalLineToTable(line) {
    const tr = document.createElement('tr');
    const noTd = document.createElement('td');
    const lineTd = document.createElement('td');
    
    noTd.textContent = index;
    lineTd.textContent = line;
    
    tr.appendChild(noTd);
    tr.appendChild(lineTd);
    abnormalLinetbody.appendChild(tr);

    index++;
}
function AppendAnamolyLineToTable(anomaly) {
    const tr = document.createElement("tr");

    const indexTd = document.createElement("td");
    indexTd.textContent = anomalyIndex++;
    tr.appendChild(indexTd);

    for (const key in anomaly) {
        if (key == 'anomaly') {continue;}
        const td = document.createElement("td");
        if (key == 'anomalyScore') {td.textContent = parseFloat(anomaly[key]).toFixed(4);}
        else {td.textContent = anomaly[key];}
        tr.appendChild(td);
    }
    
    anamoliestbody.appendChild(tr);
}