export class ComonFunction {
    public static validateForm(modal: any) {
        let isInvalid = false;
        Object.keys(modal).forEach((key: string) => {
            const isValue: any = modal;
            if (isValue[key] === '') {
                isInvalid = true;
                // 
                // Notification.show('Error', 'Please enterF'+ key, NotificationType.Danger);
            }
        });
        // if(isInvalid){
        return isInvalid;
        // Notification.show('Error', 'Please enter all data', NotificationType.Danger);
        // }
    }

}