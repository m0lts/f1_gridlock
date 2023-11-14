import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

import './complete_race_rounds.css'
import { useEffect, useState } from 'react'

export default function CompleteRaceRounds({ raceID }) {

    const [apiRequest, setApiRequest] = useState(`rankings/races?race=${raceID}`);
    const [returnedApiData, setReturnedApiData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/externalData/CallAPI', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiRequest),
                });
            
                // Receive returned data and set state with data.
                if (response.ok) {
                    const responseData = await response.json();
                    setReturnedApiData(responseData.result.response);
                    } else {
                    console.log('failure');
                    }
                } catch (error) {
                console.error('Error submitting form:', error);
                }
        }

        fetchData();
    }, [raceID])

    useEffect(() => {
        console.log(returnedApiData)
    }, [returnedApiData])

    const driverP1Abbr = returnedApiData[0].driver.abbr;
    const driverP2Abbr = returnedApiData[1].driver.abbr;
    const driverP3Abbr = returnedApiData[2].driver.abbr;
    const driverP1Img = returnedApiData[0].driver.image;
    const driverP2Img = returnedApiData[1].driver.image;
    const driverP3Img = returnedApiData[2].driver.image;

    return (
        <div className="race_result_podium">
            <div className="race_result_p2">
                <FontAwesomeIcon icon={faTrophy} className='p2_trophy' />
                <img src={driverP2Img} alt="" className='race_result_podium_img'/>
                <p className='race_result_podium_driver_name'>{driverP2Abbr}</p>
                {/* <p className='race_result_podium_bracket'>&#93;</p> */}
            </div>
            <div className="race_result_p1">
                <FontAwesomeIcon icon={faTrophy} className='p1_trophy' />
                <img src={driverP1Img} alt="" className='race_result_podium_img'/>
                <p className='race_result_podium_driver_name'>{driverP1Abbr}</p>
                {/* <p className='race_result_podium_bracket'>&#93;</p> */}
            </div>
            <div className="race_result_p3">
                <FontAwesomeIcon icon={faTrophy} className='p3_trophy' />
                <img src={driverP3Img} alt="" className='race_result_podium_img'/>
                <p className='race_result_podium_driver_name'>{driverP3Abbr}</p>
                {/* <p className='race_result_podium_bracket'>&#93;</p> */}
            </div>
        </div>
    )
}