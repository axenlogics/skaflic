import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


declare var $: any;

export class CustomNotification {

    public static show(message: string, type = CNotificationType.Success, position = CNotificationPosition.TopRight as any) {
        
        let t: any = toast;
        t = t[type];

        return t(message, {
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export const CNotificationType = {
    Success: 'success',
    Error: 'error'
}

export const CNotificationPosition = {
    TopLeft: 'top-left',
    TopRight: 'top-right',
    TopCenter: 'top-center',
    BottomLeft: 'bottom-left',
    BottomRight: 'bottom-right',
    BottomCenter: 'bottom-center',
}


