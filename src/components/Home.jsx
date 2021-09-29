import React, {useRef, useState} from "react";
import Flippy, {BackSide, FrontSide} from "react-flippy";
import 'reactjs-popup/dist/index.css';
import data from '../parrains/parrains.json'
import {Container, Row, Col} from "react-grid-system";
import './home.css'

function choose(props) {
    if (parseInt(localStorage.getItem("number")) >= parseInt(process.env.REACT_APP_MAX_PAR)) {
        return alert("Tu ne peux pas ajouter plus de " + process.env.REACT_APP_MAX_PAR + " parrains")
    }
    localStorage.setItem("number", (parseInt(localStorage.getItem("number")) + 1).toString())
    localStorage.setItem("parrain" + localStorage.getItem("number"), props.id.toString())
}

function Sample(props) {
    const ref = useRef();
    const par = props.par
    return (
        <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            style={{ width: '250px', height: '250px' }}
        >
            <FrontSide style={{ backgroundColor: '#41669d'}} >
                <img
                    src={process.env.PUBLIC_URL + `/images/${par.img}`}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    alt={"Image"}
                />
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852'}}>
                - Description: {par.desc} <br/>
                - Aime {par.like}<br/>
                - Aime pas {par.nlike}<br/>
                - Passions {par.passion}<br/>
                <button onClick={() => { choose(par); }}>Choisir</button>
            </BackSide>
        </Flippy>
    )
}

function Home() {
    let len = Object.keys(data.parrains).length;
    let size = Math.trunc(Math.sqrt(len))
    const [parrains, setParrains] = useState(data.parrains)
    var rows = [];
    for (var i = 0; i < len; i++) {
        console.log(parrains[i])
        rows.push(<Col><Sample par={parrains[i]}/></Col>)
    }

    return (
        <div className="home">
            <div class="container">
                <div class="row align-items-center my-5">
                        <Container fluid>
                            <Row>
                                {rows}
                            </Row>
                        </Container>
                </div>
            </div>
        </div>
    );
}

export default Home;