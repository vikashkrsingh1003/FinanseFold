


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalIncome = JSON.parse(localStorage.getItem('totalIncome')) || 0;

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
alert("income added succusesful")
}



function renderExpenses(filteredExpenses = expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    let total = 0;
    filteredExpenses.forEach((expense) => {
        total += parseFloat(expense.amount);
        expenseList.innerHTML += `
            <tr>
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
        //  <td><button onclick= "dlt( '${expense.name}') "> Delete </button> </td>
        //  <td><button onclick= "myedit( '${expense.id}') "> EDIT </button> </td>
 
            </tr>
        `;
    });

    document.getElementById('summaryTotalExpenses').textContent = `₹${total}`;
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateBalance();
}

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value;
    if (name && amount && category && date) {
        expenses.push({ name, amount, category, date });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateBalance();
    }
    alert("Expances added sucussesfully")
}

// function dlt() {
//     const name = document.getElementById('expenseName').value;
    
//     if (name) {
//         let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//         // Filter out the expense with the given name
//         expenses = expenses.filter(expense => expense.name !== name);

//         // Save the updated list back to localStorage
//         localStorage.setItem('expenses', JSON.stringify(expenses));

//         updateBalance();
//         alert("Expense deleted successfully");
//     } else {
//         alert("Please enter a valid expense name to delete");
//     }
// }


function showSummaryPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('summaryPage').style.display = 'block';
    renderExpenses();
}

function showMainPage() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('summaryPage').style.display = 'none';
}

updateBalance();
renderExpenses();