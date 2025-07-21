// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
});

// Chart instances
let depthDoseChart, lateralDoseChart, resultsChart, statisticalChart;

function initializeCharts() {
    // Depth Dose Distribution Chart
    const depthCtx = document.getElementById('depth-dose-chart').getContext('2d');
    depthDoseChart = new Chart(depthCtx, {
        type: 'line',
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            datasets: [{
                label: 'Without Bolus',
                data: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: false,
                tension: 0.4
            }, {
                label: 'With Custom Bolus',
                data: [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Depth Dose Distribution Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 105,
                    title: {
                        display: true,
                        text: 'Dose (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Depth (cm)'
                    }
                }
            }
        }
    });

    // Lateral Dose Profile Chart
    const lateralCtx = document.getElementById('lateral-dose-chart').getContext('2d');
    lateralDoseChart = new Chart(lateralCtx, {
        type: 'line',
        data: {
            labels: ['-8', '-6', '-4', '-2', '0', '2', '4', '6', '8'],
            datasets: [{
                label: 'Without Bolus',
                data: [20, 40, 70, 90, 100, 90, 70, 40, 20],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: false,
                tension: 0.4
            }, {
                label: 'With Custom Bolus',
                data: [25, 50, 80, 95, 100, 95, 80, 50, 25],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Lateral Dose Profile Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 105,
                    title: {
                        display: true,
                        text: 'Dose (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Distance from Center (cm)'
                    }
                }
            }
        }
    });

    // Results Comparison Chart
    const resultsCtx = document.getElementById('results-chart').getContext('2d');
    resultsChart = new Chart(resultsCtx, {
        type: 'bar',
        data: {
            labels: ['Dose Uniformity', 'Skin Toxicity Reduction', 'Treatment Accuracy', 'Patient Comfort'],
            datasets: [{
                label: 'Standard Bolus',
                data: [75, 60, 85, 70],
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderColor: '#e74c3c',
                borderWidth: 1
            }, {
                label: 'Custom Bolus',
                data: [100, 100, 92, 95],
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                borderColor: '#2ecc71',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Treatment Outcomes Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Performance (%)'
                    }
                }
            }
        }
    });

    // Statistical Analysis Chart
    const statisticalCtx = document.getElementById('statistical-chart').getContext('2d');
    statisticalChart = new Chart(statisticalCtx, {
        type: 'radar',
        data: {
            labels: ['Dose Homogeneity', 'Target Coverage', 'OAR Sparing', 'Treatment Efficiency', 'Cost Effectiveness'],
            datasets: [{
                label: 'Standard Bolus',
                data: [75, 80, 70, 85, 90],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                pointBackgroundColor: '#e74c3c'
            }, {
                label: 'Custom Bolus',
                data: [95, 92, 88, 90, 85],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                pointBackgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comprehensive Performance Analysis'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

function setupEventListeners() {
    const thicknessSlider = document.getElementById('bolus-thickness');
    const thicknessValue = document.getElementById('thickness-value');
    const energySelect = document.getElementById('energy-select');
    const fieldSizeSlider = document.getElementById('field-size');
    const fieldValue = document.getElementById('field-value');

    // Update thickness value display
    thicknessSlider.addEventListener('input', function() {
        thicknessValue.textContent = this.value;
        updateDoseDistribution(parseFloat(this.value), energySelect.value, parseInt(fieldSizeSlider.value));
    });

    // Update energy selection
    energySelect.addEventListener('change', function() {
        updateDoseDistribution(parseFloat(thicknessSlider.value), this.value, parseInt(fieldSizeSlider.value));
    });

    // Update field size
    fieldSizeSlider.addEventListener('input', function() {
        fieldValue.textContent = this.value;
        updateDoseDistribution(parseFloat(thicknessSlider.value), energySelect.value, parseInt(this.value));
    });
}

function updateDoseDistribution(thickness, energy, fieldSize) {
    // Calculate new dose profiles based on parameters
    const depthData = calculateDepthDose(thickness, energy, fieldSize);
    const lateralData = calculateLateralDose(thickness, energy, fieldSize);
    
    // Update depth dose chart
    depthDoseChart.data.datasets[1].data = depthData;
    depthDoseChart.update();

    // Update lateral dose chart
    lateralDoseChart.data.datasets[1].data = lateralData;
    lateralDoseChart.update();

    // Update statistics
    updateDoseStatistics(thickness, energy, fieldSize);
}

function calculateDepthDose(thickness, energy, fieldSize) {
    // Simulate depth dose based on parameters
    const baseDose = [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85];
    const thicknessFactor = thickness * 2;
    const energyFactor = (energy - 6) * 0.5;
    const fieldFactor = (fieldSize - 10) * 0.1;

    return baseDose.map((dose, index) => {
        let newDose = dose + thicknessFactor + energyFactor + fieldFactor;
        return Math.min(105, Math.max(70, newDose));
    });
}

function calculateLateralDose(thickness, energy, fieldSize) {
    // Simulate lateral dose profile
    const baseProfile = [25, 50, 80, 95, 100, 95, 80, 50, 25];
    const thicknessFactor = thickness * 3;
    const energyFactor = (energy - 6) * 1;
    const fieldFactor = (fieldSize - 10) * 0.5;

    return baseProfile.map((dose, index) => {
        let newDose = dose + thicknessFactor + energyFactor + fieldFactor;
        return Math.min(105, Math.max(0, newDose));
    });
}

function updateDoseStatistics(thickness, energy, fieldSize) {
    // Calculate and update dose statistics
    const dmax = 100 + thickness * 3 + (energy - 6) * 0.5;
    const dmin = 85 + thickness * 2 + (energy - 6) * 0.3;
    const hi = 0.85 + thickness * 0.05 + (energy - 6) * 0.01;
    const ci = 0.80 + thickness * 0.04 + (energy - 6) * 0.008;

    document.getElementById('dmax-value').textContent = dmax.toFixed(1) + '%';
    document.getElementById('dmin-value').textContent = dmin.toFixed(1) + '%';
    document.getElementById('hi-value').textContent = hi.toFixed(2);
    document.getElementById('ci-value').textContent = ci.toFixed(2);
}

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
