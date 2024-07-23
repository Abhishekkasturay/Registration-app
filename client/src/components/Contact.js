import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      console.log("Retrieved Token:", token); // Debugging statement

      const response = await fetch("/getdata", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      }));
    } catch (error) {
      console.log("Error in callContactPage:", error.message); // Debugging statement
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const token = localStorage.getItem("jwtToken");
    console.log("Sending Token:", token); // Debugging statement

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await response.json();

      if (!data) {
        console.log("Message not sent");
      } else {
        alert("Message Sent");
        setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
      }
    } catch (error) {
      console.log("Error in contactForm:", error.message); // Debugging statement
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/office/24/000000/iphone.png"
                      alt="Phone"
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Phone</div>
                    <div className="contact_info_text">+91 8659888967</div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png"
                      alt="Email"
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">
                      contact@abhishekkasturay2@gmail.com
                    </div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img
                      src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png"
                      alt="Address"
                    />
                  </div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Address</div>
                    <div className="contact_info_text">Jhansi, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      placeholder="Your name"
                      required
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      onClick={contactForm}
                      className="button contact_submit_button"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
