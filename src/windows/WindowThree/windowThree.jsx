import React from "react";
import CalculatePointsGained from "../../utils/calculatePointsGained";
import { Drivers } from "../../hooks/ergastAPIQueries";
import "../../assets/global.css";

export default function WindowThree() {
    return (
        <div className="windowThree">
            <h3 className="standingsWindowTitle">Global Standings</h3>
            <CalculatePointsGained />
        </div>
    )
}