import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function VerificationFail(){
    const navigate = useNavigate();
    useEffect(()=>{
        const goBack = setTimeout(() => {
            navigate("/");
        },3000);

        return () => clearTimeout(goBack);
    },[]);
    return(
        <div>
            <p>Verification Link has expired. Try again.</p>
            <pre style={{textAlign: "center"}}>Redirecting...</pre>
        </div>
    )
}