import { useState, useEffect } from "react"

export default function VerificationSent(){
    const [time,setTime] = useState("");

    const now = Date.now();
    const expiry = now + (2*60*1000);

  useEffect(() => {
    const updateTime = () => {
      const current = Date.now();
      const countdown = expiry - current;
      if (countdown <= 0) {
        setTime("Link Expired..");
        clearInterval(timer);
        return;
      }

      const min = Math.floor(countdown / (1000 * 60));
      const sec = Math.floor((countdown % (1000 * 60)) / 1000);
      const minutes = String(min).padStart(2, "0");
      const seconds = String(sec).padStart(2, "0");

      setTime(`${minutes} : ${seconds}`);
    };

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
     }, []); 
    return(
        <div>
            <p>Verification mail has been sent to the email address specified. Follow the mail to verify your account.</p>
            <pre style={{textAlign: "center"}}>The link expires in :- {time}</pre>
        </div>
    )
}