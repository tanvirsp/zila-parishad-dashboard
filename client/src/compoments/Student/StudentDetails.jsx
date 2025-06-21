
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import StudentStore from '../../store/StudentStore';
import FullScreenLoader from '../../layout/FullScreenLoader';
import CourseStore from '../../store/CourseStore';
import Table from 'react-bootstrap/Table';
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";


const StudentDetails = () => {
    const {id} = useParams();
    const {StudentDetails, StudentDetailsRequest, CommentUpdateRequest} = StudentStore()
    const {AllCourse, AllCourseRequest} = CourseStore();
    const componentPDF = useRef();

    const { register, handleSubmit } = useForm();

    const onSubmit = async(data )=> {
        const res = await CommentUpdateRequest(id, data);
        if(res.status === "success"){
            toast.success("Comment Added Successfully")
        } else {
            toast.error("Something Went Wrong")
        }
    };
 




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
    const {regNumber, name, nameInEnglish,birthDate, fatherName, motherName, parmanentVillage, parmanentArea, parmanentPostOffice,parmanentUpazilla,
        parmanentDistrict, presentVillage, presentArea, presentPostOffice, presentUpazilla, presentDistrict, examOne,examOneBoard, examOneGroup,
        examOneYear, examOneRoll, examOneReg, examOneResult, examTwo, examTwoBoard, examTwoGroup, examTwoYear, examTwoRoll, examTwoReg, examTwoResult,
        honSubject, honRoll, honReg, honYear, honResult, masSubject, masRoll, masReg, masYear, masResult, comment,
        courseDetails, cota, certificateCopy, mobile, email, disabled, upazati, attachment, birthCertificateNumber, fatherNameinEnglish, motherNameInEnglish

    } = StudentDetails;

    


    return (
    <div>
        <div  className="details-section mb-2 rounded-3 ">
           
            <form onSubmit={handleSubmit(onSubmit)}>
           
                
                <label className="form-label">মন্তব্য:</label>
                <textarea defaultValue={comment} className="form-control" rows="3" {...register("comment", { required: true })}></textarea>
                
                <input className='btn btn-outline-success btn-sm mt-1' type="submit" value="Comment" />
            </form>

         


        </div>
        <div  ref={componentPDF}  className="details-section  ">
            <section className='d-flex align-items-center'>
                <div className='w-75'>
                    <h5>রেজি: নাম্বার: {regNumber}</h5>
                    <h5 className='py-2'>কোর্স বিষয়: {courseDetails.name}</h5>

                </div>
                <div className='w-25'>
                    <img className='img-fluid rounded-2' src={`${import.meta.env.VITE_URL}/${attachment.profileImg}`} alt="Profile" />
                </div>

            </section>
{/* সাধারণ তথ্য: */}
            <section >
                <h4 className='section-title' >সাধারণ তথ্য:</h4>
                <Table bordered >
                    <tbody> 
                    <tr>
                        <td>প্রশিক্ষনার্থীর নাম (বাংলায়):</td>
                        <td>{name}</td>

                        <td>প্রশিক্ষনার্থীর নাম (ইংরেজীতে)</td>
                        <td>{nameInEnglish}</td>
                    </tr>
                    <tr>
                        <td>পিতার নাম (বাংলায়):</td>
                        <td> {fatherName}</td>

                        <td >পিতার নাম (ইংরেজীতে)</td>
                        <td>{fatherNameinEnglish}</td>
                    </tr>
                    <tr>
                        <td >মাতার নাম (বাংলায়):</td>
                        <td> {motherName}</td>

                        <td>মাতার নাম (ইংরেজীতে):</td>
                        <td> { motherNameInEnglish } </td>
                    </tr>
                    <tr>
                        <td >জন্ম তারিখ:</td>
                        <td> { birthDate } </td>

                        <td>জন্ম নিবন্ধন নাম্বার:</td>
                        <td> { birthCertificateNumber } </td>
                    </tr>
                    <tr>
                        <td>ইমেইল:</td>
                        <td>   { email }  </td>

                        <td >মোবাইল নম্বর:</td>
                        <td> { mobile }  </td> 
                    </tr>
                 
                    </tbody>
                </Table>
            </section>

{/* স্থায়ী ঠিকানা */}
            <section className='d-flex' >
                <div className='w-50 me-1'>
                    <h4  className='section-title'>স্থায়ী ঠিকানা:</h4>
                    <Table bordered>
                    <tbody> 
                        
                        <tr>
                            <td >গ্রাম/বাসা নম্বর:</td>
                            <td> { parmanentVillage }  </td> 
                        </tr>
                        <tr>
                            <td >এলাকা:</td>
                            <td> { parmanentArea }  </td>
                        </tr>
                        <tr>
                            <td >ডাকঘর:</td>
                            <td> { parmanentPostOffice }  </td>
                        </tr>
                        <tr>
                            <td>উপজেলা:</td>
                            <td>  { parmanentUpazilla }  </td>                        
                        </tr>
                        <tr>
                            <td >জেলা:</td>
                            <td>  { parmanentDistrict } </td>
                        </tr>
                        </tbody> 
                    </Table>
                </div>
                <div className='w-50 ms-1'>
                    <h4 className='section-title' >বর্তমান ঠিকানা:</h4>
                    <Table bordered>
                    <tbody> 
                        
                        <tr>
                            <td >গ্রাম/বাসা নম্বর:</td>
                            <td> { presentVillage }  </td> 
                        </tr>
                        <tr>
                            <td >এলাকা:</td>
                            <td> { presentArea } </td>
                        </tr>
                        <tr>
                            <td >ডাকঘর:</td>
                            <td>  { presentPostOffice } </td>
                        </tr>
                        <tr>
                            <td >উপজেলা:</td>
                            <td> { presentUpazilla } </td>                        
                        </tr>
                        <tr>
                            <td >জেলা:</td>
                            <td> { presentDistrict } </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </section>

{/* এস এস সি / সমমান পরীক্ষা পাসের বিবরণ */}
            <section className='d-flex' >
                <div className='w-50 me-1' >
                    <h4 className='section-title' >এস এস সি / সমমান পরীক্ষা পাসের বিবরণ:</h4>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td >পরীক্ষার নাম:</td>
                                <td> { examOne } </td> 
                            </tr>
                            <tr>
                                <td >বোর্ড:</td>
                                <td> { examOneBoard } </td>
                            </tr>
                            <tr>
                                <td >গ্রুপ/বিভাগ:</td>
                                <td> { examOneGroup } </td>
                            </tr>
                            <tr>
                                <td >পাশের সন:</td>
                                <td>{ examOneYear }</td>                        
                            </tr>
                            <tr>
                                <td >রোল নাম্বার:</td>
                                <td>{ examOneRoll }</td>
                            </tr>
                            <tr>
                                <td >রেজিস্ট্রেশন নাম্বার:</td>
                                <td>{ examOneReg }</td>
                            </tr>
                            <tr>
                                <td >ফলাফল:</td>
                                <td>{ examOneResult }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='w-50 ms-1' >
                    <h4 className='section-title' >এইচ এস সি / সমমান পরীক্ষা পাসের বিবরণ:</h4>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td >পরীক্ষার নাম:</td>
                                <td> { examTwo }</td> 
                            </tr>
                            <tr>
                                <td >বোর্ড:</td>
                                <td>  { examTwoBoard } </td>
                            </tr>
                            <tr>
                                <td >গ্রুপ/বিভাগ:</td>
                                <td>{ examTwoGroup } </td>
                            </tr>
                            <tr>
                                <td >পাশের সন:</td>
                                <td>{ examTwoYear }</td>                        
                            </tr>
                            <tr>
                                <td >রোল নাম্বার:</td>
                                <td>{ examTwoRoll }</td>
                            </tr>
                            <tr>
                                <td >রেজিস্ট্রেশন নাম্বার:</td>
                                <td>{ examTwoReg }</td>
                            </tr>
                            <tr>
                                <td >ফলাফল:</td>
                                <td>{ examTwoResult }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </section>

{/* অনার্স / মাস্টার্স পাসের বিবরণ*/}
            <section className='d-flex' >
                <div className='w-50 me-1' >
                    <h4 className='section-title'> স্নাতক পাসের বিবরণ:</h4>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td >বিষয়:</td>
                                <td> { honSubject } </td> 
                            </tr>
                            <tr>
                                <td >রোল নাম্বার:</td>
                                <td> { honRoll } </td>
                            </tr>
                            <tr>
                                <td >রেজিস্ট্রেশন নাম্বার:</td>
                                <td> { honReg } </td>
                            </tr>
                            <tr>
                                <td >পাশের সন:</td>
                                <td>{ honYear }</td>                        
                            </tr>
                        
                            <tr>
                                <td >ফলাফল:</td>
                                <td>{ honResult }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='w-50 ms-1' >
                    <h4 className='section-title' >স্নাতকোত্তর পাসের বিবরণ:</h4>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td >বিষয়:</td>
                                <td> { masSubject } </td> 
                            </tr>
                            <tr>
                                <td >রোল নাম্বার:</td>
                                <td> { masRoll } </td>
                            </tr>
                            <tr>
                                <td >রেজিস্ট্রেশন নাম্বার:</td>
                                <td> { masReg } </td>
                            </tr>
                            <tr>
                                <td >পাশের সন:</td>
                                <td>{ masYear }</td>                        
                            </tr>
                        
                            <tr>
                                <td >ফলাফল:</td>
                                <td>{ masResult }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </section>
            
{/* অন্যান্য তথ্য*/}
            <section >
                <h4 className='section-title' >অন্যান্য তথ্য::</h4>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td >আবেদনকারী মুক্তিযোদ্ধার সন্তান/ নাতি নাতনি কি?</td>
                            <td> { cota == '0' ? 'না' : 'হ্যা' }</td>
                        </tr>
                        <tr>
                            <td >আবেদনকারী প্রতিবন্ধী কি?</td>
                            <td> { disabled == '0' ? 'না' : 'হ্যা' } </td>                        
                        </tr>
                        <tr>
                            <td >আবেদনকারী উপজাতি কি?</td>
                            <td>  { upazati == '0' ? 'না' : 'হ্যা' }  </td>
                        </tr>
                       
                    </tbody>
        
                </Table>
            
            </section>
            
            <div className='mt-4'>
                <h5 className='mb-2'>সংযুক্ত:</h5>
                <p>নাগরিকত্ব সনদপত্রের কপি:  <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.citizenshipCertificateImg}`}>{`${import.meta.env.VITE_URL}/${attachment.citizenshipCertificateImg}`}</a>  </p>
                <p>জন্মনিবন্ধন কপি: <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${attachment.birthCertificateImg}`}>{`${import.meta.env.VITE_URL}/${attachment.birthCertificateImg}`}</a>   </p>
                {
                    certificateCopy?.map ( (item, index) =>{
                        return(
                            <p key ={index}>সনদপত্র-{index+1} : <a target='_blank' rel="noreferrer" href={`${import.meta.env.VITE_URL}/${item}`}>{`${import.meta.env.VITE_URL}/${item}`}</a>   </p>
                        )
                    })
                }
            </div>
            
           
        </div>
         <div className='text-end position-fixed bottom-0 end-0'>
            <button onClick={printPDF} className='btn  btn-primary me-5 mb-5'>Print</button>
         </div>
    </div>
    );
};

export default StudentDetails;