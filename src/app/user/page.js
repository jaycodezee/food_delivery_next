'use client'
import { useState } from "react"
import Footer from "../_componet/footer.js"
import UserLogin from "../_componet/UserLogin.js"
import UserSignUp from "../_componet/UserSignUp.js"
import styles from "../styles/Restaurant.module.css";

const user=()=>{
    const [login,setLogin]=useState(false)
    
    const handleSignupSuccess = () => {
        setLogin(true); 
    };
    return(
        <>
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