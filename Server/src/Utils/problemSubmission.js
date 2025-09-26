const axios = require('axios');



const submitBatch = async (submissions)=>{

    // console.log(submissions)
    const options = {

        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {

            'x-rapidapi-key': process.env.JUDGE0_PASS,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    async function fetchData() {

        try {
            const response = await axios.request(options);
            if(!response)
                throw new Error('response not present')

            // console.log('response', response.data)
            return response.data
        } catch (error) {
            // console.error (error.message);
            return error.message
        }
    }

    return await fetchData();

}



const waiting = async (time)=>{

    setTimeout(()=>{
        return "Samir"
    }, time)
}


const submitToken = async (resultToken)=>{

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_PASS,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            if(!response)
                throw new Error('response not found')
            // console.log(response)

            return response.data
        } catch (error) {

            // console.error(error.message);
            return error.message

        }
    }

    while(true){
        const result = await fetchData();

        const isResultObtained = result.submissions.every((result)=>result.status_id > 2);
        if(isResultObtained)
            return result.submissions

        await waiting(1000)

    }

}


module.exports = {submitBatch, submitToken}