import { useEffect, useState } from "react";

const User = ({ name, id, email, Role, submitHandler, deleteHandler, loading }) => {

    const [ role, setRole ] = useState("");
    const [ updateRole, setUpdateRole ] = useState(true);

    const switchUpdate = () => {
        setUpdateRole(!updateRole);
    }

    useEffect(() => {
        setRole(Role);
    }, [])

    return (
        <div>
            <div>
                <label>Name:</label>
                <span>{name}</span>
                <label>Email:</label>
                <span>{email}</span>
                <label>Role:</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} disabled={updateRole} placeholder="role" />
                {updateRole && <button onClick={switchUpdate} disabled={loading}>Update Role</button>}
                {!updateRole && <button onClick={() => submitHandler(Role, id, role, switchUpdate)} disabled={loading}>Submit Change</button>}
                <button onClick={() => deleteHandler(id, switchUpdate)} disabled={loading}>Delete</button>
            </div>
        </div>
    )

}

export default User;