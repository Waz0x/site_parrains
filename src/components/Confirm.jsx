import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");

    function validateForm() {
        return email.length > 0;
    }

    async function handleSubmit(event) {
        const par = email + ":" + localStorage.getItem("parrains").toString()
        event.preventDefault();
        if (par === "") {
            return alert("Vous ne pouvez pas valider sans choisir de parrain")
        }
        if ((email.split("@")[1] === "epitech.eu") || (email.split("@")[1] === "epitech.digital")) {
            alert("Tout est bon merci !")
            fetch("http://51.91.255.204:8080/?email=" + par).then(function (response) {
                if (response.status !== 200) {
                    alert("Something went wrong please contact admin, error:" + response.status.toString())
                } else {
                    alert("Merci de votre participation.\nvous allez etre prevenus dans les plus brefs délais par vos parrains")
                }
            })
        } else {
            alert("Error:\nPlease use your epitech-mail adress (@epitech.eu or @epitech.digital)");
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Confirm
                </Button>
            </Form>
        </div>
    );
}
