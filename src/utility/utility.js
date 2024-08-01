const dateFunction = (isoDate) =>{
    return isoDate.split("T")[0]

}

const statusRead = (status) =>{
    if(status === "1"){
        return "Active"
    } else {
        return "Expire"
    }

}


export {dateFunction, statusRead}