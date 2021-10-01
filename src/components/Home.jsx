import React, {useRef, useState} from 'react';
import Flippy, {BackSide, FrontSide} from 'react-flippy';
import 'reactjs-popup/dist/index.css';
import data from '../parrains/parrains.json'
import {Container, Row, Col} from 'react-grid-system';
import './home.css'
import Popup from "reactjs-popup";

function choose(props) {
    let string = localStorage.getItem("parrains").toString() + props.id.toString() + ";"
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
    return () => setValue( value + 1); // update the state to force render
}

function truncate(str) {
    return str.length > 20 ? str.substring(0, 17) + "..." : str;
}

function Card(props) {
    const ref = useRef();
    let flipped = false;
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
                - <b>Description:</b> {truncate(par.desc)} <br/>
                - <b>Aime:</b> {truncate(par.like)}<br/>
                - <b>N'aime pas:</b> {truncate(par.nlike)}<br/>
                -<b> Passions:</b> {truncate(par.passion)}<br/>
                <Popup trigger={<button class="rm" onClick={(e) => {e.stopPropagation()}}>Read more</button>}>
                    <div>
                        - <b>Description:</b> {par.desc} <br/>
                        - <b>Aime:</b> {par.like}<br/>
                        - <b>N'aime pas:</b> {par.nlike}<br/>
                        - <b>Passions:</b> {par.passion}<br/>
                    </div>
                </Popup>
                <br/>
                {
                    (!enabled ?
                    <button onClick={function (event) {
                        event.preventDefault();
                        forceUpdate();
                        choose(par);
                        event.stopPropagation()
                    }}>Choisir</button>
                :
                    <button class="disabled" onClick={function (event) {
                        event.preventDefault();
                        forceUpdate()
                        remove(par.id);
                        event.stopPropagation()
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