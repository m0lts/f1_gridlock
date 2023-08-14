// PASS PROPS DOWN FROM NEXTRACE.JS TO FILL CLASSNAMES FOR DIFFERENT TABLE STYLING 
import React from "react";
import "../assets/global.css";
import brazil_flag from "../assets/interface/media/flags/brazil_flag.svg";

export default function GlobalStandings() {
    return(
        <table className="globalStandingsTable window">
            <tr className="tableRow">
                <th className="tHeader"><span className="tHeaderWide">Position</span><span className="tHeaderNarrow">Pos.</span></th>
                <th className="tHeader"><span className="tHeaderWide">Nationality</span><span className="tHeaderNarrow">Nat.</span></th>
                <th className="tHeader">Username</th>
                <th className="tHeader">Points</th>
            </tr>
            <tr>
                <td className="tPos">1.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">2.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">3.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">4.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">5.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">6.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">7.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">8.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">9.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">10.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">11.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">12.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">13.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">14.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">15.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">16.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
            <tr>
                <td className="tPos">17.</td>
                <td className="tFlag"><img src={brazil_flag} alt="Brazil" className="natTableFlag" /></td>
                <td className="tUser">braziliansmoke</td>
                <td className="tPoints">298</td>
            </tr>
        </table>
    )
}