import CalculatePointsGained from "../../../utils/CalculatePointsGained";

export default function WindowThree() {

    const { points } = CalculatePointsGained();

    console.log(points)

    return (
        <div className="windowThree">
            <h3 className="standingsWindowTitle">Global Standings</h3>
            <p>{points}</p>
        </div>
    )
}