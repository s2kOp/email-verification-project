import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../stylesheets/HomePage-PWReset.module.css";
import axios from "axios";


export default function HomePage(){
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit triggered");
        try{
            const res = await axios.post("http://localhost:3000/api/auth/register",{
                emailId: email
            })
            console.log(res);
            if(res.data.error?.code == 'ER_DUP_ENTRY'){
                setMessage("Email already verified.");
                return;
            }
            else if(res.status ==  200){
                navigate("/verified");
            }
            else{
                setMessage("Failed to execute. Try again..")
            }
        }catch(err){
            console.error(err);
            setMessage(err + "Please try again.");
        }finally{
            setEmail("");
        }
    }

    return(
      <div className={styles.wrapper}>
          <h1>EMAIL-VERIFICATION</h1>
          <form onSubmit={handleSubmit} className={styles.formWrap}>
            <input type = "email" placeholder="Email ID" required value ={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <div>
                <button type="submit">Verify</button>
            </div>
          </form>
          <p className={styles.statusMsg}>{message}</p>
      </div>
    )
}