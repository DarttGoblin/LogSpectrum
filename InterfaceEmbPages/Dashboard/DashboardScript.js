const severityGraph = document.getElementById('severityGraph').getContext('2d');
const barGraph = document.getElementById('barGraph').getContext('2d');
const typesGraph = document.getElementById('typesGraph').getContext('2d');
const protocolGraph = document.getElementById('protocolGraph').getContext('2d');
const sourcePortGraph = document.getElementById('sourcePortGraph').getContext('2d');
const destinationPortGraph = document.getElementById('destinationPortGraph').getContext('2d');
const sourceIPGraph = document.getElementById('sourceIPGraph').getContext('2d');
const classificationGraph = document.getElementById('classificationGraph').getContext('2d');
const destinationIPGraph = document.getElementById('destinationIPGraph').getContext('2d');
const updateLineChart = document.getElementById("updateLineChart");
const updateBarChart = document.getElementById("updateBarChart");

var duplicateBool = false;
let lineChart, barChart, typesChart, protocolChart, sourcePortChart, destinationPortChart, sourceIPChart, classificationChart, destinationIPChart;

const intrusionsNumPerDur = Array(12).fill(0);
const parsedFileLog = [];
const intrusionsSeverity = [];
const intrusionsType = [];
const intrusionsProtocol = [];
const intrusionsClassification = [];
const intrusionsSourceIP = [];
const intrusionsSourcePort = [];
const intrusionsDestinationPort = [];
const intrusionsDestinationIP = [];
const intrusionCount = [];

const intrusionsTypeNotFriendlyNames = [
    'POTENTIAL PROBE Suspicious SSDP service detection',
    'SUSPECTED SCAN SSDP service fingerprinting attempt',
    'POTENTIAL PROBE SSDP service discovery probe',
    'SUSPECTED SCAN SSDP service enumeration attempt',
    'WEB-MISC Unexpected HTTP Protocol Version',
    'WEB-MISC Non-standard HTTP Version',
    'POTENTIAL PROBE SSDP service enumeration detected',
    'SUSPECTED SCAN SSDP service discovery attempt',
    'SUSPECTED SCAN SSDP service probing detected',
    'Potential LOIC UDP flood detected',
    'SCAN UPnP service discover attempt',
    'POTENTIAL PROBE Suspicious SSDP service detect',
    'WEB MISC Non-standard HTTP Version',
];
const intrusionsTypeFriendlyNames = [
    'SSDP Probe',
    'SSDP Fingerprint Scan',
    'SSDP Discovery Probe',
    'SSDP Enumeration Scan',
    'HTTP Anomaly',
    'HTTP Anomaly',
    'SSDP Enumeration Detected',
    'SSDP Discovery Attempt',
    'SSDP Probing Detected',
    'DDoS Attack',
    'UPnP Scan',
    'SSDP Probe',
    'HTTP Anomaly'
];
const dataTiming = [['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', 
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
];
const typesBarChartColor = [
    'rgba(255, 99, 132, 0.7)', 
    'rgba(54, 162, 235, 0.7)', 
    'rgba(255, 206, 86, 0.7)', 
    'rgba(75, 192, 192, 0.7)', 
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)', 
    'rgba(199, 199, 199, 0.7)',
    'rgba(83, 102, 255, 0.7)', 
    'rgba(100, 181, 246, 0.7)',
    'rgba(255, 87, 34, 0.7)',  
    'rgba(139, 195, 74, 0.7)', 
    'rgba(255, 235, 59, 0.7)'
];
const protocolChartColor = [
    'rgba(75, 192, 192, 0.7)', 
    'rgba(199, 199, 199, 0.7)',
    'rgba(255, 206, 86, 0.7)', 
    'rgba(54, 162, 235, 0.7)', 
    'rgba(255, 99, 132, 0.7)', 
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)', 
    'rgba(83, 102, 255, 0.7)', 
    'rgba(100, 181, 246, 0.7)',
    'rgba(255, 87, 34, 0.7)',  
    'rgba(139, 195, 74, 0.7)', 
    'rgba(255, 235, 59, 0.7)'  
];
const classDesSouChartColor = [
    'rgba(255, 0, 0, 0.5)',
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(255, 165, 0, 0.5)',
    'rgba(75, 0, 130, 0.5)', 
    'rgba(238, 130, 238, 0.5)',
    'rgba(128, 0, 128, 0.5)',
    'rgba(0, 255, 255, 0.5)',
    'rgba(255, 20, 147, 0.5)',
    'rgba(124, 252, 0, 0.5)',
    'rgba(255, 69, 0, 0.5)',
    'rgba(0, 128, 128, 0.5)'
];

updateLineChart.onclick = function() {duplicateBool = DuplicateState(duplicateBool);}
updateBarChart.onclick = function() {alert('This feature is not available now, check later.');}
initialize();

function initialize() {
    CreateCharts();
    ListenToFile();
}
function ListenToFile() {
    fetch('https://log-spectrum-snort-server-ecru.vercel.app/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 404) {
            throw new Error('API endpoint not found. Please check the URL.');
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(fileDataLines => {
        if (!Array.isArray(fileDataLines)) {
            throw new Error('Invalid data format received');
        }
        
        console.log('fileChanged event received');
        let parIndex = 0;
        let index = 1;
        
        fileDataLines.forEach(line => {
            if (line) {  // Only process non-empty lines
                const parsedData = parseLogLine(line, index);
                if (parsedData) {
                    parsedFileLog[parIndex] = parsedData;
                    parIndex++;
                    index++;
                }
            }
        });
        
        console.log("Data processed");
        CreateCharts();
    })
    .catch(err => {
        console.error('Error fetching file data:', err.message);
        // You might want to add some UI feedback here
    });
}
// function ListenToFile() {
//     const socket = io('http://localhost:8011');
//     socket.on('fileChanged', (fileDataLines) => {
//         console.log('fileChanged event received');
//         var parIndex = 0;
//         var index = 1;
//         fileDataLines.forEach(line => {
//             const parsedData = parseLogLine(line, index);
//             if (parsedData) {
//                 parsedFileLog[parIndex] = parsedData;
//                 parIndex++;
//                 index++;
//             }
//         });
//         console.log("Data processed");
//         CreateCharts();
//     });
//     socket.on('connect', () => {console.log('Connected to server');});
//     socket.on('disconnect', () => {console.log('Disconnected from server');});
// }
function parseLogLine(logLine, index) {
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
    } else {
        // console.log("Log line format did not match expected pattern: " + logLine);
        return null;
    }
}
function DuplicateState(duplicateBool) {
    if (!duplicateBool) {
        const uniqueIntrusionSeverities = intrusionsSeverity.filter((severity, index) => {return severity !== intrusionsSeverity[index - 1];});
        const uniqueIntrusionCounts = uniqueIntrusionSeverities.map((_, index) => index + 1);

        CreateSeverityChart(uniqueIntrusionSeverities, uniqueIntrusionCounts);
        updateLineChart.innerHTML = 'Show Duplicates &#8743;';
        return true;
    } else {
        CreateSeverityChart(intrusionsSeverity, intrusionCount);
        updateLineChart.innerHTML = 'Remove Duplicates &#8745;';
        return false;
    }
}
function CreateCharts() {
    intrusionsSeverity.length = 0;
    intrusionsType.length = 0;
    intrusionsProtocol.length = 0;
    intrusionsClassification.length = 0;
    intrusionsSourceIP.length = 0;
    intrusionsSourcePort.length = 0;
    intrusionsDestinationIP.length = 0;
    intrusionsDestinationPort.length = 0;
    intrusionCount.length = 0;

    parsedFileLog.forEach((log, i) => {
        intrusionsSeverity[i] = log.priority;
        intrusionsType[i] = log.actionDescription;
        intrusionsProtocol[i] = log.protocol;
        intrusionsClassification[i] = log.classification;
        intrusionsSourceIP[i] = log.sourceIP;
        intrusionsSourcePort[i] = log.sourcePort;
        intrusionsDestinationIP[i] = log.destinationIP;
        intrusionsDestinationPort[i] = log.destinationPort;
        intrusionCount[i] = i + 1;

        let month = parseInt(log.timestamp.slice(0, 2));
        if (month >= 1 && month <= 12) {
            intrusionsNumPerDur[month - 1] += 1;
        }
    });

    for (var i = 0; i < intrusionsType.length; i++) {
        for (j = 0; j < intrusionsTypeNotFriendlyNames.length; j++) {
            if (intrusionsType[i] == intrusionsTypeNotFriendlyNames[j]) {intrusionsType[i] = intrusionsTypeFriendlyNames[j];}
        }
    }

    const intrusionsTypeSet = new Set(intrusionsType);
    const intrusionsTypeFiltered = [...intrusionsTypeSet];
    const typeCounts = intrusionsTypeFiltered.map(type => intrusionsType.filter(t => t === type).length);

    const intrusionsProtocolSet = new Set(intrusionsProtocol);
    const intrusionsProtocolFiltered = [...intrusionsProtocolSet];
    const protocolCounts = intrusionsProtocolFiltered.map(protocol => intrusionsProtocol.filter(p => p === protocol).length);

    const intrusionsSourceIPSet = new Set(intrusionsSourceIP);
    const intrusionsSourceIPFiltered = [...intrusionsSourceIPSet];
    const sourceIPCounts = intrusionsSourceIPFiltered.map(type => intrusionsSourceIP.filter(t => t === type).length);

    const intrusionsDestinationIPSet = new Set(intrusionsDestinationIP);
    const intrusionsDestinationIPFiltered = [...intrusionsDestinationIPSet];
    const destinationIPCounts = intrusionsDestinationIPFiltered.map(type => intrusionsDestinationIP.filter(t => t === type).length);

    const intrusionsSourcePortSet = new Set(intrusionsSourcePort);
    const intrusionsSourcePortFiltered = [...intrusionsSourcePortSet];
    const sourcePortCounts = intrusionsSourcePortFiltered.map(port => intrusionsSourcePort.filter(p => p === port).length);

    const intrusionsDestinationPortSet = new Set(intrusionsDestinationPort);
    const intrusionsDestinationPortFiltered = [...intrusionsDestinationPortSet];
    const destinationPortCounts = intrusionsDestinationPortFiltered.map(port => intrusionsDestinationPort.filter(p => p === port).length);

    const intrusionsClassificationSet = new Set(intrusionsClassification);
    const intrusionsClassificationFiltered = [...intrusionsClassificationSet];
    const classificationCounts = intrusionsClassificationFiltered.map(port => intrusionsClassification.filter(p => p === port).length);

    DuplicateState(true);
    CreateSeverityChart(intrusionsSeverity, intrusionCount);
    CreateNumPerMonthChart(intrusionsNumPerDur);
    CreateSourcePortChart(intrusionsSourcePortFiltered, sourcePortCounts);
    CreateDestinationPortChart(intrusionsDestinationPortFiltered, destinationPortCounts);
    CreateTypesChart(intrusionsTypeFiltered, typeCounts);
    CreateProtocolChart(intrusionsProtocolFiltered, protocolCounts);
    CreateSourceIpChart(intrusionsSourceIPFiltered, sourceIPCounts);
    CreateClassificationChart(intrusionsClassificationFiltered, classificationCounts);
    CreateDestinationIpChart(intrusionsDestinationIPFiltered, destinationIPCounts);
}
