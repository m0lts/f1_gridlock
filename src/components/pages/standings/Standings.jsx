import { useEffect, useState } from 'react';
import './standings.css'

export default function Standings() {

    const [points, setPoints] = useState([]);
    
    useEffect(() => {
        const fetchUsersPoints = async () => {
            try {
                const response = await fetch('/api/points/GetPoints.js');
                if (response.ok) {
                    const data = await response.json();
                    const filteredData = data.usersPoints;
                    setPoints(filteredData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchUsersPoints();
    }, [])



    console.log(points);
    return (
        <section className="standings_page">
            <h1>Standings</h1>
            {points ? (
            <table className='standings_table'>
                <thead className='standings_table_head'>
                    <tr>
                        <th className='table_col_1'>Position</th>
                        <th className='table_col_2'>Username</th>
                        <th className='table_col_3'>Points</th>
                    </tr>
                </thead>
                <tbody className='standings_table_body'>
                        {points.map((row, index) => (
                            <tr key={index} className='table_row'>
                                <td className='table_col_1 data'>{index + 1}</td>
                                <td className='table_col_2 data'>{row.username}</td>
                                <td className='table_col_3 data'>{row.totalPoints}</td>
                            </tr>
                        ))}
                    
                </tbody>
            </table>
            ) : (
                <div className='loader'></div>
            )}
        </section>
    )
}