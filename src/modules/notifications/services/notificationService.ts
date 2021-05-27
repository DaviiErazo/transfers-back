export interface INotificationService {
    sendEmail (props: IEmail)
}

export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text: string;
}