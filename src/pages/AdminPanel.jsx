import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { useContext, useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";
import { toast } from "react-hot-toast";

const Admin = () => {

    const [ refresh, setRefresh] = useState(false);
    const { isAuthenticated, user, loading, setLoading } = useContext(Context);
    const [ users, setUsers ] = useState([]);
    const [ newUser, setNewUser ] = useState(false);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole ] = useState("");
    
    const openNewUser = () => {
        setNewUser(true);
        setRefresh(!refresh);
    }

    const submitNewUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/new`, {
                name, email, password, role
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            toast.success(data.message);
            setLoading(false);
            setNewUser(false);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            setNewUser(false);
        }
    }

    const submitUpdate = async (currentRole, id, role, switchUpdate) => {
        setLoading(true);
        if(currentRole === role) {
            toast.error("No change");
            switchUpdate();
            return setLoading(false);
        }
        try {
            const { data } = await axios.put(`${server}/update/${id}`, {
                role
            }, {
                withCredentials: true,
            });
            toast.success(data.message);
            switchUpdate();
            setLoading(false);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
            switchUpdate();
            setLoading(false);
            setRefresh(!refresh);
        }
    }

    const deleteHandler = async (id, switchUpdate) => {
        setLoading(true);
        try {
            const { data } = await axios.delete(`${server}/delete/${id}`, {
                withCredentials: true,
            });
            toast.success(data.message);
            switchUpdate();
            setLoading(false);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
            switchUpdate();
            setLoading(false);
            setRefresh(!refresh);
        }
    }

    useEffect(() => {
        axios.get(`${server}/all`, {
            withCredentials: true,
        })
        .then((res) => {
            setUsers(res.data.data);
        }).catch((e) => {
            toast.error(e.response.data.message);
        });
    }, [refresh]);

    if(!isAuthenticated) {
        return (
            <Navigate to={"/"} />
        )
    }

    if(user.role !== "Admin") {
        return (
            <div>
                <p>Access Denied</p>
                <Link to="/">Login In</Link>
            </div>
        )
    }

    return (
        <div>
            <section>
                <button onClick={openNewUser} className="newUser" disabled={loading}>New User</button>
                {
                  users.map(i => (
                    <User id={i._id} key={i._id} name={i.name} email={i.email} Role={i.role} submitHandler={submitUpdate} deleteHandler={deleteHandler} loading={loading}/>
                  ))
                }
            </section>
            {
                newUser &&
                <form onSubmit={submitNewUser}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" require />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" require />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" require />
                    <input value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder="Role" require />
                    <button type="submit" disabled={loading} >Submit</button>
                </form>
            }
        </div>
    )

}

export default Admin;