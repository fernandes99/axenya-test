export const GSheetService = {
    sendLeadPartnerForm: (payload: any) => {
        const url = 'https://script.google.com/macros/s/AKfycbzkJ5zhjUZReSQhAOzbrJNptemc2fJwz543Kl7e1nmbuphBOA5eMzjeB-_xnJxe7wNL/exec';
        const response = fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': '*'
            },
            body: JSON.stringify(payload)
        }).then();

        return response;
    }
}