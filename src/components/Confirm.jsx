import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import webhook from "webhook-discord";

export default function Login() {
    const [email, setEmail] = useState("");
    const wh = new webhook.Webhook(process.env.REACT_APP_WEBHOOK_URL)

    function validateForm() {
        return email.length > 0;
    }

    async function handleSubmit(event) {
        const par = localStorage.getItem("parrains").toString()
        event.preventDefault();
        if (par === "") {
            return alert("Vous ne pouvez pas valider sans choisir de parrain")
        }
        if ((email.split("@")[1] === "epitech.eu") || (email.split("@")[1] === "epitech.digital")) {
            alert("good")
            wh.info("New response", "Mail: " + email + "\nId: " + par.split(';').join(' '))
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
