import React, { useState } from 'react';
import './App.css';

const myHeaders = new Headers();
myHeaders.append("apiKey", "f3f68f9fb56337fbe3842c8fb9ee54e9");

const singleformdata = new FormData();
singleformdata.append("loan_id", "LOAN00720240912100617");

const singlerequestOptions = {
    method: "POST",
    headers: myHeaders,
    body: singleformdata,
    redirect: "follow"
};

const requestformdata = new FormData();
requestformdata.append("full_name", "Mike Afolabi");
requestformdata.append("mobile_no", "08131252996");
requestformdata.append("email_address", "sunaf4real@gmail.com");
requestformdata.append("loan_amount", "600000");
requestformdata.append("loan_repayment_duration", "6");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: requestformdata,
  redirect: "follow"
};

const fetchformdata = new FormData();
fetchformdata.append("loan_id", "");
fetchformdata.append("status_id", "");
fetchformdata.append("search_keywords", "");

const fetchrequestOptions = {
  method: "POST",
  headers: myHeaders,
  body: fetchformdata,
  redirect: "follow"
};


function App() {
    // State variables
    const [loans, setLoans] = useState([]);
    const [loanDetails, setLoanDetails] = useState(null);
    const [loanRepayment, setRepayment] = useState([]);

    // Function to handle loan request
    const requestLoan = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/add-loan", requestOptions)
            .then((response) => response.text());
            const data = await response.text();
            alert('Loan requested successfully!');
            console.log(data);
        } catch (error) {
            console.error('Error requesting loan:', error);
        }
    };

    // Function to fetch all loans
    const fetchLoans = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/fetch-all-loan", fetchrequestOptions);
            const data = await response.json();
            setLoans(data.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    // Function to check loan details
    const checkLoanDetails = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/fetch-single-loan", singlerequestOptions);
            const data = await response.json();
            console.log(data.data[0]);
            setLoanDetails(data.data[0]);
            setRepayment(data.data[0].repayment_schedule);
        } catch (error) {
            console.error('Error fetching loan details:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Prime Base - Microfinance Loan Lending</h1>
                <p>Your Trusted Partner in Financial Growth</p>
            </header>

            <div className="container">
                <h2>Request a Loan</h2>
                <div>
                    <button onClick={requestLoan} className="button">Request Loan</button>
                </div>

                <h2>Fetch All Loans</h2>
                <button onClick={fetchLoans} className="button">Get All Loans</button>
                <div className="result">
                    {loans.length > 0 && (
                        <ul>
                            {loans.map(loan => (
                                <li key={loan.sn}>
                                    Name: {loan.full_name}<br/>
                                    Loan ID: {loan.loan_id}<br/>
                                    Amount: {loan.loan_amount}<br/>
                                    Status: {loan.status_name}<br/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2>Check Loan Details</h2>
                <div>
                    <button onClick={checkLoanDetails} className="button">Check Details</button>
                </div>
                <div className="result">
                    {loanDetails && (
                        <div>
                            <p>Name: {loanDetails.full_name}</p>
                            <p>Loan ID: {loanDetails.loan_id}</p>
                            <p>Loan Amount: {loanDetails.loan_amount}</p>
                            <p>Status: {loanDetails.status_name}</p>
                            <p>Mobile Number: {loanDetails.mobile_no}</p>
                            <p>Email: {loanDetails.email_address}</p>
                            <ul>
                                {loanRepayment.map(loan => (
                                    <li key={loan.sn}>
                                        Loan Interest: {loan.loan_interest}<br/>
                                        Month: {loan.month}<br/>
                                        Total Due this month: {loan.monthly_repayment}<br/>
                                        Due Date: {loan.repayment_due_date}<br/>
                                        Loan Balance after payment: {loan.loan_balance}
                                    </li>
                                ))}
                            </ul>
                            <p>Total Loan Repayment: {loanDetails.total_loan_repayment}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
