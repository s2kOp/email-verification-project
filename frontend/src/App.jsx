import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PasswordReset from "./components/PasswordReset";
import VerificationSent from "./components/VerificationSent";
import VerificationFail from "./components/VerificationFail";
import { useState } from "react";

export default function App(){
    return(
      <Router>
          <Routes>
              <Route path="/" element = {<HomePage />} />
              <Route path="/reset" element = {<PasswordReset />} />
              <Route path="/verified" element = {<VerificationSent />} />
              <Route path="/verification-fail" element = {<VerificationFail />}/>
          </Routes>
      </Router>
    )
}