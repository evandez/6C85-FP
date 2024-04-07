// Initialize the map
const map = L.map('map').setView([37.8, -96], 5); // Set this to the center of your data
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load your dataset
d3.csv("../../data/mapc_data.csv").then(data => {
    console.log("Data loaded:", data);
    // Filter data for one investor type - repeat this process for each type
    const institutionalData = data.filter(d => d.investor_type_purchase === "Institutional");

    // Aggregate data by year and coordinates
    const aggregatedData = d3.nest()
        .key(d => d.date.slice(0, 4)) // Assuming the date is in 'YYYY-MM-DD' format
        .key(d => `${d.lat},${d.lon}`)
        .rollup(leaves => leaves.length) // Count purchases
        .entries(institutionalData);

    // Example of accessing the aggregated data for year 2020 (for instance)
    const year2020Data = aggregatedData.find(d => d.key === "2020");
    const heatLayerData = year2020Data.values.map(d => {
        const [lat, lon] = d.key.split(',');
        return [lat, lon, d.value]; // lat, lon, intensity
    });

    let heat = L.heatLayer(heatLayerData, {radius: 25}).addTo(map);

    // Slider change handler
    document.getElementById('yearSlider').oninput = function() {
        const selectedYear = this.value;
        const selectedData = aggregatedData.find(d => d.key === selectedYear);
        const newHeatLayerData = selectedData ? selectedData.values.map(d => {
            const [lat, lon] = d.key.split(',');
            return [lat, lon, d.value]; // lat, lon, intensity
        }) : [];

        map.removeLayer(heat); // Remove the old heat layer
        heat = L.heatLayer(newHeatLayerData, {radius: 25}).addTo(map); // Add the new heat layer
    };

    // Play button
    document.getElementById('play').onclick = function() {
        let currentYear = parseInt(document.getElementById('yearSlider').min);
        const maxYear = parseInt(document.getElementById('yearSlider').max);
        const interval = setInterval(() => {
            if(currentYear > maxYear) {
                clearInterval(interval);
                return;
            }
            document.getElementById('yearSlider').value = currentYear;
            document.getElementById('yearSlider').dispatchEvent(new Event('input'));
            currentYear++;
        }, 1000); // Adjust the speed as necessary
    };
});
