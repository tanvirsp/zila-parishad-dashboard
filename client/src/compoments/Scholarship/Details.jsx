import { useReactToPrint } from "react-to-print";
import FullScreenLoader from "../../layout/FullScreenLoader";
import ScholarshipStore from "../../store/ScholarshipStore";
import { useRef } from "react";


const Details = () => {
    const {ApplicantDetails} = ScholarshipStore();
    const componentPDF = useRef();


     //print document
     const printPDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: ApplicantDetails?.regNumber,
        
    })


    if(ApplicantDetails === null){
        return <FullScreenLoader />
    }


    const {regNumber, name, nameInEnglish, nidNumber, fatherName, motherName, parmanentVillage, parmanentArea, parmanentPostOffice,parmanentUpazilla,
        parmanentDistrict, presentVillage, presentArea, presentPostOffice, presentUpazilla, presentDistrict, examOne,examOneBoard, examOneGroup,
        examOneYear, examOneRoll, examOneReg, examOneResult, examTwo, examTwoBoard, examTwoGroup, examTwoYear, examTwoRoll, examTwoReg, examTwoResult,
        fatherNID, fatherYearlyIncome, cota, instuteNameAndAddress, mobile,  disabled, upazati, attachment, birthCertificateNumber,


    } = ApplicantDetails;

    return (
        <>
        <section  ref={componentPDF}  className="details-section ">
            <div className="d-flex justify-content-between">
                <h5>Reg: <b> {regNumber} </b> </h5>
            </div>
            <h5 className='my-2'>সাধারণ তথ্য</h5>
            <div className="row">
                <div className="col-md-5">
                    <div> 
                        <h6>নাম (বাংলায়): <b> {name} </b></h6>
                        <p >নাম (En): <b> {nameInEnglish} </b> </p>
                        <p>Birth Certificate No.: <b>{birthCertificateNumber} </b></p>
                        <p >NID No.: <b>{nidNumber} </b></p>
                    </div>
                </div>
                <div className="col-md-5">
                    <div> 
                        <p >পিতার নাম: <b> {fatherName} </b> </p>
                        <p >মাতার নাম: <b> {motherName} </b> </p>
                        <p>মোবাইল নম্বর: <b>{mobile}</b>  </p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div> 
                        <img className='border  border-dark img-fluid '  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${attachment.profileImg}`} alt="Thumbnail" />   
                        <img className='border  border-dark img-fluid '  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${attachment.signature}`} alt="Thumbnail" />   
                    </div>
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
                    <p>পিতার NID নম্বর:  <b>  {fatherNID}  </b> </p>
                    <p>পিতার বাৎসরিক আয়:  <b>{fatherYearlyIncome} </b> </p>
                    
                    <p>আবেদনকারী মুক্তিযোদ্ধার সন্তান/ নাতি নাতনি কি?   <b>{cota === "0" ? "না": "হ্যাঁ"}  </b> </p>
                    <p>আবেদনকারী প্রতিবন্ধী কি? <b> {disabled === "0" ? "না": "হ্যাঁ"}</b></p>
                   
             
                </div>
                <div className='w-50'>
                    <p>মাতার NID নম্বর:  <b>  {fatherNID}  </b> </p>
                    <p>মাতার বাৎসরিক আয়:  <b>{fatherYearlyIncome} </b> </p>
                    <p>অধ্যায়নরত প্রতিষ্ঠানের নাম ও ঠিকানা: <b>{instuteNameAndAddress} </b></p>
                    <p>আবেদনকারী উপজাতি কি ?  <b> {upazati === "0" ? "না": "হ্যাঁ"}</b> </p>
          
                </div>
            </div>
            <hr />
           
           
        </section>
         <div className='text-end position-fixed bottom-0 end-0'>
            <button onClick={printPDF} className='btn btn-lg btn-primary me-5 mb-5'>Print</button>
         </div>
         </>
    );
};

export default Details;