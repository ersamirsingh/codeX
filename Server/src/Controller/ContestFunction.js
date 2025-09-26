const Contest = require('../Models/Contest')



const createContest = async (req, res) => {


   try {

      const { title, description, startTime, endTime, problems, visibility } = req.body;

      const duration = Math.floor((new Date(endTime) - new Date(startTime)) / 60000);

      const contest = await Contest.create({

         title,
         description,
         startTime,
         endTime,
         duration,
         problems,
         visibility,
         createdBy: req.user._id // assuming authenticate middleware

      });

      res.status(201).json({ 
         message: "Contest created successfully", 
         contest 
      });

   } catch (err){

      res.status(500).json({ 
         message: "Error creating contest", 
         error: err.message 
      });
   }

};




// ✅ Get all contests
const getAllContests = async (req, res) => {

   try {

      // console.log('first')

      const contests = await Contest.find({}).select("problems title description startTime endTime duration problems participants");
      res.status(200).json(contests);

   } catch (err) {

      // console.log(err.message)
      res.status(500).json({ 
         message: "Error fetching contests", 
         error: err.message ,
         
      });
   }
};





const registerForContest = async (req, res) => {


   try {

      const contest = await Contest.findById(req.params.id);
      if (!contest) return res.status(404).json({ message: "Contest not found" });

      const alreadyRegistered = contest.participants.some((p) => {
         p.user.toString() === req.user._id.toString()
      });

      if (alreadyRegistered) {
         return res.status(400).json({ message: "Already registered" });
      }

      contest.participants.push({ 
         user: req.user._id, 
         score: 0
      });

      
      await contest.save();

      res.status(200).json({ 
         message: "Registered successfully", 
         contest 
      });

   } catch (err) {
      res.status(500).json({ 
         message: "Error registering", error: err.message 
      });
   }
};




const updateContest = async (req, res) => {

   try {

      const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true});

      if (!contest) return res.status(404).json({ 
         message: "Contest not found" 
      });

      res.status(200).json({ 
         message: "Contest updated", 
         contest 
      });

   } catch (err) {
      res.status(500).json({ message: "Error updating contest", error: err.message });
   }
};




const deleteContest = async (req, res) => {

   try {

      const contest = await Contest.findByIdAndDelete(req.params.id);

      if (!contest) return res.status(404).json({ message: "Contest not found" });

      res.status(200).json({ message: "Contest deleted successfully" });

   } catch (err) {
      res.status(500).json({ message: "Error deleting contest", error: err.message });
   }
};




module.exports = {createContest, getAllContests, registerForContest, updateContest, deleteContest}