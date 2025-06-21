
import { useEffect } from "react";
import AddResultForm from "../compoments/Result/AddResultForm";
import ResultTable from "../compoments/Result/ResultTable";
import DateStore from "../store/DateStore";




const MakeResultPage = () => {
    const {DateList, DateListRequest} = DateStore()

    useEffect( ()=>{
        (async()=>{
            DateList === null && await DateListRequest()

        })()
    } ,[])

    
   


    return (
        <section>
            <div className="row">
                <div className="col-md-3">
                    <AddResultForm />
                </div>
                <div className="col-md-9">
                    <ResultTable />
                </div>
            </div>
        </section>
    );
};

export default MakeResultPage;