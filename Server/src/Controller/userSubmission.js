const Problem = require('../Models/problem')
const Submission = require('../Models/submission')
const getLanguageById = require('../Utils/problemId')
const {submitBatch, submitToken} = require('../Utils/problemSubmission')



const runCode = async (req, res)=>{

    try {

        const userId = req.user._id
        const problemId = req.params.id
        let {code, language} = req.body


        // console.log('code: ', code)
        // console.log('language: ', language)
        // console.log('userID: ', userId)
        // console.log('problemId: ', problemId)


        if(!userId || !problemId || !code || !language){

            return res.status(400).json('Undefined value')

        }

        const problem = await Problem.findById(problemId)
        // console.log('Problem', problem)

        if(language==='cpp') language='c++'

        const languageId = getLanguageById(language)
        // console.log('languageId' ,languageId)

        const submission = problem.visibleTestCases.map((testCases)=>(
            {
                source_code: code,
                language_id: languageId,
                stdin: testCases.input,
                expected_output: testCases.output
            }
        ))

        // if(submission) console.log('submission')

        const submitResult = await submitBatch(submission)
        // if(submitResult) console.log('submitResult')
            // console.log('Token ',submitResult)

        const resultToken = submitResult.map(value=>value.token)
        // if(resultToken) console.log('resultToken', resultToken)

        const testResult = await submitToken(resultToken)
        if(!testResult)
            throw new Error('testResult not present')

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = true;
        let errorMessage = null;

        for(const test of testResult){
            if(test.status_id == 3){
                testCasesPassed++;
                runtime = runtime+parseFloat(test.time)
                memory = Math.max(memory,test.memory);
            }else{
                if(test.status_id == 4){
                    status = false
                    errorMessage = test.stderr
                }
                else{
                    status = false
                    errorMessage = test.stderr
                }
            }
        }
    
        res.status(201).json({
            success:status,
            testCases: testResult,
            runtime,
            memory
        });

    } catch (error) {
        res.status(500).send('Internal server errror: '+error)
    }
}



const submitCode = async (req, res)=>{

    try {

        const userId = req.user._id
        const problemId = req.params.id
        
        let {code, language} = req.body

        if(!userId || !problemId || !code || !language){
            return res.status(400).send('Missing some feilds')
        }

        if(language === 'cpp') language = 'c++'

        const problem = await Problem.findById(problemId)

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'pending',
            testCasesTotal: problem.hiddenTestCases.length
        })

        const languageId = getLanguageById(language)

        const submission = problem.hiddenTestCases.map((testCases)=>(
            {
                source_code: code,
                language_id: languageId,
                stdin: testCases.input,
                expected_output: testCases.output
            }
        ))

        // console.log('Before submit Result')
        const submitResult = await submitBatch(submission)
        // console.log('Submit result: ', submitResult)

            if(!submitResult)
                throw new Error('submitResult not present')

        const resultToken = submitResult.map(value=>value.token)
        if(!resultToken)
            throw new Error('resultToken not present')

        const testResult = await submitToken(resultToken)
        if(!testResult)
            throw new Error('testResult not present')

        //Now, we will update submit Result
        let testCasesPassed = 0
        let runtime = 0
        let memory = 0
        let status = 'accepted'
        let errorMessage = null


        for(const test of testResult){
            if(test.status_id == 3){
                testCasesPassed++;
                runtime = runtime + parseFloat(test.time)
                memory = Math.max(memory, test.memory)  
            }
            else{
                if(test.status_id == 4){
                    status = 'error'
                    errorMessage = test.stderr
                }
                else{
                    status = 'wrong'
                    errorMessage = test.stderr
                }

            }

        }

        //Store in DB
        submittedResult.status = status
        submittedResult.testCasesPassed = testCasesPassed
        submittedResult.errorMessage = errorMessage
        submittedResult.runtime = runtime
        submittedResult.memory = memory

        await submittedResult.save()

        
        if(!req.user.problemSolved.includes(problemId)){
            req.user.problemSolved.push(problemId)
            await req.user.save()
        }

        const accepted = (status == 'accepted')
        res.status(201).json({
            accepted,
            totalTestCases: submittedResult.testCasesTotal,
            passedTestCases: testCasesPassed,
            runtime,
            memory
        });


    } catch (error) {
        res.status(500).send('Internal server errror: '+error)
    }

}



module.exports = {runCode, submitCode}