import React, { useEffect, useState } from 'react';
import { fetchGoogleSheetsData } from '../services/googleSheetsService';

const DataTable: React.FC = () => {
    // State variables to store the aggregated data
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalEvents, setTotalEvents] = useState<number>(0);
    const [hoursPerMonth, setHoursPerMonth] = useState<Record<string, number>>({});
    const [talentsPerCountry, setTalentsPerCountry] = useState<Record<string, Set<string>>>({});
    const [geoJSON, setGeoJSON] = useState<any>(null);

    useEffect(() => {
        // Fetch data and update state variables when the component mounts
        fetchGoogleSheetsData()
            .then(data => {
                setTotalHours(data.totalHours);
                setTotalEvents(data.totalEvents);
                setHoursPerMonth(data.hoursPerMonth);
                setTalentsPerCountry(data.talentsPerCountry);
                setGeoJSON(data.geoJSON);
            })
            .catch(error => console.error('Error fetching Google Sheets data:', error));
    }, []);

    return (
        <div>
            <h1>Google Sheets Data Aggregation</h1>
            <h2>Total Hours Pledged: {totalHours}</h2>
            <h2>Total Number of Events: {totalEvents}</h2>

            <h3>Hours Pledged Per Month:</h3>
            <ul>
                {Object.entries(hoursPerMonth).map(([month, hours]) => (
                    <li key={month}>
                        {month}: {hours} Hours
                    </li>
                ))}
            </ul>

            <h3>Talents Per Country:</h3>
            <ul>
                {Object.entries(talentsPerCountry).map(([country, talents]) => (
                    <li key={country}>
                        {country}: {Array.from(talents).join(', ')}
                    </li>
                ))}
            </ul>

            <h3>GeoJSON Data:</h3>
            {geoJSON && (
                <pre>{JSON.stringify(geoJSON, null, 2)}</pre>
            )}
        </div>
    );

};

export default DataTable;
