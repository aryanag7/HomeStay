let switchBtn = document.querySelector("#flexSwitchCheckDefault");
switchBtn.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for(info of taxInfo){

        if (switchBtn.checked){
            
            info.style.display= "inline";
        }
        else{
            info.style.display= "none";
        }
       
    }


})