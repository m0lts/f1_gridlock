import React from "react";
import GlobalStandings from "../../components/standings";
import "../../assets/global.css";

export default function WindowFour() {
    return (
        <div className="windowFour">
            <h3 className="standingsWindowTitle">Global Standings</h3>
            <GlobalStandings />
        </div>
    )
}