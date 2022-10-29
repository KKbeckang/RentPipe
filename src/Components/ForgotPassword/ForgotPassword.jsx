import React from 'react'
import styles from './styles.module.css';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from '../OAuth/OAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert("Email was sent");
    } catch (error) {
      alert("Could not send reset password");
    }
  }
  
  return (
    <div className={styles.login_container}>
    <div className={styles.login_form_container}>
      <div className={styles.left}>
        <form className={styles.form_container} onSubmit={onSubmit}>
          <h1>Reset Password</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
            className={styles.input}
          />
          <br/>
      
          <button className="btn btn-success btn-round-lg btn-lg ">
            <span>Send Reset Password</span>
          </button>
          
          <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
          <OAuth/>
        </form>
        
      </div>
      <div className={styles.right}>
        <h1>New Here ?</h1>
        <br/>
        <Link to="/signup">
          <button type="button" className={styles.white_btn}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}
