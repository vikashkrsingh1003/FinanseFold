let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalIncome = JSON.parse(localStorage.getItem('totalIncome')) || 0;
let editIndex = null;

function updateBalance() {
    let totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    let balance = totalIncome - totalExpense;
    document.getElementById('totalIncome').textContent = totalIncome;
    document.getElementById('currentBalance').textContent = balance;
}

function addIncome() {
    let income = parseFloat(document.getElementById('incomeAmount').value);
    if (!isNaN(income) && income > 0) {
        totalIncome += income;
        localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
        document.getElementById('incomeAmount').value = '';
        updateBalance();
    }
}

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value;
    if (name && amount && category && date) {
        if (editIndex === null) {
            expenses.push({ name, amount, category, date });
        } else {
            expenses[editIndex] = { name, amount, category, date };
            editIndex = null;
        }
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
    alert("Expanse added successfully")
}

function renderExpenses(filteredExpenses = expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    filteredExpenses.forEach((expense, index) => {
        expenseList.innerHTML += `
            <tr>
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td><button class="edit-btn" onclick="editExpense(${index})">Edit</button></td>
                <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
            </tr>
        `;
    });
}


function filterExpenses() {
    const category = document.getElementById('filterCategory').value;
    const month = document.getElementById('filterMonth').value;
    let filtered = expenses.filter(expense => (category === 'all' || expense.category === category) && (!month || expense.date.startsWith(month)));
    renderExpenses(filtered);
}

function resetFilters() {
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterMonth').value = '';
    renderExpenses();
}

function showMainPage() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('summaryPage').style.display = 'none';
}

function showSummaryPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('summaryPage').style.display = 'block';
    renderExpenses();
}

// function editExpense(index) {
//     const expense = expenses[index];
//     document.getElementById('expenseName').value = expense.name;
//     document.getElementById('expenseAmount').value = expense.amount;
//     document.getElementById('expenseCategory').value = expense.category;
//     document.getElementById('expenseDate').value = expense.date;
//     editIndex = index;
  
// }

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    alert("Expanse delete success")
}

updateBalance();
renderExpenses();