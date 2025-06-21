
import { useNavigate, } from "react-router-dom";
import NoticeStore from "../../store/NoticeStore";



const NoticeDetails = () => {

    const navigate = useNavigate();

    const {DetailsNotice, } = NoticeStore();


 
    return (
        <section >
            <div className="p-4 bg-dark rounded-3 d-flex justify-content-between ">
                <h4 className="text-white"><u>{DetailsNotice.title}</u></h4>
                <button onClick={() =>navigate("/notice")} className="btn btn-warning">Go Back</button>
            </div>
            <div className="p-4 bg-white rounded-3 mt-3 text-center">
                <img  width="800px" crossOrigin ="anonymous" 
                src={`${import.meta.env.VITE_URL}/${DetailsNotice?.imageUrl}`} alt="Notice" />   

            </div>

           
               
                
                
          
            
        </section>
    );
};

export default NoticeDetails;