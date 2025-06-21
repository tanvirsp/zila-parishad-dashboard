import { Toaster } from 'react-hot-toast';
import otpArt  from '../assets/images/recover.png'
import OtpVerifyForm from '../compoments/Profile/OtpVerifyForm';

const OTPVerifyPage = () => {
    return (
        <section >
            <div className="d-flex">
                <div className="w-75 d-flex align-items-center justify-content-center bg-light">
                    <img width="600px" src={otpArt} alt="" />
                   
                </div>
                <div className="w-25">
                    <OtpVerifyForm />
                </div>


            </div>
            <Toaster  position="top-center"  reverseOrder={false}/>
           
        </section>
    );
};

export default OTPVerifyPage;