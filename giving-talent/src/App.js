//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetID = process.env.REACT_APP_GOOGLE_SHEET_ID; // Replace with your Google Sheet ID
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with your Google Sheets API Key
      const range = 'Sheet1';

      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`
      );

      setData(response.data.values);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Google Sheets Data</h1>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
