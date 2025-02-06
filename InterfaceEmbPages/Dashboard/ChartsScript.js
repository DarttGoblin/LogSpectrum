function CreateSeverityChart(intrusionsSeverity, intrusionCount) {
    var severityGraphData = {
        labels: intrusionCount,
        datasets: [{
            label: 'Severity Of Intrusions',
            data: intrusionsSeverity,
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(100, 195, 255, 0.5)',
            fill: true,
            borderWidth: 5,
            tension: 0.4
        }]
    };
    
    if (lineChart) {
        lineChart.data = severityGraphData;
        lineChart.update();
    } else {
        lineChart = new Chart(severityGraph, {
            type: 'line',
            data: severityGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {return Math.round(value);},
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Severity Of Intrusions Chart'
                    }
                }
            }
        });
    }
}
function CreateNumPerMonthChart(intrusionsNumPerDur) {
    var barGraphData = {
        labels: dataTiming[0],
        datasets: [{
            label: 'Number Of Intrusions per month',
            data: intrusionsNumPerDur,
            backgroundColor: typesBarChartColor,
            borderColor: typesBarChartColor,
        }]
    };

    if (barChart) {
        barChart.data = barGraphData;
        barChart.update();
    } else {
        barChart = new Chart(barGraph, {
            type: 'bar',
            data: barGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {y: {beginAtZero: true,}}
            }
        });
    }
}
function CreateSourcePortChart(intrusionsSourcePortFiltered, sourcePortCounts) {
    const sourcePortData = intrusionsSourcePortFiltered.map((port, index) => ({
        x: port,
        y: sourcePortCounts[index]
    }));
    
    // Define the data structures for the charts
    const sourcePortGraphData = {
        datasets: [{
            label: 'Source Ports',
            data: sourcePortData,
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            radius: 5
        }]
    };
    
    if (sourcePortChart) {
        sourcePortChart.data = sourcePortGraphData;
        sourcePortChart.update();
    } else {
        sourcePortChart = new Chart(sourcePortGraph, {
            type: 'scatter',
            data: sourcePortGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'top' },
                scales: {
                    x: {
                        type: 'category',
                        labels: intrusionsSourcePortFiltered
                    },
                    y: { beginAtZero: true }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Source Port Counts'
                    }
                }
            }
        });
    }
}
function CreateDestinationPortChart(intrusionsDestinationPortFiltered, destinationPortCounts) {
    const destinationPortData = intrusionsDestinationPortFiltered.map((port, index) => ({
        x: port,
        y: destinationPortCounts[index]
    }));
    
    const destinationPortGraphData = {
        datasets: [{
            label: 'Destination Ports',
            data: destinationPortData,
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            radius: 5
        }]
    };
    
    if (destinationPortChart) {
        destinationPortChart.data = destinationPortGraphData;
        destinationPortChart.update();
    } else {
        destinationPortChart = new Chart(destinationPortGraph, {
            type: 'scatter',
            data: destinationPortGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'top' },
                scales: {
                    x: {
                        type: 'category',
                        labels: intrusionsDestinationPortFiltered
                    },
                    y: { beginAtZero: true }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Destination Port Counts'
                    }
                }
            }
        });
    }
}
function CreateTypesChart(intrusionsTypeFiltered, typeCounts) {
    var typesGraphData = {
        labels: intrusionsTypeFiltered,
        datasets: [{
            label: 'Intrusions by Type',
            data: typeCounts,
            backgroundColor: typesBarChartColor,
            borderColor: typesBarChartColor,
            borderWidth: 1
        }]
    };

    if (typesChart) {
        typesChart.data = typesGraphData;
        typesChart.update();
    } else {
        typesChart = new Chart(typesGraph, {
            type: 'doughnut',
            data: typesGraphData,
            options: {
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                rotation: -Math.PI,
                legend: {position: 'bottom',},
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Type'
                    }
                }
            },
        });
    }
}
function CreateProtocolChart(intrusionsProtocolFiltered, protocolCounts) {
    var protocolGraphData = {
        labels: intrusionsProtocolFiltered,
        datasets: [{
            label: 'Intrusions by Protocol',
            data: protocolCounts,
            backgroundColor: protocolChartColor,
            borderColor: protocolChartColor,
            borderWidth: 1
        }]
    };

    if (protocolChart) {
        protocolChart.data = protocolGraphData;
        protocolChart.update();
    } else {
        protocolChart = new Chart(protocolGraph, {
            type: 'pie',
            data: protocolGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {position: 'bottom',},
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Protocol'
                    }
                }
            },
        });
    }
}
function CreateSourceIpChart(intrusionsSourceIPFiltered, sourceIPCounts) {
    var sourceIPGraphData = {
        labels: intrusionsSourceIPFiltered,
        datasets: [{
            label: 'Intrusion Count',
            data: sourceIPCounts,
            backgroundColor: classDesSouChartColor,
            borderColor: classDesSouChartColor,
            borderWidth: 1
        }]
    };

    if (sourceIPChart) {
        sourceIPChart.data = sourceIPGraphData;
        sourceIPChart.update();
    } else {
        sourceIPChart = new Chart(sourceIPGraph, {
            type: 'doughnut',
            data: sourceIPGraphData,
            options: {
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                rotation: -Math.PI,
                legend: {position: 'bottom',},
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Source IP Adress',
                        fontSize: 18
                    }
                }
            },
        });
    }
}
function CreateClassificationChart(intrusionsClassificationFiltered, classificationCounts) {
    var classificationGraphData = {
        labels: intrusionsClassificationFiltered,
        datasets: [{
            label: 'Intrusion Count',
            data: classificationCounts,
            backgroundColor: classDesSouChartColor,
            borderColor: classDesSouChartColor,
            borderWidth: 1
        }]
    };

    if (classificationChart) {
        classificationChart.data = classificationGraphData;
        classificationChart.update();
    } else {
        classificationChart = new Chart(classificationGraph, {
            type: 'doughnut',
            data: classificationGraphData,
            options: {
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                rotation: -Math.PI,
                legend: {position: 'bottom',},
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Classification'
                    }
                }
            },
        });
    }
}
function CreateDestinationIpChart(intrusionsDestinationIPFiltered, destinationIPCounts) {
    var destinationIPGraphData = {
        labels: intrusionsDestinationIPFiltered,
        datasets: [{
            label: 'Intrusions Count',
            data: destinationIPCounts,
            backgroundColor: classDesSouChartColor,
            borderColor: classDesSouChartColor,
            borderWidth: 1
        }]
    };

    if (destinationIPChart) {
        destinationIPChart.data = destinationIPGraphData;
        destinationIPChart.update();
    } else {
        destinationIPChart = new Chart(destinationIPGraph, {
            type: 'doughnut',
            data: destinationIPGraphData,
            options: {
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                rotation: -Math.PI,
                legend: {position: 'bottom',},
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Destination IP Adress'
                    }
                }
            },
        });
    }
}