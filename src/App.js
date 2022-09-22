import React from "react";
import Login from "./userinterface/Login";
import SignUp from "./userinterface/SignUp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./userinterface/Profile";
import Account from "./userinterface/Account";
import UserProfile from "./userinterface/UserProfile";
import ViewPost from "./userinterface/ViewPost";
import { useSelector } from 'react-redux';
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData);
    console.log(props)
    return user.length > 0 ? props.children : < Navigate to="/login" replace />

}

const PublicRoute = (props) => {

    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData);
    console.log(props)
    return user.length > 0 ? < Navigate to="/profile" replace /> : props.children

}

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route element={
                    <PublicRoute> <SignUp />
                    </PublicRoute>} path={'/signup'} />
                    <Route element={
                        <PublicRoute><Login />
                        </PublicRoute>} path={'/login'} />

                    <Route element={
                        <PrivateRoute> <Profile />
                        </PrivateRoute>} path={'/profile'} />
                    <Route element={
                    <PrivateRoute><Account />
                    </PrivateRoute>} path={'/account/*'} />
                    <Route element={
                    <PrivateRoute><UserProfile />
                    </PrivateRoute>} path={'/:username'} />
                    <Route element={
                    <PrivateRoute><ViewPost />
                    </PrivateRoute>} path={'/p/:postuuid'} />




                </Routes>
            </Router>
        </div>

    )
}
export default App;