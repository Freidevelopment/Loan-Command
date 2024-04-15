// Collect user inputs
function getValues() {
  let loanAmount = document.getElementById(loanAmount).value;
  let termMonths = document.getElementById(term-Months).value;
  let interestRate = document.getElementById(interestRate).value;

  loanAmount = Number(loanAmount);
  termMonths = Number(termMonths);
  interestRate = Number(interestRate);
  
  // Validate user inputs
  if (isNaN(fizzNumber) || isNaN(buzzNumber) || isNaN(stopValue)) {
      // display an error message
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please enter valid numbers for Loan Command to use',
        backdrop: false
    });
  } else {
    let totalMonthPayment = generateMonthPayment(loanAmount, termMonths, interestRate);
    let calculationResults = generateCalculations(loanAmount, termMonths, interestRate, totalMonthPayment);

  }

}

// generate the calculations
  // Generate Total Monthly Payment
function generateMonthPayment(loanAmount, Months, interestRate){
  let calculation = 0;
  calculation =(loanAmount) * (interestRate / 1200) / (1 - (1 + interestRate / 1200)^(-Months) );
  return calculation;
}  

function generateCalculations(loanAmount, Months, interestRate, totalMonthPayment) {
  // generate Interest Payment
  // Principal Payment
  // Remaining Balance

}

//Generate a table based on calculations
function displayTable {

} 