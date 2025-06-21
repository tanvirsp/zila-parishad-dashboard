import { useParams } from "react-router-dom";
import ResultDetails from "../compoments/Result/ResultDetails";
import ResultStore from "../store/ResultStore";
import { useEffect } from "react";
import DetailsSkeleton from "../skeletons/DetailsSkeleton";


const ResultDetailsPage = () => {
    const {regNumber} = useParams();

    const {ResultDataRequest, ResultData} = ResultStore();
    

    useEffect( ()=>{
        (async()=>{
            await ResultDataRequest(regNumber)
        })()
    },[regNumber])


    if(ResultData === null){
        return <DetailsSkeleton />
    }


    return (
        <div>
            <ResultDetails />
            
            
        </div>
    );
};

export default ResultDetailsPage;