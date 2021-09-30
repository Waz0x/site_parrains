import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useAppContext } from "../lib/contextLib";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if ((email.split("@")[1] === "epitech.eu") || (email.split("@")[1] === "epitech.digital")) {
            alert("Nice balls bro")
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
