import './drivers.css'

export default function Drivers({ drivers, setSelectedDrivers, setDrivers, selectedDrivers, raceInfo }) {

    const handleDriverClick = (driverData) => {
        if (selectedDrivers.length <= 9) {
            setDrivers(prevDrivers => prevDrivers.filter(driver => driver !== driverData));
            const isDriverInSelected = selectedDrivers.some(driver => driver === driverData);
            if (!isDriverInSelected) {
                setSelectedDrivers(prevDrivers => [...prevDrivers, driverData]);
            }
        }
    };

    return (
        <div className="predictions_page_section">
            {raceInfo ? (
                <ul className='driver_list'>
                {drivers.map((driverData, index) => (
                    <li key={index} className="driver_container" onClick={() => handleDriverClick(driverData)}>
                    <p className='driver_number'>{driverData.driver.number}</p>
                    <img className="driver_img" src={driverData.driver.image} alt={driverData.driver.name} />
                    <p className="driver_abbr">
                        {/* If driver.abbr isnt true, make the abbr */}
                        {!driverData.driver.abbr ? (
                            driverData.driver.name.split(' ').slice(-1)[0].slice(0, 3)
                        ) : (
                            driverData.driver.abbr
                        )}
                    </p>
                </li>
                ))}
                {/* <li>{drivers[0].driver.name}</li> */}
            </ul>
            ) : (
                <div className="loader"></div>
            )}
        </div>
    )
}