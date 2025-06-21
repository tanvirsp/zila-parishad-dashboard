
import { Toaster } from 'react-hot-toast';
import passwordArt from '../assets/images/recover.png'
import SetNewPasswordForm from '../compoments/Profile/SetNewPasswordForm';

const SetNewPasswordPage = () => {
    return (
        <section >
            <div className="d-flex">
                <div className="w-75 d-flex align-items-center justify-content-center bg-light">
                    <img width="600px" src={passwordArt} alt="" />
                   
                </div>
                <div className="w-25">
                    <SetNewPasswordForm />
                </div>


            </div>
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default SetNewPasswordPage;