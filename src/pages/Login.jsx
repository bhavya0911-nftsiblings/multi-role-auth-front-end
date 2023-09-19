import { useState } from "react";
import { Context, server } from "../main";
import { useContext } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Navigate } from "react-router-dom";

const Login = () => {

    const { loading, setLoading, isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            toast.success(data.message);
            const response = await axios.get(`${server}/me`, {
                withCredentials: true,
            });
            setUser(response.data.data);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    if(isAuthenticated) {
        if(user.role === "Admin") {
            return (<Navigate to={"/Admin"} />)
        }
        return <Navigate to={"/Profile"} />
    }

    return (
        <div>
            <section>
                <form onSubmit={submitHandler}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required></input>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required></input>
                <button disabled={loading} type='submit'>Login</button>
                </form>
            </section>
        </div>
    )

};

export default Login;