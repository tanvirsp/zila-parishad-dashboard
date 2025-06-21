import CreateScholarshipSession from "../compoments/ScholarshipSession/CreateScholarshipSession";
import ScholarshipSessionList from "../compoments/ScholarshipSession/ScholarshipSessionList";


const ScholarshipSessionPage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-5">
                    <CreateScholarshipSession/>
                </div>
                <div className="col-md-7">
                    <ScholarshipSessionList />
                    
                </div>
            </div>


        </section>
    );
};

export default ScholarshipSessionPage;