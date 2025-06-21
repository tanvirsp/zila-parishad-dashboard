export const dateFunction = (isoDate) =>{
    return isoDate?.split("T")[0]

}

export const statusRead = (status) =>{
    if(status === "1"){
        return "Active"
    } else {
        return "Expire"
    }

}


export const setEmail =(email)=>{
    sessionStorage.setItem("email", email)
}


export const getEmail =()=>{
    return sessionStorage.getItem("email")
};



// setUserDetails(UserDetails){
//     localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
// };

// getUserDetails(){
//     return JSON.parse(localStorage.getItem("UserDetails"));
// };
