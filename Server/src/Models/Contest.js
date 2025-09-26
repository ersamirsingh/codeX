const mongoose = require("mongoose");
const {Schema} = mongoose




const contestSchema = new mongoose.Schema({


   title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
   },

   description: {
      type: String,
      trim: true,
   },

   startTime: {
      type: Date,
      required: true,
   },

   endTime: {
      type: Date,
      required: true,
   },

   duration: {
      type: Number, // in minutes
      required: true,
   },

   problems: [
      {
        type: Schema.Types.ObjectId,
        ref: "problem", // reference to Problem schema
      },
   ],

   participants: [
      {
         user: { 
            type: Schema.Types.ObjectId, 
            ref: "user" 
         },
         score: { 
            type: Number, 
            default: 0 
         },
         rank: {
            type: Number 
         },
         submissions: [
            {
               problem: { 
                  type: Schema.Types.ObjectId, 
                  ref: "problem" 
               },
               submissionId: { 
                  type: Schema.Types.ObjectId, 
                  ref: "submission" 
               },
            },
         ]
      }
   ],

   createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", // admin or organizer
      required: true,
   }

},{ timestamps: true });




// contestSchema.pre("save", function (next) {
//    if (this.startTime && this.endTime) {
//       const diff = (this.endTime - this.startTime) / (1000 * 60); // minutes
//       this.duration = diff;
//    }
//   next();
// });

contestSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    this.duration = (this.endTime - this.startTime) / (1000 * 60); // in minutes
  }
  next();
});

contestSchema.virtual("remainingTime").get(function () {
  return Math.max(0, this.endTime - Date.now());
});



const Contest = mongoose.model("contest", contestSchema);
module.exports = Contest