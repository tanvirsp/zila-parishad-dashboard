
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import StudentStore from '../store/StudentStore';
import FullScreenLoader from './../layout/FullScreenLoader';
import CourseStore from '../store/CourseStore';


const StudentDetails = () => {
    const {id} = useParams();
    const {StudentDetails, StudentDetailsRequest} = StudentStore()
    const {AllCourse, AllCourseRequest} = CourseStore();
    const componentPDF = useRef();



    useEffect( ()=>{
        ( async()=>{
            await StudentDetailsRequest(id);
            AllCourse === null && await AllCourseRequest()
        })()

    } ,[id])


//print document
    const printPDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: StudentDetails?.regNumber,
        
    })



    if(StudentDetails === null){
        return <FullScreenLoader />
    }
    const {regNumber, name, nameInEnglish, nidNumber, fatherName, motherName, parmanentVillage, parmanentArea, parmanentPostOffice,parmanentUpazilla,
        parmanentDistrict, presentVillage, presentArea, presentPostOffice, presentUpazilla, presentDistrict, examOne,examOneBoard, examOneGroup,
        examOneYear, examOneRoll, examOneReg, examOneResult, examTwo, examTwoBoard, examTwoGroup, examTwoYear, examTwoRoll, examTwoReg, examTwoResult,
        fatherNID, fatherYearlyIncome, cota, instuteNameAndAddress, mobile, email, disabled, upazati, attachment, courseId


    } = StudentDetails;

    const selectedCourse = AllCourse?.find( (item)=> item._id === courseId  );

console.log(StudentDetails);

    return (
        <>
        <section  ref={componentPDF}  className="details-section">
            <div className="d-flex justify-content-between">
                <h5>Reg: <b> {regNumber} </b> </h5>
                <h5>Course: <b>   {selectedCourse?.name } </b> </h5>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <h5 className='mb-2'>সাধারণ তথ্য</h5>
                    <h6>নাম (বাংলায়): <b> {name} </b></h6>
                    <h6 >Name in English: <b> {nameInEnglish} </b> </h6>
                    <h6 >NID Number: <b>{nidNumber} </b></h6>
                    <h6 >পিতার নাম: <b> {fatherName} </b> </h6>
                    <h6  >মাতার নাম নাম: <b> {motherName} </b> </h6>
                </div>
                <div style={{width: "150px"}}>
                    <img className='border  border-dark img-fluid '  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${attachment.profileImg}`} alt="Thumbnail" />   
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
                <div className='w-50'>
                    <h5 className='mb-2'>স্থায়ী ঠিকানা: </h5>
                    <p>গ্রাম/বাসা নম্বর: <b> {parmanentVillage} </b> </p>
                    <p>এলাকা: <b> { parmanentArea } </b></p>
                    <p>ডাকঘর:  <b>{parmanentPostOffice} </b> </p>
                    <p>উপজেলা: <b> {parmanentUpazilla} </b></p>
                    <p>জেলা: <b> {parmanentDistrict} </b> </p>
                </div>
                <div className='w-50'>
                    <h5>বর্তমান ঠিকানা </h5>
                    <p>গ্রাম/বাসা নম্বর: <b> {presentVillage} </b> </p>
                    <p>এলাকা: <b> {presentArea} </b> </p>
                    <p>ডাকঘর: <b> {presentPostOffice} </b> </p>
                    <p>উপজেলা: <b> {presentUpazilla} </b></p>
                    <p>জেলা: <b> {presentDistrict} </b> </p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
                <div className='w-50'>
                    <h5 className='mb-2'>পরীক্ষা পাসের বিবরণ:</h5>
                    <p>পরীক্ষার নাম: <b> {examOne}  </b> </p>
                    <p>বোর্ড:  <b> {examOneBoard}  </b></p>
                    <p>গ্রুপ/বিভাগ:   <b>{examOneGroup} </b></p>
                    <p>পাশের সন:  <b> {examOneYear} </b></p>
                    <p>রোল নাম্বার:  <b> {examOneRoll} </b></p>
                    <p>রেজিস্ট্রেশন নাম্বার:  <b> {examOneReg} </b></p>
                    <p>ফলাফল:    <b>{examOneResult} </b></p>
                </div>
                <div className='w-50'>
                    <h5 className='mb-2'>পরীক্ষা পাসের বিবরণ:</h5>
                    <p>পরীক্ষার নাম:  <b> {examTwo}  </b></p>
                    <p>বোর্ড:   <b>{examTwoBoard} </b></p>
                    <p>গ্রুপ/বিভাগ:  <b> {examTwoGroup}</b></p>
                    <p>পাশের সন:  <b> {examTwoYear}</b></p>
                    <p>রোল নাম্বার:  <b> {examTwoRoll} </b></p>
                    <p>রেজিস্ট্রেশন নাম্বার:  <b>{examTwoReg} </b></p>
                    <p>ফলাফল:  <b> {examTwoResult} </b></p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
                <div className='w-50'>
                    <h5 className='mb-2'>অভিভাবকের তথ্য:</h5>
                    <p>পিতা/ অভিভাবকের NID নম্বর:  <b>  {fatherNID}  </b> </p>
                    <p>পিতা/ অভিভাবকের বাৎসরি আয়:  <b>{fatherYearlyIncome} </b> </p>
                    <p>আবেদনকারী মুক্তিযোদ্ধার সন্তান/ নাতি নাতনি কি?   <b>{cota === "0" ? "না": "হ্যাঁ"}  </b> </p>
                    <p>আবেদনকারী প্রতিবন্ধী কি? <b> {disabled === "0" ? "না": "হ্যাঁ"}</b></p>
                    <p>আবেদনকারী উপজাতি কি ?  <b> {upazati === "0" ? "না": "হ্যাঁ"}</b> </p>
             
                </div>
                <div className='w-50'>
                    <h5 className='mb-2'>যোগাযোগের তথ্য:</h5>
                    <p>মোবাইল নম্বর: <b>{mobile}</b>  </p>
                    <p>ইমেইল: <b>{email}</b>  </p>
                    <p>অধ্যায়নরত প্রতিষ্ঠানের নাম ও ঠিকানা: <b>{instuteNameAndAddress} </b></p>
          
                </div>
            </div>
            <hr />
            <div className='mt-4'>
                <h5 className='mb-2'>সংযুক্ত:</h5>
                <p>শিক্ষা প্রতিষ্ঠানে অধ্যায়নের প্রমাণপত্র: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.studyingImg}`}>{`${import.meta.env.VITE_URL}/${attachment.studyingImg}`}</a> </p>
                <p>নাগরিকত্ব সনদপত্রের কপি:  <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.citizenshipCertificateImg}`}>{`${import.meta.env.VITE_URL}/${attachment.citizenshipCertificateImg}`}</a>  </p>
                <p>এনআইডি/NID কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.nidImg}`}>{`${import.meta.env.VITE_URL}/${attachment.nidImg}`}</a>   </p>
                <p>জন্মনিবন্ধন কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.birthCertificateImg}`}>{`${import.meta.env.VITE_URL}/${attachment.birthCertificateImg}`}</a>   </p>
            </div>
            
           
        </section>
         <div className='text-end position-fixed bottom-0 end-0'>
            <button onClick={printPDF} className='btn btn-lg btn-primary me-5 mb-5'>Print</button>
         </div>
         </>
    );
};

export default StudentDetails;