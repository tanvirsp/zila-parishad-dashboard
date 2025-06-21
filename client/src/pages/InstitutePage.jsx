import AddInstitute from "../compoments/Institute/AddInstitute";
import InstituteList from "../compoments/Institute/InstituteList";


const InstitutePage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-4">
                    <AddInstitute />
                </div>
                <div className="col-md-8">
                    <InstituteList />
                </div>
            </div>
            
        </section>
    );
};

export default InstitutePage;