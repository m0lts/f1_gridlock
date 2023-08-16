import GrandPrix from '../windows/Hero/grandPrix';
import WindowOne from '../windows/WindowOne/windowOne';
import WindowTwo from '../windows/WindowTwo/windowTwo';
import WindowThree from '../windows/WindowThree/windowThree';
import WindowFour from '../windows/WindowFour/windowFour';

export default function Body() {
    return (
        <>
            <GrandPrix />
            <section className="sectionOne">
            <WindowOne />
            <WindowTwo />
            </section>
            {/* <section className="sectionTwo">
            <WindowThree />
            <WindowFour />
            </section> */}
        </>
    )
}