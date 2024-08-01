
import { useEffect, useRef } from 'react';
import avatar from '../assets/images/avater.jpg';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import StudentStore from '../store/StudentStore';
import FullScreenLoader from './../layout/FullScreenLoader';


const StudentDetails = () => {
    const {id} = useParams();
    const {StudentDetails, StudentDetailsRequest} = StudentStore()
    const componentPDF = useRef();



    useEffect( ()=>{
        ( async()=>{
            await StudentDetailsRequest(id)

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
    const {name, nameInEnglish,} = StudentDetails;

    return (
        <>
        <section  ref={componentPDF}  className="details-section">
            <div className="d-flex justify-content-between">
                <h5>Reg: {}</h5>
                <h5>Course: Spoken English</h5>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <h5>সাধারণ তথ্য</h5>
                    <h6>নাম (বাংলায়): {name}</h6>
                    <h6 >Name in English: {nameInEnglish} </h6>
                    <h6 >NID Number: 513669911</h6>
                    <h6 >পিতার নাম: মীর দেলোয়ার হোসেন </h6>
                    <h6  >মাতার নাম নাম: মীর দেলোয়ার হোসেন </h6>
                </div>
                <div style={{width: "130px"}}>
                    <img width="130px" src={avatar} alt="Avatar" />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-5">
                <div className='w-50'>
                    <h5>স্থায়ী ঠিকানা: </h5>
                    <p>গ্রাম/বাসা নম্বর: ফুলবাড়ীয়া  </p>
                    <p>এলাকা: মুন্সিপাড়া </p>
                    <p>ডাকঘর: জামালপুর সদর </p>
                    <p>উপজেলা: জামালপুর সদর </p>
                    <p>জেলা: জামালপুর </p>
                </div>
                <div className='w-50'>
                    <h5>বর্তমান ঠিকানা:</h5>
                    <p>গ্রাম/বাসা নম্বর: ফুলবাড়ীয়া  </p>
                    <p>এলাকা: মুন্সিপাড়া </p>
                    <p>ডাকঘর: জামালপুর সদর </p>
                    <p>উপজেলা: জামালপুর সদর </p>
                    <p>জেলা: জামালপুর </p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-5">
                <div className='w-50'>
                    <h5>এস এস সি / সমমান পরীক্ষা পাসের বিবরণ:</h5>
                    <p>পরীক্ষার নাম: SSC  </p>
                    <p>বোর্ড: Dhaka </p>
                    <p>গ্রুপ/বিভাগ: Business Studies</p>
                    <p>পাশের সন: 2005</p>
                    <p>রোল নাম্বার: 25489966</p>
                    <p>রেজিস্ট্রেশন নাম্বার: 11298566</p>
                    <p>ফলাফল: 4.06</p>
                </div>
                <div className='w-50'>
                    <h5>এইচ এস সি / সমমান পরীক্ষা পাসের বিবরণ:</h5>
                    <p>পরীক্ষার নাম: SSC  </p>
                    <p>বোর্ড: Dhaka </p>
                    <p>গ্রুপ/বিভাগ: Business Studies</p>
                    <p>পাশের সন: 2005</p>
                    <p>রোল নাম্বার: 25489966</p>
                    <p>রেজিস্ট্রেশন নাম্বার: 11298566</p>
                    <p>ফলাফল: 4.06</p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-5">
                <div className='w-50'>
                    <h5>অভিভাবকের তথ্য:</h5>
                    <p>পিতা/ অভিভাবকের NID নম্বর: </p>
                    <p>পিতা/ অভিভাবকের বাৎসরি আয়:</p>
                    <p>আবেদনকারী মুক্তিযোদ্ধার সন্তান/ নাতি নাতনি কি? </p>
                    <p>আবেদনকারী প্রতিবন্ধী কি?</p>
                    <p>আবেদনকারী উপজাতি কি ?</p>
             
                </div>
                <div className='w-50'>
                    <h5>যোগাযোগের তথ্য:</h5>
                    <p>মোবাইল নম্বর  </p>
                    <p>ইমেইল (Optional) </p>
                    <p>অধ্যায়নরত প্রতিষ্ঠানের নাম ও ঠিকানা:</p>
          
                </div>
            </div>
            <hr />
            <div className='mt-4'>
                <h5>সংযুক্ত:</h5>
                <p>শিক্ষা প্রতিষ্ঠানে অধ্যায়নের প্রমাণপত্র:</p>
                <p>নাগরিকত্ব সনদপত্রের কপি:</p>
                <p>এনআইডি/NID কপি:</p>
                <p>জন্মনিবন্ধন কপি:</p>
            </div>
            
           
        </section>
         <div className='text-end position-fixed bottom-0 end-0'>
            <button onClick={printPDF} className='btn btn-lg btn-primary me-5 mb-5'>Print</button>
         </div>
         </>
    );
};

export default StudentDetails;