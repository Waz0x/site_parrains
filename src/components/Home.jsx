import React, {useRef} from "react";
import Flippy, {BackSide, FrontSide} from "react-flippy";
import MN from "../Mage_Noir.png";
import 'reactjs-popup/dist/index.css';

function Sample() {
    const ref = useRef();
    return (
        <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={ref}
            style={{ width: '250px', height: '250px' }}
        >
            <FrontSide style={{ backgroundColor: '#41669d'}} >
                <img
                    src={MN}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    alt={"Mage Noir"}
                />
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852'}}>
                - Description <br/>
                - Aime <br/>
                - Aime pas <br/>
                - Passions <br/>
                <button onClick={() => { ref.current.toggle(); }}>Choose</button>
            </BackSide>
        </Flippy>
    )
}

function Home() {
    return (
        <div className="home">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <Sample></Sample>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;