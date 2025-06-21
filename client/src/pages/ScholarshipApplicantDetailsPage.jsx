import { useParams } from "react-router-dom";
import Details from "../compoments/Scholarship/Details";
import ScholarshipStore from "../store/ScholarshipStore";
import { useEffect } from "react";


const ScholarshipApplicantDetailsPage = () => {
    const {id} = useParams();
    
    const {ApplicantDetailsRequest} = ScholarshipStore();

    
    useEffect( ()=>{
        ( async()=>{
            await ApplicantDetailsRequest(id);
        })()

    } ,[id])



    return (
        <div>
            <Details />
        </div>
    );
};

export default ScholarshipApplicantDetailsPage;