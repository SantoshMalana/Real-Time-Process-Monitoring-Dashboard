<?php
include 'db_config.php';

$sql = "SELECT * FROM processes";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

$processes = [];
while ($row = $result->fetch_assoc()) {
    $processes[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "cpu" => $row["cpu"],
        "memory" => $row["memory"]
    ];
}

echo json_encode([
    "processes" => $processes,
    "cpuUsage" => rand(1, 100), // Example, update with real calculation
    "memoryUsage" => rand(1, 100)
]);

$conn->close();
?>
