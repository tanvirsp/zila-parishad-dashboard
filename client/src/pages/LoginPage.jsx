import { Toaster } from "react-hot-toast";
import LoginForm from "../compoments/Users/LoginForm";
import loginArt from '../assets/images/login-art.png'


const LoginPage = () => {
    return (
        <section >
            <div className="row">
                <div className="col-md-9">
                    <div className="d-flex align-items-end vh-100 justify-content-center">
                        <img className="img-fluid" src={loginArt} alt="Image" />
                    </div>
                </div>
                <div className="col-md-3 bg-white">
                    <LoginForm />

                </div>
            </div>
            
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default LoginPage;