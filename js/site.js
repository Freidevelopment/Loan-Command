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
    displayPayments(totalMonthPayment, loanAmount, termMonths, interestRate);
    let values = generateValues(totalMonthPayment, loanAmount, termMonths, interestRate);

    displayTable(values);
    
}

// generate the calculations
function generateValues(totalMonthPayment, loanAmount, months, interestRate) {
    let remainingBalance = loanAmount;
    let values = [];
    let oldInterestPayment = 0;
    for(let month = 1; month <= months; month++) {
      
    let interestPayment = generateInterestPayment(remainingBalance, interestRate);
    let totalInterest = oldInterestPayment + interestPayment;
    let principalPayment = generatePrincipalPayment(totalMonthPayment, interestPayment);
    remainingBalance = remainingBalance - principalPayment;
    values.push(month);
    values.push(totalMonthPayment);
    values.push(principalPayment);
    values.push(interestPayment);
    values.push(totalInterest);
    values.push(remainingBalance);
    
  }
  return values;

}
}

// Generate Total Monthly Payment
function generateMonthPayment(loanAmount, months, interestRate) {
    let calculations = (loanAmount) * (interestRate / 1200) / (1 - Math.pow((1 + interestRate / 1200),  (-months)));
    return calculations;
}

// generate Interest Payment
function generateInterestPayment(remainingBalance, interestRate) {
    let calculations = 0;
    calculations = remainingBalance * (interestRate / 1200);
    return calculations;
}
// Principal Payment
function generatePrincipalPayment(totalMonthPayment, interestPayment){
    let calculations = 0;
    calculations = totalMonthPayment - interestPayment;
    return calculations;
}

//Generate a table based on calculations
function displayTable(numberArray) {
    let tableHtml = '<tr>';
    let tbody = document.getElementById('results');

    for(let index = 0; index < numberArray.length; index++) {
        let result = numberArray[index];
        result.toFixed(2);

    
      if(index % 6 == 0) {
        tableHtml += '</tr><tr>'
      }
        tableHtml += `<td>${result}</td>`
        tbody.innerHTML = tableHtml;
      }

}

function displayPayments(totalMonthPayment, loanAmount, months, interestRate) {
    let monthlyPayment = document.getElementById('monthlyPayment');
    let totalLoan = document.getElementById('totalLoan');
    let totalInterest = document.getElementById('totalInterest');
    let totalCost = document.getElementById('totalCost');

    let interestTotal = loanAmount * (interestRate / 1200) * months;
    let fullCost = loanAmount + interestTotal;
    
    monthlyPayment.innerHTML = `${totalMonthPayment}`;
    totalLoan.innerHTML = `${loanAmount}`;
    totalInterest.innerHTML = `${interestTotal}`;
    totalCost.innerHTML = `${fullCost}`;
}