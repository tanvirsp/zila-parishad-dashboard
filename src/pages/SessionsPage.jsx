
import CreateSession from '../compoments/CreateSession';
import SessionList from '../compoments/SessionList';

const SessionsPage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-5">
                    <CreateSession />
                </div>
                <div className="col-md-7">
                    <SessionList />
                </div>
            </div>


        </section>
    );
};

export default SessionsPage;