import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../stylesheets/HomePage-PWReset.module.css";
import axios from "axios";

export default function PasswordReset(){
    const [password,setPassword] = useState("");
    const [confirmPW,setConfirmPW] = useState("");
    const [message,setMessage] =  useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!=confirmPW){
            setMessage("Passwords do not match!");
            return;
        }
        try{
            const response  = await axios.post("http://localhost:3000/api/auth/reset-password",{
                tokenToVerify: token,
                password
            });
            if(response.status==200){
                setMessage("Password Reset Successfull! Redirecting...");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        }catch(err){
            console.err("Reset error",err)
        }finally{
            setPassword("");
            setConfirmPW("");
        }
    }
    return(
        <div className={styles.wrapper}>
            <h1>Password Reset</h1>
            <form className={styles.formWrap} onSubmit={handleSubmit}>
                <input type="password" placeholder="Enter password" value = {password} 
                        required onChange={(e) => {setPassword(e.target.value)}}></input>
                <input type = "password" placeholder="Confirm Password" value = {confirmPW}
                        required onChange={(e) => {setConfirmPW(e.target.value)}}></input>
                <div>
                    <button type="submit">Reset</button>
                </div>
                <p className = {styles.statusMsg}>{message}</p>
            </form>
        </div>
    )
}