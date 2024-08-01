import { useEffect } from "react";
import SessionStore from "../store/SessioinStore";



const DashboardPage = () => {
    const {AllSessionRequest, AllSession} = SessionStore()

    useEffect( ()=>{
        (async()=>{
            AllSession === null && await AllSessionRequest();


        } )()
    },[])

    return (
        <section className="bg-white p-4 rounded-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="bg-info p-4 rounded-3">
                        <h5>Total Register Students:</h5>
                        <h3>120</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-warning p-4 rounded-3 ">
                        <h5>Total Pending Students:</h5>
                        <h3>80</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-danger p-4 rounded-3">
                        <h5>Total Cancel Ad:</h5>
                        <h3>40</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;