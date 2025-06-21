import { useEffect } from "react";

import CourseStore from "../store/CourseStore";
import CreateCource from "../compoments/Course/CreateCource";
import CourseList from "../compoments/Course/CourseList";


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