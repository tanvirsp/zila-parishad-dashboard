import { useEffect, useState } from "react";
import InformationStore from "../../store/InformationStore";
import CommonSkeleton from "../../skeletons/CommonSkeleton";
import toast from "react-hot-toast";


const Information = () => {
    const {Loading, UpdateInformationRequest, DetailsInformationRequest, DetailsInformation} = InformationStore();

    const [data, setData] = useState({})



    useEffect(()=>{
        (async()=>{
            DetailsInformation == null && await DetailsInformationRequest();
        })();


    } ,[]);

    

    const handleData =(name, value) =>{
        setData({
            ...data,
            [name]: value
        })
    }


    
    const handleSubmit =async(e)=>{
        e.preventDefault();

        const result = await UpdateInformationRequest(DetailsInformation._id, data)
        if(result.status === "success"){
            toast.success("Data addeded successfully");
            await DetailsInformationRequest();

        } else{
            toast.error("Something went wrong");
        }

       

       
    };

    if(Loading) {
        return <CommonSkeleton/>
    }


    return (
        <section className="bg-white p-4 border rounded-3 mt-4">
            <h5 className="mb-2">Infornamtion Section</h5>
            <form  onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label mt-3"> জামালপুর জেলা পরিষদ গঠনের তারিখ </label>
                            <input defaultValue={DetailsInformation?.estiblishDate} onBlur={(e)=>handleData("estiblishDate", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">জেলার আয়তন </label>
                            <input defaultValue={DetailsInformation?.area} onBlur={(e)=>handleData("area", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">মোট জমির পরিমান </label>
                            <input defaultValue={DetailsInformation?.amountOfLand} onBlur={(e)=>handleData("amountOfLand", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">ডাকবাংলো</label>
                            <input defaultValue={DetailsInformation?.dakbanglo} onBlur={(e)=>handleData("dakbanglo", e.target.value)}   className="form-control"  />

                           

                        </div>
                        <div className="col-md-4">
                            
                            <label className="form-label mt-3">খেয়াঘাট </label>
                            <input defaultValue={DetailsInformation?.kheyegat} onBlur={(e)=>handleData("kheyegat", e.target.value)}   className="form-control"  />

                            <label className="form-label ">পুকুর </label>
                            <input defaultValue={DetailsInformation?.pond} onBlur={(e)=>handleData("pond", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">যাত্রীছাউনী </label>
                            <input defaultValue={DetailsInformation?.passengerCabin} onBlur={(e)=>handleData("passengerCabin", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">অডিটরিয়াম </label>
                            <input defaultValue={DetailsInformation?.oditorian} onBlur={(e)=>handleData("oditorian", e.target.value)} required className="form-control"  />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mt-3">অবসর ও বিনোদন কেন্দ্র (পিকনিক স্পট) </label>
                            <input defaultValue={DetailsInformation?.picnicSpot} onBlur={(e)=>handleData("picnicSpot", e.target.value)} required className="form-control"  />
                            
                            <label className="form-label mt-3">আ:জেলা বাসটার্মিনাল	 </label>
                            <input defaultValue={DetailsInformation?.busTarnimal} onBlur={(e)=>handleData("busTarnimal", e.target.value)}   required className="form-control"  />

                            <label className="form-label mt-3">ভিডিও লিংক </label>
                            <input defaultValue={DetailsInformation?.video} onBlur={(e)=>handleData("video", e.target.value)}   required className="form-control"  />

                            <input  className="btn btn-success w-100 mt-4" type="submit" value="Update Now"/>



                        </div>
                    </div>
                
                    
                </form>
        </section>
    );
};

export default Information;