import React from "react";
import { Routes as Switch, Route as Routing } from "react-router-dom";

import Dashboard from "../Components/Dashboard/Dashboard";

import Homepage from "../Components/Homepage/Homepage";
import Login from "../Components/login/login";
import Signup from "../Components/Signup";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import Layout from "../Components/layout/layout";
import Profile from "../Components/Profile/Profile";

import PrivateRoute from "../PrivateRoute";
import Errors from "../Components/Errors";


const Routesr = () => {
  return (
    <>
      <Layout>
        <Switch>
          {/* Auth Routes */}
          <Routing exact path="/" element={<Homepage />} />
          <Routing exact path="/login" element={<Login />} />
          <Routing exact path="/signup" element={<Signup />} />
          <Routing path="/forgot-password" element={<ForgotPassword />} />


          {/* Private: Only logged in user can access */}
          <Routing path="/profile" element={<PrivateRoute />}>
            <Routing path="/profile" element={<Profile />} />
          </Routing>
          
           <Routing exact path="/dashboard" element={<Dashboard />} /> 
          

          {/* Public: All can use */}
          
          <Routing exact path="*" element={<Errors />} />
        </Switch>
      </Layout>
    </>
  );
};
export default Routesr;
