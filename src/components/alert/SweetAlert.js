import Swal from "sweetalert2";

// eslint-disable-next-line prefer-template

export function AlertBox(inputIcon, inputTitle, inputHtml, inputShowCancelButton, inputCancelButtonText, inputShowConfirmButton, inputConfirmButtonText) {

    return(
              
        Swal.fire({
            title: inputTitle,
            html: inputHtml,
            icon: inputIcon,
            allowOutsideClick: false,
            allowEscapeKey: false,
            backdrop: true,
            showCancelButton: inputShowCancelButton,
            showConfirmButton: inputShowConfirmButton,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',   
            cancelButtonText: inputCancelButtonText,     
            confirmButtonText: inputConfirmButtonText,
            
        })
        
    );
    
   
};
  
export function CancelAlertBox(inputIcon, inputTitle, inputHtml, inputTimer) {

    return(
              
        Swal.fire({
            title: inputTitle,
            html: inputHtml,
            icon: inputIcon,
            allowOutsideClick: false,
            allowEscapeKey: false,
            backdrop: true,
            showConfirmButton: false,
            timer: inputTimer
       })
        
    );
   
};  

export function TimerAlertBox(inputIcon, inputTitle, inputHtml, inputTimer, inputPosition) {

    return(
              
        Swal.fire({
            title: inputTitle,
            html: inputHtml,
            icon: inputIcon,
            allowOutsideClick: false,
            allowEscapeKey: false,
            backdrop: true,
            showConfirmButton: false,
            timer: inputTimer,
            position: inputPosition,
       })
        
    );
   
};  
