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
    const [loanAmount, setLoanAmount] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
    const [loanId, setLoanId] = useState('');
    const [loans, setLoans] = useState([]);
    const [loanDetails, setLoanDetails] = useState(null);

    // Function to handle loan request
    const requestLoan = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/add-loan", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
            // const data = await response.json();
            alert('Loan requested successfully!');
            // console.log(data);
        } catch (error) {
            console.error('Error requesting loan:', error);
        }
    };

    // Function to fetch all loans
    const fetchLoans = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/fetch-all-loan", fetchrequestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
            const data = await response.json();
            setLoans(data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    // Function to check loan details
    const checkLoanDetails = async () => {
        try {
            const response = await fetch("https://webliststudio.ng/loan/api/prod/admin/loan/fetch-single-loan", singlerequestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
            const data = await response.json();
            setLoanDetails(data);
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
                    <label>Loan Amount:</label><br />
                    <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} /><br /><br />

                    <label>Loan Duration (months):</label><br />
                    <input type="number" value={loanDuration} onChange={e => setLoanDuration(e.target.value)} /><br /><br />

                    <button onClick={requestLoan} className="button">Request Loan</button>
                </div>

                <h2>Fetch All Loans</h2>
                <button onClick={fetchLoans} className="button">Get All Loans</button>
                <div className="result">
                    {loans.length > 0 && (
                        <ul>
                            {loans.map(loan => (
                                <li key={loan.id}>
                                    Loan ID: {loan.id}, Amount: {loan.amount}, Status: {loan.status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2>Check Loan Details</h2>
                <div>
                    <label>Loan ID:</label><br />
                    <input type="text" value={loanId} onChange={e => setLoanId(e.target.value)} /><br /><br />
                    <button onClick={checkLoanDetails} className="button">Check Details</button>
                </div>
                <div className="result">
                    {loanDetails && (
                        <div>
                            <p>Loan ID: {loanDetails.id}</p>
                            <p>Amount: {loanDetails.amount}</p>
                            <p>Status: {loanDetails.status}</p>
                            <p>Duration: {loanDetails.duration}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
