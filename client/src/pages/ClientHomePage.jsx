
import Gallery from "../compoments/HomePage/Gallery";
import Information from "../compoments/HomePage/Information";
import LinkCategoryList from "../compoments/HomePage/LinkCategoryList";
import LinkList from "../compoments/HomePage/LinkList";
import Persons from "../compoments/HomePage/Persons";
import SliderList from "../compoments/HomePage/SliderList";

const ClientHomePage = () => {

    
    return (
        <div>
            <SliderList />
            <Information />
            <Gallery />
            <Persons />
            <div className="row mt-4">
                <div className="col-md-8 ">
                    <LinkList />
                </div>
                <div className="col-md-4 ">
                    <LinkCategoryList />
                </div>
            </div>


        </div>
    );
};

export default ClientHomePage;