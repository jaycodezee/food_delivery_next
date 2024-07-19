'use client'
import { useState } from "react"
import CustomerHeader from "../_componet/CustmoreHeader"
import Footer from "../_componet/footer"
import UserLogin from "../_componet/UserLogin.jsx"
import UserSignUp from "../_componet/UserSignUp.jsx"
import styles from "../styles/Restaurant.module.css";

const user=()=>{
    const [login,setLogin]=useState(false)
    
    const handleSignupSuccess = () => {
        setLogin(true); 
    };
    return(
        <>
            <CustomerHeader />  
            {/* <h1>Login/Signup Page</h1> */}
                <div className={styles.formContainer}>
                    {login ? <UserSignUp /> : <UserLogin onSignupSuccess={handleSignupSuccess} />}
                    <button className={styles.buttonLink} onClick={() => setLogin(!login)}>
                        {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                    </button>
                </div>
                <Footer/>
        </>
    )
}

export default user;