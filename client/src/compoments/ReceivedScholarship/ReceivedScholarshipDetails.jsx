import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";


const ReceivedScholarshipDetails = () => {


    const {ScholarshipStudentData} = ReceivedScholarshipStore();

    const {regNumber, amount, sessionsDetails, studentDetails} = ScholarshipStudentData;

    return (
        <section  className="container ">
        <div className="row  bg-white p-5 rounded-3">
            <div className="col-md-4">
                <h6>রেজি:</h6>
                <h5> <b> {regNumber} </b> </h5>
            </div>
            <div className="col-md-4">
                <h6>অর্থের পরিমাণ:</h6>
                <h5> <b>  {amount } </b> </h5>
            </div>
            <div className="col-md-4">
                <h6>সেশন:</h6>
                <h5> <b>   {sessionsDetails.session } </b> </h5>
            </div>
        </div>



        
        <div className="row  bg-white p-5 rounded-3 my-2">
            <div className="col-md-5">
                <div> 
                     <h5 className='my-2 text-danger'>সাধারণ তথ্য</h5>
                    <h6>নাম (বাংলায়): <b> {studentDetails.name} </b></h6>
                    <p >নাম (En): <b> {studentDetails.nameInEnglish} </b> </p>
                    <p>Birth Certificate No.: <b>{studentDetails.birthCertificateNumber} </b></p>
                    <p >NID No.: <b>{studentDetails.nidNumber} </b></p>
                </div>
            </div>
            <div className="col-md-5">
                <div> 
                    <p className="mt-5" >পিতার নাম: <b> {studentDetails.fatherName} </b> </p>
                    <p >পিতার নাম (En): <b> {studentDetails.fatherNameinEnglish} </b> </p>
                    <p >মাতার নাম: <b> {studentDetails.motherName} </b> </p>
                    <p >মাতার নাম (En): <b> {studentDetails.motherNameInEnglish} </b> </p>
                </div>
            </div>
            <div className="col-md-2">
                <div> 
                    <img className='border rounded-3 border-dark img-fluid '  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${studentDetails.attachment.profileImg}`} alt="Thumbnail" />   
                </div>
            </div>
        </div>
       
        <div className="row bg-white p-5 rounded-3 my-2">
            <div className='col-md-6'>
                <h5 className='mb-2 text-danger'>স্থায়ী ঠিকানা: </h5>
                <p>গ্রাম/বাসা নম্বর: <b> {studentDetails.parmanentVillage} </b> </p>
                <p>এলাকা: <b> {studentDetails.parmanentArea } </b></p>
                <p>ডাকঘর:  <b>{studentDetails.parmanentPostOffice} </b> </p>
                <p>উপজেলা: <b> {studentDetails.parmanentUpazilla} </b></p>
                <p>জেলা: <b> {studentDetails.parmanentDistrict} </b> </p>
            </div>
            <div className='col-md-6'>
                <h5 className="text-danger">বর্তমান ঠিকানা </h5>
                <p>গ্রাম/বাসা নম্বর: <b> {studentDetails.presentVillage} </b> </p>
                <p>এলাকা: <b> {studentDetails.presentArea} </b> </p>
                <p>ডাকঘর: <b> {studentDetails.presentPostOffice} </b> </p>
                <p>উপজেলা: <b> {studentDetails.presentUpazilla} </b></p>
                <p>জেলা: <b> {studentDetails.presentDistrict} </b> </p>
            </div>
        </div>
        <div className="row bg-white p-5 rounded-3 my-2">
            <div className='col-md-6'>
                <h5 className='mb-2 text-danger'>পরীক্ষা পাসের বিবরণ:</h5>
                <p>পরীক্ষার নাম: <b> {studentDetails.examOne}  </b> </p>
                <p>বোর্ড:  <b> {studentDetails.examOneBoard}  </b></p>
                <p>গ্রুপ/বিভাগ:   <b>{studentDetails.examOneGroup} </b></p>
                <p>পাশের সন:  <b> {studentDetails.examOneYear} </b></p>
                <p>রোল নাম্বার:  <b> {studentDetails.examOneRoll} </b></p>
                <p>রেজিস্ট্রেশন নাম্বার:  <b> {studentDetails.examOneReg} </b></p>
                <p>ফলাফল:    <b>{studentDetails.examOneResult} </b></p>
            </div>
            <div className='col-md-6'>
                <h5 className='mb-2 text-danger'>পরীক্ষা পাসের বিবরণ:</h5>
                <p>পরীক্ষার নাম:  <b> {studentDetails.examTwo}  </b></p>
                <p>বোর্ড:   <b>{studentDetails.examTwoBoard} </b></p>
                <p>গ্রুপ/বিভাগ:  <b> {studentDetails.examTwoGroup}</b></p>
                <p>পাশের সন:  <b> {studentDetails.examTwoYear}</b></p>
                <p>রোল নাম্বার:  <b> {studentDetails.examTwoRoll} </b></p>
                <p>রেজিস্ট্রেশন নাম্বার:  <b>{studentDetails.examTwoReg} </b></p>
                <p>ফলাফল:  <b> {studentDetails.examTwoResult} </b></p>
            </div>
        </div>
        <div className="row bg-white p-5 rounded-3 my-2">
            <div className='col-md-6'>
                <h5 className='mb-2 text-danger'>অভিভাবকের তথ্য:</h5>
                <p>পিতা/ অভিভাবকের NID নম্বর:  <b>  {studentDetails.fatherNID}  </b> </p>
                <p>পিতা/ অভিভাবকের বাৎসরি আয়:  <b>{studentDetails.fatherYearlyIncome} </b> </p>
                <p>আবেদনকারী মুক্তিযোদ্ধার সন্তান/ নাতি নাতনি কি?   <b>{studentDetails.cota === "0" ? "না": "হ্যাঁ"}  </b> </p>
                <p>আবেদনকারী প্রতিবন্ধী কি? <b> {studentDetails.disabled === "0" ? "না": "হ্যাঁ"}</b></p>
                <p>আবেদনকারী উপজাতি কি ?  <b> {studentDetails.upazati === "0" ? "না": "হ্যাঁ"}</b> </p>
         
            </div>
                <div className='col-md-6'>
                <h5 className='mb-2 text-danger'>যোগাযোগের তথ্য:</h5>
                <p>মোবাইল নম্বর: <b>{studentDetails.mobile}</b>  </p>
                <p>ইমেইল: <b>{studentDetails.email}</b>  </p>
                <p>অধ্যায়নরত প্রতিষ্ঠানের নাম ও ঠিকানা: <b>{studentDetails.instuteNameAndAddress} </b></p>
      
            </div>
        </div>      
        <div className="row bg-white p-5 rounded-3 my-2">
            <h5 className='mb-2 text-danger'>সংযুক্ত:</h5>
            <p>শিক্ষা প্রতিষ্ঠানে অধ্যায়নের প্রমাণপত্র: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${studentDetails.attachment.studyingImg}`}>{`${import.meta.env.VITE_URL}/${studentDetails.attachment.studyingImg}`}</a> </p>
            <p>নাগরিকত্ব সনদপত্রের কপি:  <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${studentDetails.attachment.citizenshipCertificateImg}`}>{`${import.meta.env.VITE_URL}/${studentDetails.attachment.citizenshipCertificateImg}`}</a>  </p>
            <p>জন্মনিবন্ধন কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${studentDetails.attachment.birthCertificateImg}`}>{`${import.meta.env.VITE_URL}/${studentDetails.attachment.birthCertificateImg}`}</a>   </p>
            <p>NID কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${studentDetails.attachment.nidImg}`}>{`${import.meta.env.VITE_URL}/${studentDetails.attachment.nidImg}`}</a>   </p>
            <p>দারিদ্র সনদ কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${studentDetails.attachment.poorCertificateImg}`}>{`${import.meta.env.VITE_URL}/${studentDetails.attachment.poorCertificateImg}`}</a>   </p>
        </div>
        
       
    </section>
    );
};

export default ReceivedScholarshipDetails;