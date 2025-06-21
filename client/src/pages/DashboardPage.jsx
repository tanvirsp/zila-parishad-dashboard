import { useEffect } from "react";
import SessionStore from "../store/SessionStore";
import StudentStore from "../store/StudentStore";




const DashboardPage = () => {
    const {AllSessionRequest, AllSession} = SessionStore()
    const {TotalStudentGroupByCourse, TotalStudentGroupByCourseRequest} = StudentStore()

    useEffect( ()=>{
        (async()=>{
            AllSession === null && await AllSessionRequest();
            TotalStudentGroupByCourse == null && await TotalStudentGroupByCourseRequest();


        } )()
    },[])


    

    return (
        <section >
            <div className="row g-4">
                <div className="col-md-3">
                    <div className="p-4 rounded-3  animate__fast animate__animated animate__fadeInUp" style={{backgroundColor: "#FCD34D",  boxShadow: "0 0 20px 0px #FCD34D"}}>
                        <h5>Spoken English</h5>
                        <h3>{TotalStudentGroupByCourse?.spoken }</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className=" p-4 rounded-3 animate__fast animate__animated animate__fadeInUp" style={{backgroundColor: "#A3E635",  boxShadow: "0 0 20px 0px #BEF264"}}>
                        <h5>Computer Training</h5>
                        <h3>{TotalStudentGroupByCourse?.computer}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className=" p-4 rounded-3 animate__fast animate__animated animate__fadeInUp" style={{backgroundColor: "#4ADE80",  boxShadow: "0 0 20px 0px #86EFAC"}}>
                        <h5>Beautification Training</h5>
                        <h3>{TotalStudentGroupByCourse?.beautification}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-4 rounded-3 animate__fast animate__animated animate__fadeInUp" style={{backgroundColor: "#22D3EE",  boxShadow: "0 0 20px 0px #67E8F9"}}>
                        <h5>Sewing Training</h5>
                        <h3>{TotalStudentGroupByCourse?.sewing}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-4 rounded-3 animate__fast animate__animated animate__fadeInUp" style={{backgroundColor: "#38BDF8",  boxShadow: "0 0 20px 0px #67E8F9"}}>
                        <h5>Scholarsip Candidate</h5>
                        <h3>{TotalStudentGroupByCourse?.scholarship}</h3>
                    </div>
                </div>
                
                
            </div>
        </section>
    );
};

export default DashboardPage;