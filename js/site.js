// Collect user inputs
function getValues() {
  let loanAmount = document.getElementById('loanAmount').value;
  let termMonths = document.getElementById('term-Months').value;
  let interestRate = document.getElementById('interestRate').value;

  loanAmount = Number(loanAmount);
  termMonths = Number(termMonths);
  interestRate = Number(interestRate);

  // Validate user inputs
  if (isNaN(loanAmount) || isNaN(termMonths) || isNaN(interestRate)) {
    // display an error message
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Please enter valid numbers for Loan Command to use',
      backdrop: false
    });
  } else {
    let totalMonthPayment = generateMonthPayment(loanAmount, termMonths, interestRate);
    let values = generateValues(totalMonthPayment, loanAmount, termMonths, interestRate);
    
    displayTable(values, loanAmount);

  }

}

// generate the calculations
function generateValues(totalMonthPayment, loanAmount, months, interestRate) {
  let remainingBalance = loanAmount;
  let values = [];
  let totalInterest = 0;
  for (let i = 1; i <= months; i++) {
    let interestPayment = generateInterestPayment(remainingBalance, interestRate);
    totalInterest = totalInterest + interestPayment;
    let principalPayment = generatePrincipalPayment(totalMonthPayment, interestPayment);
    remainingBalance = remainingBalance - principalPayment;
    
     let loanPayment = {
       month: i,
       interestPayment: interestPayment,
       totalInterest: totalInterest,
       totalMonthPayment: totalMonthPayment,
       principalPayment: principalPayment,
       remainingBalance: remainingBalance
     };
    
     values.push(loanPayment);

  }

  return values;

}

// Generate Total Monthly Payment
function generateMonthPayment(loanAmount, months, interestRate) {
  let calculations = (loanAmount) * (interestRate / 1200) / (1 - Math.pow((1 + interestRate / 1200), (-months)));
  return calculations;
}

// generate Interest Payment
function generateInterestPayment(remainingBalance, interestRate) {
  let calculations = 0;
  calculations = remainingBalance * (interestRate / 1200);
  return calculations;
}
// Principal Payment
function generatePrincipalPayment(totalMonthPayment, interestPayment) {
  let calculations = 0;
  calculations = totalMonthPayment - interestPayment;
  return calculations;
}

//Generate a table based on calculations
function displayTable(numberArray, loanAmount) {
  let total = 0;
  let tableHtml = '';
  let tbody = document.getElementById('results');

  let monthlyPayment = document.getElementById('monthlyPayment');
  let totalLoan = document.getElementById('totalLoan');
  let totalCost = document.getElementById('totalCost');
  let displayInterest = document.getElementById('displayInterest');

  let decimalLoan = loanAmount.toFixed(2);
  
  for (let index = 0; index < numberArray.length; index++) {
    total = loanAmount + numberArray[index].totalInterest;
    
    let month = numberArray[index].month;
    let interestPayment = numberArray[index].interestPayment;
    let totalInterest = numberArray[index].totalInterest;
    let totalMonthPayment = numberArray[index].totalMonthPayment;
    let principalPayment = numberArray[index].principalPayment;
    let remainingBalance = numberArray[index].remainingBalance;
    
    let decimalInterest = interestPayment.toFixed(2);
    let decimalTotalInterest = totalInterest.toFixed(2);
    let decimalMonthPayment = totalMonthPayment.toFixed(2);
    let decimalPrincipal = principalPayment.toFixed(2);
    let decimalBalance = remainingBalance.toFixed(2);
    let decimalTotal = total.toFixed(2);

    
    tableHtml += `<tr><td>${month}</td><td>$${decimalMonthPayment}</td>
        <td>$${decimalPrincipal}</td><td>$${decimalInterest}</td>
        <td>$${decimalTotalInterest}</td><td>$${decimalBalance}</td></tr>`
    tbody.innerHTML = tableHtml;
    
    monthlyPayment.innerHTML = `$ ${decimalMonthPayment}`;
    totalLoan.innerHTML = `$ ${decimalLoan}`;
    displayInterest.innerHTML = `$ ${decimalTotalInterest}`;
    totalCost.innerHTML = `$ ${decimalTotal}`;
  }

}
