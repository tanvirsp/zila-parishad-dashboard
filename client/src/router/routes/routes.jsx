import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import DashboardPage from "../../Pages/DashboardPage";
import RegisteredStudentPage from "../../pages/RegisteredStudentPage";
import DetailsPage from "../../pages/DetailsPage";
import OptionsPage from "../../pages/OptionsPage";
import SessionsPage from '../../pages/SessionsPage';
import ResultPage from "../../pages/ResultPage";
import NoticePage from "../../pages/NoticePage";
import CoursePage from "../../pages/CoursePage";
import ScholarshipApplicantPage from "../../pages/ScholarshipApplicantPage";
import ScholarshipApplicantDetailsPage from "../../pages/ScholarshipApplicantDetailsPage";
import ScholarshipSessionPage from "../../pages/ScholarshipSessionPage";
import InstitutePage from "../../pages/InstitutePage";
import UsersPage from "../../pages/UsersPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import PrivateRoute from "../privateRoute/privateRoute";
import PasswordResetPage from "../../pages/PasswordResetPage";
import OTPVerifyPage from "../../pages/OTPVerifyPage";
import SetNewPasswordPage from "../../pages/SetNewPasswordPage";
import ReceivedScholarshipPage from "../../pages/ReceivedScholarshipPage";
import NoticeDetailsPage from "../../pages/NoticeDetailsPage";
import ResultDetailsPage from "../../pages/ResultDetailsPage";
import ReceivedScholarshipDetailsPage from "../../pages/ReceivedScholarshipDetailsPage";
import DatePage from "../../pages/DatePage";
import ClientHomePage from "../../pages/ClientHomePage";




const router = createBrowserRouter([
  
    {
        path: "/", 
        element: <PrivateRoute> <MainLayout /> </PrivateRoute> ,
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
                path: "/result",
                element: <ResultPage />
            },
            {
                path: "/result-details/:regNumber",
                element: <ResultDetailsPage />
            },
            
            {
                path: "/courses",
                element: <CoursePage />
            },
            
            {
                path: "/course-date",
                element: <DatePage />
            },
            {
                path: "/options",
                element: <OptionsPage />
            },
            {
                path: "/applicant-list",
                element: <ScholarshipApplicantPage />
            },
            {
                path: "/applicant-details/:id",
                element: <ScholarshipApplicantDetailsPage />
            },
            {
                path: "/applicant-selected",
                element: <ReceivedScholarshipPage />
            },
            {
                path: "/received-scholarship-details/:regNumber",
                element: <ReceivedScholarshipDetailsPage />
            },
            {
                path: "/scholarship-session",
                element: <ScholarshipSessionPage />
            },
            {
                path: "/institute",
                element: <InstitutePage />
            },
            {
                path: "/users",
                element: <UsersPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/notice",
                element: <NoticePage />
            },
            {
                path: "/notice-details/:id",
                element: <NoticeDetailsPage />
            },
            {
                path: "/home-page",
                element: <ClientHomePage />
            }
           


        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },    
    {
        path: '/reset-form',
        element: <PasswordResetPage />
    },    
    {
        path: '/otp-verify-form',
        element: <OTPVerifyPage />
    },    
    {
        path: '/new-password-form',
        element: <SetNewPasswordPage />
    }
])

export default router;