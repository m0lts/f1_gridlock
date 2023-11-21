import './standings.css'

export default function Standings() {
    const data = [
        { position: 1, username: 'User1', points: 100 },
        { position: 2, username: 'User2', points: 90 },
        { position: 3, username: 'User3', points: 80 },
        { position: 4, username: 'User4', points: 70 },
      ];

    return (
        <section className="standings_page">
            <h1>Standings</h1>
            <table className='standings_table'>
                <thead className='standings_table_head'>
                    <tr>
                        <th className='table_col_1'>Position</th>
                        <th className='table_col_2'>Username</th>
                        <th className='table_col_3'>Points</th>
                    </tr>
                </thead>
                <tbody className='standings_table_body'>
                    {data.map((row, index) => (
                    <tr key={index} className='table_row'>
                        <td className='table_col_1 data'>{row.position}</td>
                        <td className='table_col_2 data'>{row.username}</td>
                        <td className='table_col_3 data'>{row.points}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}