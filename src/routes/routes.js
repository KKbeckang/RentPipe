import React from "react";
import { Routes as Switch, Route as Routing } from "react-router-dom";

import Dashboard from "../Components/Dashboard/Dashboard";

import Content from "../Components/Homepage/Homepage";
import Login from "../Components/login/login";
import Signup from "../Components/Signup";

import Layout from "../Components/layout/layout";

import Errors from "../Components/Errors";


const Routesr = () => {
  return (
    <>
      <Layout>
        <Switch>
          {/* Auth Routes */}
          <Routing exact path="/" element={<Content />} />
          <Routing exact path="/login" element={<Login />} />
          <Routing exact path="/signup" element={<Signup />} />

          {/* Private: Only logged in user can access */}
           <Routing exact path="/dashboard" element={<Dashboard />} /> 
          

          {/* Public: All can use */}
          
          <Routing exact path="*" element={<Errors />} />
        </Switch>
      </Layout>
    </>
  );
};
export default Routesr;
