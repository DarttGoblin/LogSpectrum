const snortLogFiletbody = document.getElementsByTagName("tbody")[0];
const userLogtbody = document.getElementsByTagName("tbody")[1];

var supervisorData; //  For user data
var logData; //  For user log
var logLines; //  For file non parsed content 
var parsedFileLog = []; //  For file parsed content
var nonParsedFileLog = []; //  For file non-parsed content

ListenToFile();
ReadUserLog();

function ListenToFile() {
    fetch('http://localhost:8011/')
        .then(response => response.json())
        .then(fileDataLines => {
            var index = 1;
            snortLogFiletbody.innerHTML = '';
            logLines = fileDataLines;
            fileDataLines.forEach(line => {
                const parsedData = ParseLogLine(line, index);
                if (parsedData) {
                    snortLogFiletbody.appendChild(CreateSnortFileTableRow(parsedData));
                    parsedFileLog.push(parsedData);
                    index++;
                } else {
                    HandleUnmatchedLogLine(line);
                    nonParsedFileLog.push(line);
                }
            });
            localStorage.setItem('nonParsedFileLog', JSON.stringify(nonParsedFileLog));
        })
        .catch(error => console.error('Error fetching log data:', error));
}
// function ListenToFile() {
//     const socket = io('http://localhost:8011');
//     socket.on('fileChanged', (fileDataLines) => {
//         var index = 1;
//         snortLogFiletbody.innerHTML = '';
//         logLines = fileDataLines;
//         fileDataLines.forEach(line => {
//             const parsedData = ParseLogLine(line, index);
//             if (parsedData) {
//                 snortLogFiletbody.appendChild(CreateSnortFileTableRow(parsedData));
//                 parsedFileLog.push(parsedData);
//                 index++;
//             }
//             else {
//                 HandleUnmatchedLogLine(line);
//                 nonParsedFileLog.push(line);
//             }
//         });
//         localStorage.setItem('nonParsedFileLog', JSON.stringify(nonParsedFileLog));
//     });
//     socket.on('connect', () => {console.log('Connected to server');});
//     socket.on('disconnect', () => {console.log('Disconnected from server');});
// }
function ReadUserLog() {
    fetch('http://localhost:8010', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            logData = JSON.parse(JSON.stringify(data.logData));
            supervisorData = JSON.parse(JSON.stringify(data.supervisorData));
            localStorage.setItem("AllSupervisorData", supervisorData);
            logData.forEach(function(row) {userLogtbody.appendChild(CreateTableRow(row));});
        } else {console.log("Error: " + data.error);}
    })
    .catch(error => {console.log(error);});
}
function CapitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
function CreateTableRow(logData) {
    const tr = document.createElement("tr");
    for (const key in logData) {
        if (logData.hasOwnProperty(key)) {
            const td = document.createElement("td");
            if (key == "id") {
                td.textContent = logData["super_id"];
                tr.appendChild(td);
            }
            else if (key == "super_id") {
                const supervisor = supervisorData.find(sup => sup.super_id === logData[key]);
                if (supervisor) {td.textContent = CapitalizeFirstLetter(supervisor.fname) + ' ' + CapitalizeFirstLetter(supervisor.lname);}
                else {td.textContent = "Unknown Supervisor";}
                tr.appendChild(td);
            }
            else {
                td.textContent = logData[key];
                tr.appendChild(td);
            }
        }
    }
    return tr;
}
function CreateSnortFileTableRow(snortLogData) {
    const tr = document.createElement("tr");
    for (const key in snortLogData) {
        if (snortLogData.hasOwnProperty(key)) {
            const td = document.createElement("td");
            td.textContent = snortLogData[key];
            tr.appendChild(td);
        }
    }
    return tr;
}
function HandleUnmatchedLogLine(logLine) {console.warn("Unmatched log line:", logLine);}
function ParseLogLine(logLine, index) {
    const logPattern = /^(\d{2}\/\d{2}-\d{2}:\d{2}:\d{2}\.\d{6})\s+\[\*\*\]\s+\[\d+:\d+:\d+\]\s+(.+?)\s+\[\*\*\]\s+\[Classification:\s+(.+?)\]\s+\[Priority:\s+(\d+)\]\s+\{(\w+)\}\s+(\d{1,3}(?:\.\d{1,3}){3}):(\d+)\s+->\s+(\d{1,3}(?:\.\d{1,3}){3}):(\d+)/;
    const match = logLine.match(logPattern);
    if (match) {
        return {
            no: index,
            actionDescription: match[2],
            timestamp: match[1],
            classification: match[3],
            priority: match[4],
            protocol: match[5],
            sourceIP: match[6],
            sourcePort: match[7],
            destinationIP: match[8],
            destinationPort: match[9]
        };
    } else {console.log("Log line format did not match expected pattern: " + logLine); return null;}
}
