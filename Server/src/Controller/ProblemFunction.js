const Problem = require('../Models/problem')
const Submission = require('../Models/submission')
const User = require('../Models/user')
const getLanguageById = require('../Utils/problemId')
const {submitBatch, submitToken} = require('../Utils/problemSubmission')
const SolutionVideo = require('../Models/solutionvideo')





const createProblem = async (req, res)=>{

    // console.log(req.body)

    const {title, description, difficulty, tags,
        visibleTestCases, hiddenTestCases, startCode, 
        referenceSolution, problemCreator
    } = req.body

    // console.log(req.body.startCode)
    try {

        for(const {language, completeCode} of referenceSolution){

            const languageId = getLanguageById(language)
            // console.log(languageId)

            const submission = visibleTestCases.map((testCases)=>(
                {
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testCases.input,
                    expected_output: testCases.output
                }
            ))

            // console.log(submission)

            //First we submit the Batch - value
            const submitResult = await submitBatch(submission)
            // console.log('submitResult', submitResult)
            if(!submitResult)
                return res.status(400).send('submitResult not present')

            //We got Token after Submitting the Batch - Token
            const resultToken = submitResult.map(value=>value.token)
            if(!resultToken)
                return res.status(400).send('resultToken not present')

            //Again we submit the Token for get the status_id
            const testResult = await submitToken(resultToken)
            if(!testResult)
                return res.status(400).send('testResult not present')

            // console.log(testResult)
            for(const test of testResult){

                if(test.status.id != 3){
                    // console.log('test ',test)

                    // console.log('status', test.status.id)
                    // console.log('description', test.status.description)

                    return res.status(400).json({
                        status_id: test?.status?.id,
                        description: test?.status?.description
                    });
                }
            }
        }
        // console.log('hello')

        //Now, we will store this data into DB
        const problem = await Problem.create({
            ...req.body,
            problemCreator: req.user?._id
        })

        // console.log(problem)

        res.status(200).send('Problem saved successfully')

    } catch (error) {
        res.status(500).send(error.message)
    }

}



const updateProblem = async (req, res)=>{

    // console.log('updateProblem')

    const {id} = req.params;
    // console.log(id)

    const {title, description, difficulty, tags,
        visibleTestCases, hiddenTestCases, startCode, 
        referenceSolution, problemCreator
    } = req.body

    // console.log(req.body)


    try {

        if(!id)
            res.status(400).send('Missing ID feild')
        
        const DSAproblem = await Problem.findById(id)
        if(!DSAproblem)
            res.status(404).send('ID is not present in server')

        for(const {language, completeCode} of referenceSolution){

            const languageId = getLanguageById(language)

            const submission = visibleTestCases.map((testCases)=>(
                {
                    source_code:completeCode,
                    language_id: languageId,
                    stdin: testCases.input,
                    expected_output: testCases.output
                }
            ))

            const submitResult = await submitBatch(submission)
            if(!submitResult)
                return res.status(400).send('submitResult not present')
            // console.log(submitResult)

            const resultToken = submitResult.map(value=>value.token)
            if(!resultToken)
                return res.status(400).send('resultToken not present')
            // console.log(resultToken)

            const testResult = await submitToken(resultToken)
            if(!testResult)
                return res.status(400).send('testResult not present')
            // console.log(testResult)

            for(const test of testResult){
                if(test.status_id != 3){
                    return res.status(400).send('Error Occured: status_id - '+test.status_id);
                }
            }
        }

        const newProblem = await Problem.findByIdAndUpdate(id, {...req.body}, {runValidators: true, new:true})
        if(!newProblem)
            return res.status(404).send('Problem not found')

        res.status(200).send(newProblem)

    } catch (error) {
        res.status(500).send('Error: '+error)
    }
}




const deleteProblem = async (req, res)=>{
    
    const {id} = req.params;

    try{
        if(!id)
            res.status(404).send('Missing ID field')

        const deleteProblem = await Problem.findByIdAndDelete(id)
        // console.log(deleteProblem)

        if(!deleteProblem)
            return res.status(404).send('Problem id Missing')

        res.status(200).send('Problem deleted successfully')
    }
    catch(err){
        res.status(500).send('Error occured: '+err)
    }
}




const getProblemById = async (req, res)=>{

    // console.log('getProblemById')

    const {id} = req.params

    try{
        if(!id)
        return res.status(400).send('Missing ID')


        // const getProblem =  await Problem.findById(id)
        const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution')
        if(!getProblem)
            return res.status(400).send('Problem is Missing')
        // console.log(getProblem)
        

        const videos = await SolutionVideo.findOne({problemId:id})
        if(videos){   
    
            const responseData = {
                ...getProblem.toObject(),
                secureUrl: videos.secureUrl,
                thumbnailUrl : videos.thumbnailUrl,
                duration : videos.duration,
            }

            return res.status(200).send(responseData); 
        
        }

        res.status(200).send(getProblem)

    }
    catch(error){
        res.status(500).json('Internal Error: '+error)
    }
}




const getAllProblem = async (req, res)=>{

    try {

        // const getProblem = await Problem.find({})
        const getProblem = await Problem.find({}).select('_id title difficulty tags')
        if(getProblem.length == 0)
            return res.status(404).send('Problem is missing')

        res.status(200).send(getProblem)

    } catch (error) {
        res.status(500).send(error.message)
    }
}




const solvedProblemByUser = async (req, res)=>{

    try {
        
        // const count = req.user.problemSolved.length
        // res.status(200).send(count)]

        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: 'problemSolved',
            select: '_id title difficulty tags'
        })

        res.status(201).send(user.problemSolved)

    } catch (error) {
        
        res.status(500).send(error.message)
    }
}




const submittedProblem = async (req, res)=>{

    try {

        const userId = req.user._id
        const problemId = req.params.pid

        const ans = await Submission.find({userId, problemId})

        if(ans.length == 0)
            return res.status(200).send(null)

        res.status(200).send(ans)
    } catch (error) {
        res.status(500).send(error.message)
    }
}





module.exports = {createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedProblemByUser, submittedProblem}
