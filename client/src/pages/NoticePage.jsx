
import AddNotice from "../compoments/Notice/AddNotice";
import NoticeList from "../compoments/Notice/Notice List";


const NoticePage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-4">
                    <AddNotice />
                </div>
                <div className="col-md-8">
                    <NoticeList />
                </div>
            </div>
            
        </section>
    );
};

export default NoticePage;