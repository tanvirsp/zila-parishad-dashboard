import { useEffect } from "react";
import CourseList from "../compoments/CourseList";
import CreateCource from "../compoments/CreateCource";
import CourseStore from "../store/CourseStore";


const CoursePage = () => {

    const {AllCourseRequest} = CourseStore();

    useEffect( ()=>{
        (async()=>{
            await AllCourseRequest();

        } )()
    },[])


    return (
        <section>
            <div className="row">
                <div className="col-md-5">
                    <CreateCource />
                </div>
                <div className="col-md-7">
                    <CourseList />
                </div>
            </div>


        </section>
    );
};

export default CoursePage;