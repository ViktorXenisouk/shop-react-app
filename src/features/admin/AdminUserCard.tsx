


const AdminUserCard = ({id,email,username}:{id:string,email:string,username:string}) => {

    return (
        <div>
            <p>{id}</p>
            <p>{email}</p>
            <p>{username}</p>
        </div>
    )

}

export default AdminUserCard