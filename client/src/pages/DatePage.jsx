import { useEffect } from "react";
import CreateDate from "../compoments/Date/CreateDate";
import ListDate from "../compoments/Date/ListDate";
import DateStore from "../store/DateStore";




const DatePage = () => {
    const {DateListRequest} = DateStore();

    useEffect(()=>{
        (async()=>{
            await DateListRequest()
        })()
    } ,[])



    
    return (
        <section>
        <div className="row">
            <div className="col-md-4">
                <CreateDate />
            </div>
            <div className="col-md-8">
                <ListDate />
                
            </div>
        </div>


    </section>
);
   
};

export default DatePage;