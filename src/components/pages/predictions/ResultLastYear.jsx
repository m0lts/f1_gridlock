import { LastYearResult } from "../../../hooks/ErgastAPIQueries";

export default function ResultLastYear({...props}) {


    // Retrieve last year result from LastYearResult hook
    const result = LastYearResult();

    return (
        <>
        <h1>
            {props.title}
        </h1>
        <ul>
                {/* Render last year's result */}
                {result.position.map((position, index) => (
                    <li key={index}>
                        {position} - {result.driverNumber[index]} - {result.lastNames[index]} - {result.team[index]}
                    </li>
                ))}
            </ul>
        </>
    )
}