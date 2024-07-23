'use client'
import { useState } from "react";
import RestaurantHeader from "../_componet/Header";
import RestaurantLogin from "../_componet/RestaurantLogin";
import RestaurantSignup from "@/app/_componet/RestaurantSignup";
import styles from "../styles/Restaurant.module.css";
import Footer from "../_componet/footer"

const Restaurant = () => {
    const [login, setLogin] = useState(true);

    const handleSignupSuccess = () => {
        setLogin(true); 
    };

    return (
            <div className="container">
                <title>Restaurant Login/Signup Page</title>
                <RestaurantHeader />
                <h1>Restaurant Login/Signup Page</h1>
                <div className={styles.formContainer}>
                    {login ? <RestaurantLogin /> : <RestaurantSignup onSignupSuccess={handleSignupSuccess} />}
                    <button className={styles.buttonLink} onClick={() => setLogin(!login)}>
                        {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                    </button>
                </div>
                <Footer />
            </div>
    );
};

export default Restaurant;
