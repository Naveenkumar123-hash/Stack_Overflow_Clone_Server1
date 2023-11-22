import mongoose from "mongoose";
const Schema=mongoose.Schema;

const QuestionSchema=new Schema({
    questionTitle:{type:String,required:"Question must have a title"},
    questionBody:{type:String,required:"Question must have a body" },
    questionTags:{type:[String],required:"Question must have a tags"},
    noOfAnswers:{type:Number,default:0},
    upVote:{
        type:[String],default:[]
    },
    downVote:{
        type:[String],default:[]
    },
    userPosted:{
        type:String,required:"Question must have an author"
    },
    askedOn:{
        type:Date,default:Date.now
    },
    userId:{
        type:String,
    },
    answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answeredOn:{type:Date,default:Date.now}
    }]
})

export default mongoose.model("Question",QuestionSchema)