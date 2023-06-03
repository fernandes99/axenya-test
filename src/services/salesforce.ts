interface ISalesForce {
    name: string,
    email: string,
    phone: string,
    company: string,
    message?: string
}

export const sendSalesForce = async (data: ISalesForce) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            message: data.message || ""
        })
    }

    await fetch('/api/salesforce/send-lead', options);
}