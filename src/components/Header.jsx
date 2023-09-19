import { useContext } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {

    const { loading, setLoading, isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

    const logout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/logout`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setIsAuthenticated(false);
            setUser({});
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    if(isAuthenticated) {
        return (
            <div>
                <p>Multi-Role-Auth-App</p>
                <button onClick={logout} disabled={loading}>Log Out</button>
            </div>
        )
    }

    return (
        <div>
            <p>Multi-Role-Auth-App</p>
        </div>
    )

}

export default Header;