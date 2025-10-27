


import React, { useRef, useState } from "react";
import styles from "./ContactForm.module.scss";
import ContactAnimation from "../../pages/ContactAnimation";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [buttonText, setButtonText] = useState("Send");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  // ✅ Validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      tempErrors.name = "*Name must be at least 2 characters";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      tempErrors.email = "*Enter a valid email address";
    }

    // ✅ Phone number must not be empty and must be exactly 10 digits
    if (!formData.phone) {
      tempErrors.phone = "*Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "*Phone number must be exactly 10 digits";
    }

    if (!formData.message || formData.message.trim().length < 5) {
      tempErrors.message = "*Message must be at least 5 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  // Clear error automatically when user corrects input
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };

    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) newErrors.phone = "Phone number must be 10 digits";
      else delete newErrors.phone;
    } else if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Invalid email format";
      else delete newErrors.email;
    } else {
      if (!value.trim()) newErrors[name] = "This field is required";
      else delete newErrors[name];
    }

    return newErrors;
  });
};


  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSending(true);
    setButtonText("Sending...");

    try {
      const res = await fetch("http://localhost:5007/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setButtonText("Message Sent ✅");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});

        // Reset button after 5 sec
        setTimeout(() => {
          setButtonText("Send");
          setIsSending(false);
        }, 5000);
      } else {
        setButtonText("Error ❌");
        setTimeout(() => {
          setButtonText("Send");
          setIsSending(false);
        }, 3000);
      }
    } catch (err) {
      setButtonText("Server Error ❌");
      setTimeout(() => {
        setButtonText("Send");
        setIsSending(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.card}>
        {/* Left Side Animation */}
        <div className={styles.animationSection}>
          <ContactAnimation />
        </div>

        {/* Right Side Form */}
        <div className={styles.formSection}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              ref={nameRef}
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              disabled={isSending}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, phoneRef)}
              disabled={isSending}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              ref={phoneRef}
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, messageRef)}
              disabled={isSending}
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}

            <textarea
              name="message"
              placeholder="Your Message"
              ref={messageRef}
              value={formData.message}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
              disabled={isSending}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}

            <button type="submit" disabled={isSending}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
