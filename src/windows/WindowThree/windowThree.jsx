import React from "react";
import GlobalStandings from "../../components/standings";
import "../../assets/global.css";

export default function WindowThree() {
    return (
        <div className="windowThree">
            <h3 className="standingsWindowTitle">Global Standings</h3>
            <GlobalStandings />
        </div>
    )
}