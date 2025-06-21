const express = require('express');
const router = express.Router();



const upload = require('../middleware/uploader');
const AuthVerification = require('../middleware/AuthVerification');


const StudentController = require("../controllers/StudentController");
const ResultController = require("../controllers/ResultController");
const OptionController = require("../controllers/OptionController");
const PdfController = require("../controllers/PdfController");
const SessionController = require("../controllers/SessionController");
const CourseController = require("../controllers/CourseController");
const ScholarshipController = require("../controllers/ScholarshipController");
const ScholarshipSessionController = require("../controllers/ScholarshipSessionController");
const InstituteController = require("../controllers/InstituteController");
const UserController = require("../controllers/UserController");
const ReceivedScholarshipController = require("../controllers/ReceivedScholarshipController");
const NoticeController = require("../controllers/NoticeController");
const SliderController = require("../controllers/SliderController");
const GalleryController = require("../controllers/GalleryController");
const PersonController = require("../controllers/PersonController");
const DateController = require("../controllers/DateController");
const LinkCategoryController = require("../controllers/LinkCategoryController");
const LinkController = require("../controllers/LinkController");

const InformationController = require("../controllers/InformationController");


const VerifyAdmin = require('../middleware/VerifyAdmin');







router.post("/file-upload", upload.single('image'),  async(req, res) =>{
    try {
        
      res.status(200).send({status: true, data: req.file});
    } catch (error) {
        res.status(400).send({status: false,  message: error.message})
        
    }
  
  });



  router.post("/files-upload", upload.array('images', 4),  async(req, res) =>{
    try {

      res.status(200).send({status: true, data: req.files});
    } catch (error) {
        res.status(400).send({status: false,  message: error.message})  
    }
  
  });




  
//Download Registration Copy API
router.get("/registration-copy/:id", PdfController.registrationPDFCopy )
router.get("/scholarship-copy/:id", PdfController.scholarshipPDFCopy )

router.get("/pdf-scholarsip-data", AuthVerification, PdfController.ScholarshipRequestDataPDF);
router.get("/print-register-data/:courseId", AuthVerification, PdfController.PrintRegisterDataPDF);


//PDF Certificate Generate API
router.get("/createPdf/:regNumber", AuthVerification, PdfController.createPdfNew )


//Information API
router.post("/information/:id",  AuthVerification, InformationController.AddAndUpdateInformation );
router.get("/information", InformationController.DetailsInformation);



//Link API
router.post("/add-link",  AuthVerification, LinkController.AddLink);
router.get("/link/:id", AuthVerification, LinkController.LinkDetails);
router.get("/link-list/", AuthVerification,  LinkController.LinkList);
router.post("/link-update/:id", AuthVerification,  LinkController.UpdateLink);
router.delete("/link/:id", AuthVerification, LinkController.DeleteLink);
router.get("/link-by-category", LinkController.LinkListByCategory);





//Link Category API
router.post("/add-link-category",  AuthVerification, LinkCategoryController.AddLinkCategory);
router.get("/link-category/:id", AuthVerification, LinkCategoryController.LinkCategoryDetails);
router.get("/link-category-list", AuthVerification, LinkCategoryController.LinkCategoryList);
router.post("/link-category-update/:id", AuthVerification, LinkCategoryController.UpdateLinkCategory);







//Person API
router.post("/add-person",  AuthVerification, PersonController.AddPerson);
router.get("/person/:id", AuthVerification, PersonController.PersonDetails);
router.get("/person-list", PersonController.PersonsList);
router.post("/person-update/:id", AuthVerification,  PersonController.UpdatePerson);
router.delete("/person/:id", AuthVerification, PersonController.DeletePerson);





//Gallery Image API
router.post("/add-image",  AuthVerification, GalleryController.AddGalleryImage);
// router.get("/image/:id", GalleryController.GalleryImageDetails);
router.get("/image-list", GalleryController.GalleryImageList);
// router.post("/image-update/:id", AuthVerification,  GalleryController.UpdateGalleryImage);
router.delete("/image/:id", AuthVerification, GalleryController.DeleteGalleryImage);



//Slider API
router.post("/add-slider",  AuthVerification, SliderController.AddSlider);
router.get("/slider/:id", AuthVerification, SliderController.SliderDetails);
router.get("/slider-list", SliderController.SliderList);
router.post("/slider-update/:id", AuthVerification,  SliderController.UpdateSlider);
router.delete("/slider/:id", AuthVerification, SliderController.DeleteSlider);




//Date Api
router.post("/date",  AuthVerification, DateController.AddDate);
router.get("/date/:id",AuthVerification, DateController.ViewDate);
router.get("/date-list", AuthVerification, DateController.DateList);
router.post("/date-update/:id", AuthVerification,  DateController.UpdateDate);
router.delete("/date/:id", AuthVerification, DateController.DeleteDate);



//Notice Api
router.post("/notice",  AuthVerification, NoticeController.CreateNotice);
router.get("/notice/:id", NoticeController.DetailsNotice);
router.get("/notice-list", NoticeController.NoticeList);
router.post("/notice-update/:id", AuthVerification, NoticeController.UpdateNotice);
router.delete("/notice/:id", AuthVerification, NoticeController.DeleteNotice);

  

//Student Api
router.get("/total-student", StudentController.TotalApplicationByCourse )
router.post("/student-register",  StudentController.AddStudentData);
router.get("/student/:id",   AuthVerification,  StudentController.ViewStudentData);
router.get("/students-by-session", AuthVerification, StudentController.TotalStudentGroupBySession);
router.post("/student/:id/:statusNumber", AuthVerification, StudentController.UpdateStatus);
router.post("/students", AuthVerification,  StudentController.ListByFilter);
router.get("/students/:search", AuthVerification, StudentController.StudentSearch);
router.get("/selected-students/:courseId/:sessionId", AuthVerification, StudentController.SelectedStudents);
router.get("/check-birth-certificate/:birthNumber", StudentController.CheckBirthCertificate);
router.post("/add-comment/:id", StudentController.AddComment);
router.delete("/delete-all-waiting", AuthVerification, StudentController.DeleteAllWaitingStudent);




 //CourseSession Api
 router.post("/session", AuthVerification, SessionController.AddSession);
 router.get("/session/:id", SessionController.ViewSession);
 router.get("/sessions", SessionController.SessionList);
 router.post("/update-session/:id", AuthVerification, SessionController.UpdateSession);
 router.get("/active-course-session", SessionController.ActiveSession);



 //Course API
 router.post("/course", AuthVerification, CourseController.AddCourse);
 router.get("/courses", CourseController.CourseList);
 router.get("/course/:id", CourseController.ViewCourse);
 router.post("/course/:id",  AuthVerification, CourseController.UpdateCourse);
 


 //Result Api
 router.post("/result", AuthVerification, ResultController.AddResult);
 router.get("/result/:regNumber", ResultController.FindResult);
 router.post("/result-list", ResultController.ResultList)
 router.post("/result/:regNumber", AuthVerification, ResultController.UpdateResult)





//Scholarship API
router.post("/scholarship-register", ScholarshipController.AddScholarshipData);
router.post("/applicant-list", AuthVerification,  ScholarshipController.ApplicantList);
router.get("/applicant/:id/:statusNumber", AuthVerification, ScholarshipController.UpdateStatus);
router.get("/applicant/:id", AuthVerification, ScholarshipController.ViewDetails);
router.get("/applicant-by-search/:search", AuthVerification, ScholarshipController.SearchResult);







//Received Scholarship API
router.post("/add-scholarship", AuthVerification, ReceivedScholarshipController.AddScholarship );
router.post("/scholarship-list", AuthVerification,  ReceivedScholarshipController.ScholarshiptList)
router.get("/scholarship/:regNumber", AuthVerification, ReceivedScholarshipController.FindScholarshipDetails);
router.post("/scholarship/:regNumber", AuthVerification, ReceivedScholarshipController.UpdateScholarshipData)
router.get("/is-applied/:birthNumber", ReceivedScholarshipController.CheckByBirthCertificate);





//Scholarship Session API
 router.post("/scholarship-session", AuthVerification, ScholarshipSessionController.AddSession);
 router.get("/scholarship-sessions", ScholarshipSessionController.ListSession);
 router.get("/scholarship-session/:id", ScholarshipSessionController.DetailsSession);
 router.post("/update-scholarship-session/:id", AuthVerification, ScholarshipSessionController.UpdateSession);
 router.get("/active-scholarship-session", ScholarshipSessionController.ActiveSession);



 //Institute API
 router.post("/institute", AuthVerification, InstituteController.AddInstitute);
 router.get("/institute/:id",  InstituteController.InstituteDetails);
 router.get("/institute-list", InstituteController.InstituteList);
 router.post("/institute/:id", AuthVerification, InstituteController.UpdateInstitute);
 router.delete("/institute/:id", AuthVerification, InstituteController.DeleteInstitutet);




 //Options Api
 router.post("/options", AuthVerification, OptionController.UpdateOption);
 router.get("/options", AuthVerification, OptionController.GetOption);

 



//User API
router.post('/register', AuthVerification, VerifyAdmin, UserController.RegisterUser);
router.post('/login', UserController.LoginUser);

router.get('/logout', UserController.LogoutUser);

router.get("/send-otp/:email", UserController.SendOtp )
router.get("/verify-otp/:email/:otp", UserController.VerifyOTP );

router.post("/reset-password", UserController.ResetPassword );
router.post("/change-password", AuthVerification, UserController.ChangePassword );


router.get("/profile", AuthVerification, UserController.Profile );
router.post("/profile", AuthVerification, UserController.ProfileUpdate );

//admin route
router.get("/users", AuthVerification, UserController.UserList );
router.get("/update-role/:id/:role", AuthVerification, VerifyAdmin, UserController.UpdateRole );


 
 
 




module.exports = router;