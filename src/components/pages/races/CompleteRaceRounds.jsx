import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import './complete_race_rounds.css'
import { useEffect, useState } from 'react'

export default function CompleteRaceRounds({ raceID, podiumResult, fullResult }) {

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
                    if (responseData.result.response) {
                        setReturnedApiData(responseData.result.response);
                    }
                    } else {
                    console.log('failure');
                    }
                } catch (error) {
                console.error('Error submitting form:', error);
                }
        }

        fetchData();
    }, [raceID])

    return (
        <>
        {returnedApiData ? (
            <>
        {podiumResult && (
                <div className="race_result_podium">
                    <div className="race_result_p2">
                        <FontAwesomeIcon icon={faTrophy} className='p2_trophy' />
                        <img src={returnedApiData[1].driver.image} alt="" className='race_result_podium_img'/>
                        <p className='race_result_podium_driver_name'>{returnedApiData[1].driver.abbr}</p>
                        {/* <p className='race_result_podium_bracket'>&#93;</p> */}
                    </div>
                    <div className="race_result_p1">
                        <FontAwesomeIcon icon={faTrophy} className='p1_trophy' />
                        <img src={returnedApiData[0].driver.image} alt="" className='race_result_podium_img'/>
                        <p className='race_result_podium_driver_name'>{returnedApiData[0].driver.abbr}</p>
                        {/* <p className='race_result_podium_bracket'>&#93;</p> */}
                    </div>
                    <div className="race_result_p3">
                        <FontAwesomeIcon icon={faTrophy} className='p3_trophy' />
                        <img src={returnedApiData[2].driver.image} alt="" className='race_result_podium_img'/>
                        <p className='race_result_podium_driver_name'>{returnedApiData[2].driver.abbr}</p>
                        {/* <p className='race_result_podium_bracket'>&#93;</p> */}
                    </div>
                </div>
        )}      
        {fullResult && (
            <div className="race_result_full">
                {returnedApiData.map((position, index) => (
                    <div key={index}>
                        <p>{position.driver.abbr}</p>
                    </div>
                ))}
            </div>
        )}
        </>
        ) : (
            <div className="homepage_loader">
                <div className='loader'></div>
            </div>
        )}
        </>
    )
}