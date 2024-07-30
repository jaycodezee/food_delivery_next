'use client'
import { useState } from "react"
import DeliveryBoyLogin from "../_componet/deliverypartnerLogin.js"
import DeliveryBoySignup from "../_componet/deliverypartnerSignUp.js"
import styles from "../styles/Restaurant.module.css";
import DeliveryHeader from '../_componet/deliveryHeader'

const user=()=>{
    const [login,setLogin]=useState(false)
    
    const handleSignupSuccess = () => {
        setLogin(true); 
    }; 
    return(
        <>
            {/* <h1>Login/Signup Page</h1> */}
            <DeliveryHeader />
                <div className={styles.formContainer}>
                    {login ? <DeliveryBoySignup /> : <DeliveryBoyLogin onSignupSuccess={handleSignupSuccess} />}
                    <button className={styles.buttonLink} onClick={() => setLogin(!login)}>
                        {login ? "Already have Account? Login" : "Do not have account? SignUp"}
                    </button>
                </div>
        </>
    )
}

export default user;