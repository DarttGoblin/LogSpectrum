const filterSelectLog = document.getElementById("filterSelectLog");
const sortSelectLog = document.getElementById("sortSelectLog");
const downloadSelectLog = document.getElementById("downloadSelectLog");
const filterSelectUserLog = document.getElementById("filterSelectUserLog");
const sortSelectUserLog = document.getElementById("sortSelectUserLog");
const searchEng = document.getElementById("searchEng");
const searchIcon = document.getElementById("searchIcon");
const downloadSelectSpan = document.getElementById("downloadSelectSpan");
const analyseBtn = document.getElementById("analyseBtn");

var filterLogOptions = ['Yesterday', 'Last week', 'Last month'];
var sortLogOptions = ['Event description', 'Timestamp', 'Classification', 'Priority', 'Protocol', 'Source port', 'Destination port'];
var downloadLogOptions = ['PDF', 'CSV', 'JSON'];
var filterUserLogOptions = ['Yesterday', 'Last week', 'Last month', 'Last year'];
var sortUserLogOptions = ['Id', 'Action', 'Timestamp', 'Device', 'Location'];

LogFilterSelect();
LogSortSelect();
LogDownloadSelect();
UserLogFilterSelect();
UserLogSortSelect();
AnalyseBgColor();

searchIcon.onclick = SearchUpdateLog;
searchEng.onkeydown = function(event) {if (event.key == 'Enter') {SearchUpdateLog()}}
downloadSelectSpan.onclick = DownloadFile;
filterSelectLog.onchange = function(event) {Filter(event);};
sortSelectLog.onchange = function(event) {Sort(event);};
sortSelectUserLog.onchange = function(event) {UserSort(event);};
filterSelectUserLog.onchange = function(event) {alert("This feature is not available now, check later.");};
analyseBtn.onclick = AnalyseLog;

function AnalyseLog() {
    analyseBtn.textContent = 'Analysing...';
    analyseBtn.disabled = true;
    fetch('http://localhost:8015', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({parsedFileLog})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const anomalyLogs = data.anomalyLogs; 
            if (anomalyLogs.length === 0) {
                alert('No anomalies have been detected!');
                analyseBtn.disabled = false;
                analyseBtn.textContent = 'Analyse'; 
                return;
            }
            localStorage.setItem('anomalyLogs', JSON.stringify(anomalyLogs));
            setTimeout(() => {analyseBtn.disabled = false; analyseBtn.textContent = 'Analyse';}, 1000);
            setTimeout(() => {window.location.href = '../Reports/Reports.html';}, 1000);
        }
        else {
            console.log(data.error);
            alert("An error has been occured during analysis! Try again later.");
            analyseBtn.disabled = false;
            analyseBtn.textContent = 'Analyse';
        }
    })
    .catch(error => {
        console.log(error);
        alert("An error has been occured in the server! Try again later.");
        analyseBtn.disabled = false;
        analyseBtn.textContent = 'Analyse';
    });
}
function UserSort(event) {
    const sortType = event.target.value;

    if (sortType == 1) {logData.sort((a, b) => a.super_id - b.super_id);}
    else if (sortType == 2) {logData.sort((a, b) => a.actionDescri.localeCompare(b.actionDescri));}
    else if (sortType == 3) {logData.sort((a, b) => a.timestamp.localeCompare(b.timestamp));}
    else if (sortType == 4) {logData.sort((a, b) => a.device.localeCompare(b.device));}
    else if (sortType == 5) {logData.sort((a, b) => a.location.localeCompare(b.location));}

    userLogtbody.innerHTML = '';
    logData.forEach(row => {userLogtbody.appendChild(CreateTableRow(row));});
}
function Sort(event) {
    const sortType = event.target.value;
    const sortedLogLines = [];    
    parsedFileLog.forEach(line => {sortedLogLines.push(line);});

    if (sortType == 1) {sortedLogLines.sort((a, b) => a.actionDescription.localeCompare(b.actionDescription));}
    else if (sortType == 2) {sortedLogLines.sort((a, b) => a.timestamp.localeCompare(b.timestamp));}
    else if (sortType == 3) {sortedLogLines.sort((a, b) => a.classification.localeCompare(b.classification));}
    else if (sortType == 4) {sortedLogLines.sort((a, b) => a.priority - b.priority);}
    else if (sortType == 5) {sortedLogLines.sort((a, b) => a.protocol.localeCompare(b.protocol));}
    else if (sortType == 6) {sortedLogLines.sort((a, b) => a.sourcePort - b.sourcePort);}
    else if (sortType == 7) {sortedLogLines.sort((a, b) => a.destinationPort - b.destinationPort);}

    snortLogFiletbody.innerHTML = '';
    sortedLogLines.forEach(line => {snortLogFiletbody.appendChild(CreateSnortFileTableRow(line));;});
}
function AnalyseBgColor() {
    analyseBtn.style.backgroundColor = RandomColor();
    setInterval(() => {analyseBtn.style.backgroundColor = RandomColor() + `,${0.7})`;}, 1000);
}
function RandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}`;
}
function CreatePDFfile() {    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const currentDate = new Date();
    const columns = ['No', 'Event Description', 'Timestamp', 'Classification', 'Priority', 'Protocol', 'Source IP', 'Source Port', 'Destination IP', 'Destination Port'];
    const rows = parsedFileLog.map(log => [
        log.no,
        log.actionDescription,
        log.timestamp,
        log.classification,
        log.priority,
        log.protocol,
        log.sourceIP,
        log.sourcePort,
        log.destinationIP,
        log.destinationPort
    ]);

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - 40) / 2;

    doc.addImage(imgData, 'JPEG', x, 0, 40, 40);
    doc.setFontSize(16).text("Network Intrusion Detection System Log", pageWidth / 2, 45, { align: 'center' });
    doc.setFontSize(8).text('Generated on: ' + currentDate, pageWidth / 2 + 5, 55);
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 58,
        styles: { fontSize: 5 },
    });

    doc.save('SnortLog.pdf');
}
function DownloadFile() {
    const fileType = downloadSelectLog.value;
    if (fileType == 'Choose') {alert("Please choose a file type to download!"); return;}
    else if (fileType == '1') {
        downloadSelectSpan.disabled = true;
        CreatePDFfile();
        downloadSelectSpan.disabled = false;
        return;
    }
    downloadSelectSpan.disabled = true;
    downloadSelectSpan.textContent = 'Downloading...';
    fetch('http://localhost:8013', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({parsedFileLog, fileType})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            downloadSelectSpan.disabled = false;
            downloadSelectSpan.textContent = 'Download:';
        }
        else {
            console.log("Error: " + data.error);
            alert("An error has been occured! Try again later.");
            downloadSelectSpan.disabled = false;
        downloadSelectSpan.textContent = 'Download:';
        }
    })
    .catch(error => {
        console.log(error);
        alert("An error has been occured! Try again later.");
        downloadSelectSpan.disabled = false;
        downloadSelectSpan.textContent = 'Download:';
    });
}
function FilterDuration(filterType) {
    if (filterType == 1) {return 24}
    else if (filterType == 2) {return 24 * 7}
    else if (filterType == 3) {return 24 * 30}
    else {return 24 * 356}
}
function Filter(event) {
    const filterType = event.target.value;
    const filterDuration = FilterDuration(filterType);
    const filteredLogLines = [];
    var currentDate = new Date();
    var filterIndex = 0;

    parsedFileLog.forEach(line => {
        var timestampParts = line.timestamp.split(/\/|-|:|\./);
        var timestamp = new Date(Date.UTC(
            new Date().getFullYear(),
            parseInt(timestampParts[0], 10) - 1,
            parseInt(timestampParts[1], 10),
            parseInt(timestampParts[2], 10),
            parseInt(timestampParts[3], 10),
            parseInt(timestampParts[4], 10),
            parseInt(timestampParts[5], 10)
        ));

        var timeDifference = currentDate - timestamp;
        var hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference <= filterDuration) {
            filteredLogLines[filterIndex] = line;
            filterIndex++;
        }
    });
    
    snortLogFiletbody.innerHTML = '';
    filteredLogLines.forEach(line => {snortLogFiletbody.appendChild(CreateSnortFileTableRow(line));;});
}
function CapitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
function SearchLogs(logLines, keyword) {
    const results = [];
    var index = 0;
    logLines.forEach((line) => {
        var lowercaseLine = line.toLowerCase();
        if (lowercaseLine.includes(keyword.toLowerCase())) {
            results[index] = line;
            index++;
        }
    });
    return results;
}
function SearchUpdateLog() {
    var keyword = searchEng.value;
    var newLogLines = SearchLogs(logLines, keyword);
    if (newLogLines.length == 0) {
        alert("The Provided input has no matches with log enteries!");
        return;
    }
    var index = 1;
    snortLogFiletbody.innerHTML = '';
    newLogLines.forEach(line => {
        const parsedData = ParseLogLine(line, index);
        if (parsedData) {
            snortLogFiletbody.appendChild(CreateSnortFileTableRow(parsedData));
            index++;
        } else {HandleUnmatchedLogLine(line);}
    });
}
function LogFilterSelect() {
    for (var i = 0; i < filterLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = filterLogOptions[i];
        option.value = i + 1;
        filterSelectLog.appendChild(option);
    }
}
function LogSortSelect() {
    for (var i = 0; i < sortLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = sortLogOptions[i];
        option.value = i + 1;
        sortSelectLog.appendChild(option);
    }
}
function LogDownloadSelect() {
    for (var i = 0; i < downloadLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = downloadLogOptions[i];
        option.value = i + 1;
        downloadSelectLog.appendChild(option);
    }
}
function UserLogFilterSelect() {
    for (var i = 0; i < filterUserLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = filterUserLogOptions[i];
        option.value = i + 1;
        filterSelectUserLog.appendChild(option);
    }
}
function UserLogSortSelect() {
    for (var i = 0; i < sortUserLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = sortUserLogOptions[i];
        option.value = i + 1;
        sortSelectUserLog.appendChild(option);
    }
}