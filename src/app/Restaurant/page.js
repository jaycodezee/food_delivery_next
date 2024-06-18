'use client'
import { useState } from "react";
import RestaurantLogin from "../_componet/RestaurantLogin";
import RestaurantSignUp from "../_componet/RestaurantSignup";
import RestaurantHeader from "../_componet/Header";
import Footer from "../_componet/footer";
import styles from "../styles/Restaurant.module.css";

const Restaurant = () => {
    const [login, setLogin] = useState(true)
    return (
        <>
            <div className="container">
                <RestaurantHeader />
                <h1>Restaurant Login/Signup Page</h1>
                <div className={styles.formContainer}>
                    {
                        login ? <RestaurantLogin /> : <RestaurantSignUp />
                    }
                    <button className={styles.buttonLink} onClick={() => setLogin(!login)}>
                        {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Restaurant;
