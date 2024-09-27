export type typeSendMail = {
    by: string;
    name: string;
    subject: string;
    phone?: string;
    content: string;
}

export type attachmentsMail = [
    {
        filename: string,
        path: string
    }
]
