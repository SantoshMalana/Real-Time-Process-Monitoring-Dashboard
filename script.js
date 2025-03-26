document.addEventListener("DOMContentLoaded", function() {
    function fetchData() {
        fetch("get_data.php")
            .then(response => response.json())
            .then(data => {
                updateTable(data.processes);
                updateCharts(data.cpuUsage, data.memoryUsage);
            });
    }

    function updateTable(processes) {
        let tableBody = document.getElementById("processTable");
        tableBody.innerHTML = "";
        processes.forEach(proc => {
            let row = `<tr>
                <td>${proc.id}</td>
                <td>${proc.name}</td>
                <td>${proc.cpu}%</td>
                <td>${proc.memory}%</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    function updateCharts(cpu, memory) {
        let timeLabel = new Date().toLocaleTimeString();
    
        cpuChart.data.labels.push(timeLabel);
        cpuChart.data.datasets[0].data.push(cpu);
        memoryChart.data.labels.push(timeLabel);
        memoryChart.data.datasets[0].data.push(memory);
    
        cpuChart.update();
        memoryChart.update();
    }
    

    setInterval(fetchData, 3000);

    let cpuChart = new Chart(document.getElementById("cpuChart"), {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "CPU Usage",
                data: [],
                borderColor: "red",
                fill: false
            }]
        }
    });
    
    let memoryChart = new Chart(document.getElementById("memoryChart"), {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Memory Usage",
                data: [],
                borderColor: "blue",
                fill: false
            }]
        }
    });
});
