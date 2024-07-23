import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);

    const Navigate = useNavigate();

    const callLogoutPage = async () => {
        try {

            const response = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-type": "application/json"
                },
            });

            const data = await response.json();
            console.log(response.status);
        
            if (response.status !== 200) {
                throw new Error(response.error);
            }else{
                dispatch({ type: "USER", payload: false })
                Navigate('/login', { replace: true });
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callLogoutPage();
    }, [])


    return (
        <>
            <h1>Logout Page</h1>
        </>
    )
};

export default Logout;