import { useEffect } from "react";
import ReceivedScholarshipStore from "../store/ReceivedScholarshipStore";
import { useParams } from "react-router-dom";
import ReceivedScholarshipDetails from "../compoments/ReceivedScholarship/ReceivedScholarshipDetails";
import DetailsSkeleton from "../skeletons/DetailsSkeleton";


const ReceivedScholarshipDetailsPage = () => {
    const {regNumber} = useParams();


    const {ScholarshipStudentData, ScholarshipStudentDataRequest} = ReceivedScholarshipStore();


    useEffect( ()=>{
        (async()=>{
            await ScholarshipStudentDataRequest(regNumber)
        })()
    },[regNumber])

    if(ScholarshipStudentData === null){
        return <DetailsSkeleton />
    }

    
    return (
        <div>
            <ReceivedScholarshipDetails />
        </div>
    );
};

export default ReceivedScholarshipDetailsPage;