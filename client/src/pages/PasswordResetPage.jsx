import ResetForm from "../compoments/Profile/ResetForm";
import resetArt from '../assets/images/forget-password-art.png'


const PasswordResetPage = () => {
    return (
        <section >
            <div className="d-flex">
                <div className="w-75 d-flex align-items-center justify-content-center bg-light">
                    <img width="600px" src={resetArt} alt="" />
                   
                </div>
                <div className="w-25">
                    <ResetForm />
                </div>


            </div>
           
        </section>
      
    );
};

export default PasswordResetPage;