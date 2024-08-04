import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import DashboardPage from "../../Pages/DashboardPage";
import RegisteredStudentPage from "../../pages/RegisteredStudentPage";
import DetailsPage from "../../pages/DetailsPage";
import OptionsPage from "../../pages/OptionsPage";
import SessionsPage from '../../pages/SessionsPage';
import MakeResultPage from "../../pages/MakeResultPage";
import NoticePage from "../../pages/NoticePage";
import CoursePage from "../../pages/CoursePage";
import ScholarshipPage from "../../pages/ScholarshipPage";


const router = createBrowserRouter([
  
    {
        path: "/", 
        element:  <MainLayout /> ,
        children: [
            {
                path: "/",
                element: <DashboardPage />
            },
            {
                path: "/registered-student",
                element: <RegisteredStudentPage />
            },
            {
                path: "/student-details/:id",
                element: <DetailsPage />
            },
            {
                path: "/sessions",
                element: <SessionsPage />
            },
            {
                path: "/make-result",
                element: <MakeResultPage />
            },
            {
                path: "/notice",
                element: <NoticePage />
            },
            {
                path: "/courses",
                element: <CoursePage />
            },
            {
                path: "/options",
                element: <OptionsPage />
            },
            {
                path: "/scholarship",
                element: <ScholarshipPage />
            },


        ]
    }
])

export default router;