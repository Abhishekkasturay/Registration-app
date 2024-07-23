import React, { useEffect, useState } from 'react';
 
const Home = () => {

    const [username, setUsername] = useState('');
    const [show, setShow] = useState(false);

    const callHomePage = async () => {
        try {

            const token = localStorage.getItem("jwtToken");
            const response = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            });

            const data = await response.json();
            // console.log(data);
            setUsername(data.name);

            if(data){
                setShow(true);
            }

            if (!response.status === 200) {
                throw new Error(response.error)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])

    return(
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{username}</h1>
                    <h2>{show ? 'Happy, to see you back' : 'We Are The MERN Developer'}</h2>
                </div>
            </div>
        </>
    )
}

export default Home