interface PayloadSendLeadType {
    email_address: string,
    status: "subscribed",
    tags: string[],
    merge_fields: {
        FNAME: string,
        PHONE: string,
        COMPANY: string,
        SECTOR: string,
        COMMENT: string
    }
}

export const MailchimpService = {
    sendLead: (payload: PayloadSendLeadType) => {
        const response = fetch('/api/mailchimp/member/add', {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then();

        return response;
    }
}