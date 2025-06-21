import AddReceivedScholarship from "../compoments/ReceivedScholarship/AddReceivedScholarship";
import ReceivedScholarshipList from "../compoments/ReceivedScholarship/ReceivedScholarshipList";




const ReceivedScholarshipPage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-3">
                    <AddReceivedScholarship />
                </div>
                <div className="col-md-9">
                    <ReceivedScholarshipList />
                </div>
            </div>
    </section>
    );
};

export default ReceivedScholarshipPage;