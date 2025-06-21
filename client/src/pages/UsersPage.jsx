
import Createuser from "../compoments/Users/Createuser";
import UserList from "../compoments/Users/UserList";


const UsersPage = () => {
    

 

    return (
        <section>
            <div className="row">
                <div className="col-md-3">
                    <Createuser />
                </div>
                <div className="col-md-9">
                     <UserList />
                </div>
            </div>

    </section>
    );
};

export default UsersPage;