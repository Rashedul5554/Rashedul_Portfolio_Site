// Show/hide "Other" details in checklist
document.getElementById('other-checkbox').addEventListener('change', function() {
    document.getElementById('other-details-container').style.display = this.checked ? 'block' : 'none';
});

// Navigation: Checklist to Expenses section
document.getElementById('to-expenses-btn').addEventListener('click', function() {
    document.getElementById('checklist-section').style.display = 'none';
    document.getElementById('expenses-section').style.display = 'block';
    // Set today's date for date-submitted
    document.getElementById('date-submitted').value = new Date().toISOString().slice(0,10);
});

// --- Daily Itemized Expenses Table Logic ---
function addExpenseRow() {
    const tbody = document.querySelector('#expenses-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="date" class="expense-date" required></td>
        <td><input type="number" class="expense air-rail" min="0" step="0.01"></td>
        <td><input type="number" class="expense hotel" min="0" step="0.01"></td>
        <td><input type="number" class="expense breakfast" min="0" step="0.01"></td>
        <td><input type="number" class="expense lunch" min="0" step="0.01"></td>
        <td><input type="number" class="expense dinner" min="0" step="0.01"></td>
        <td><input type="number" class="expense bus-taxi" min="0" step="0.01"></td>
        <td><input type="text" class="daily-total" readonly></td>
        <td><button type="button" class="remove-row">Remove</button></td>
    `;
    tbody.appendChild(row);
}
document.getElementById('add-expense-row').addEventListener('click', addExpenseRow);

// Initial row
addExpenseRow();

// Calculate daily totals and grand total
function calculateDailyTotals() {
    document.querySelectorAll('#expenses-table tbody tr').forEach(row => {
        let sum = 0;
        row.querySelectorAll('.expense').forEach(input => {
            sum += parseFloat(input.value) || 0;
        });
        row.querySelector('.daily-total').value = sum ? sum.toFixed(2) : '';
    });
    calculateGrandTotal();
}

// Remove row logic
document.querySelector('#expenses-table').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-row')) {
        e.target.closest('tr').remove();
        calculateDailyTotals();
    }
});

// Listen for input changes in expenses table
document.querySelector('#expenses-table').addEventListener('input', function(e) {
    if (e.target.classList.contains('expense')) {
        calculateDailyTotals();
    }
});

// --- Auto Travel Calculation ---
function calculateAutoTravel() {
    const initial = parseFloat(document.getElementById('initial-miles').value) || 0;
    const final = parseFloat(document.getElementById('final-miles').value) || 0;
    const toll = parseFloat(document.getElementById('toll-charge').value) || 0;
    const totalMiles = Math.max(final - initial, 0);
    document.getElementById('total-miles').value = totalMiles ? totalMiles : '';
    const finalAutoTravel = (totalMiles * 0.7) + toll;
    document.getElementById('final-auto-travel').value = (totalMiles ? finalAutoTravel.toFixed(2) : '');
    calculateGrandTotal();
}
['initial-miles', 'final-miles', 'toll-charge'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateAutoTravel);
});

// --- Grand Total Calculation ---
function calculateGrandTotal() {
    let dailyTotal = 0;
    document.querySelectorAll('.daily-total').forEach(input => {
        dailyTotal += parseFloat(input.value) || 0;
    });
    const finalAutoTravel = parseFloat(document.getElementById('final-auto-travel').value) || 0;
    document.getElementById('grand-total').value = (dailyTotal + finalAutoTravel).toFixed(2);
}

// --- Signature Canvas Logic ---
const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let drawing = false, lastX = 0, lastY = 0;

canvas.addEventListener('mousedown', e => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

// Touch support
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.touches[0].clientX - rect.left;
    lastY = e.touches[0].clientY - rect.top;
});
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
});
canvas.addEventListener('touchend', () => drawing = false);

document.getElementById('clear-signature').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Prevent form submission for demo
document.getElementById('voucher-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted! (Demo only)');
});