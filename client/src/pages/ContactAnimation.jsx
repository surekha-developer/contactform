import React from "react";
import Lottie from "lottie-react";
import ContactSupportAnimation from "../animations/contactsupportanimation.json";
// import styles from  "../ContactForm.module.scss";
import styles from '../components/ContactForm/ContactForm.module.scss';

function ContactAnimation() {
  return (
    <div className={styles.lottieWrapper}   >
      <Lottie 
        animationData={ContactSupportAnimation} 
        loop={true}   // true = animation repeats
        autoplay={true} // starts automatically
      style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ContactAnimation;
