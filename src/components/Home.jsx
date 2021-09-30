import React, {useRef, useState} from 'react';
import Flippy, {BackSide, FrontSide} from 'react-flippy';
import 'reactjs-popup/dist/index.css';
import data from '../parrains/parrains.json'
import {Container, Row, Col} from 'react-grid-system';
import './home.css'
import '../lib/dbHandler'

function choose(props) {
    let string = localStorage.getItem("parrains").toString() + props.id.toString() + ";"
    console.log(string)
    if (parseInt(localStorage.getItem("number")) >= parseInt(process.env.REACT_APP_MAX_PAR)) {
        return alert("Tu ne peux pas ajouter plus de " + process.env.REACT_APP_MAX_PAR + " parrains")
    }
    localStorage.setItem("number", (parseInt(localStorage.getItem("number")) + 1).toString())
    localStorage.setItem("parrains", string.toString())
}

function remove(props) {
    let string = localStorage.getItem("parrains")
    let array = string.split(";")
    if (parseInt(localStorage.getItem("number")) === 0) {
        return alert("Tu as 0 parrains tu ne peux pas en retirer plus")
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i].toString() === props.toString()) {
            array.splice(i, 1)
            localStorage.setItem("number", (parseInt(localStorage.getItem("number")) - 1).toString())
            localStorage.setItem("parrains", array.join(";"))
        }
    }
    console.log(array)
}

function isEnabled(id) {
    let par = localStorage.getItem("parrains");
    let array = par.split(";");

    for (let i = 0; i < array.length - 1; i++)
        if (array[i].toString() === id.toString())
            return true
    return false
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Card(props) {
    const ref = useRef();
    const par = props.par
    const enabled = isEnabled(par.id)
    const forceUpdate = useForceUpdate();
    return (
        <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            style={{ width: '250px', height: '250px' }}
        >
            <FrontSide style={{ backgroundColor: 'rgba(65,102,157,0)'}} >
                <img
                    src={process.env.PUBLIC_URL + `/images/${par.img}`}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    alt={"Error, contact an admin if the problem persist"}
                />
            </FrontSide>
            <BackSide style={{ backgroundColor: 'rgba(23,88,82,0)'}}>
                - Description: {par.desc} <br/>
                - Aime {par.like}<br/>
                - Aime pas {par.nlike}<br/>
                - Passions {par.passion}<br/>
                {
                    (!enabled ?
                    <button onClick={function (event) {
                        event.preventDefault();
                        forceUpdate();
                        choose(par);
                    }}>Choisir</button>
                :
                    <button class="disabled" onClick={function (event) {
                        event.preventDefault();
                        forceUpdate()
                        remove(par.id);
                    }}>Supprimer</button>)
                }
                </BackSide>
        </Flippy>
    )
}

function Home() {
    let len = Object.keys(data.parrains).length;
    const [parrains, setParrains] = useState(data.parrains)
    var rows = [];
    for (var i = 0; i < len; ++i) {
        console.log(parrains[i])
        rows.push(<Col><Card par={parrains[i]}/></Col>)
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