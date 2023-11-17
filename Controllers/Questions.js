import mongoose from "mongoose";
import QuestionSchema from "../Models/QuestionSchema.js"

const Questions=async(req,res)=>{
    const questionsBody=req.body;
    try{
    const question=new QuestionSchema(questionsBody)
    await question.save()
    res.status(200).send({
        message:"question posted successfully"
    })
    }
    catch(error){
        console.log(error);
        res.status(409).send({
            message:"couldn't post a question"
        })
    }
}

export const getAllquestions=async(req,res)=>{
    try{
        const questionList =await QuestionSchema.find()
        res.status(200).send(questionList)
    }
    catch(error){
        console.log(error)
        res.send({
            error:error
        })
    }
} 

export const PostAnswers=async(req,res)=>{
    const {id:_id}=req.params;
    const {noOfAnswers,answerBody,userAnswered,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
       return res.send("Question unavailable")
    }
    updateNoofanswer(_id,noOfAnswers)
    try{
    const updatedquestion=await QuestionSchema.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
    res.send(updatedquestion)
    }
    catch(error){
         res.status(404).send(error)
    }
}

const updateNoofanswer=async(_id,noOfAnswers)=>{
    try{
    await QuestionSchema.findByIdAndUpdate(_id,{$set:{"noOfAnswers":noOfAnswers}})
    }
    catch(error){
        console.log(error)
    }
} 

export const deleteQuestion=async(req,res)=>{
   const {id:_id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.send("Question unavailable")
   }
   try{
    await QuestionSchema.findByIdAndRemove(_id)
    res.send("Question Removed")
   }
   catch(error){
    res.send(error.message)
   }
}

export const DeleteAnswers=async(req,res)=>{
    const {id:_id}=req.params;
    const {answerId,noOfAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.send("Question unavailable")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.send("Answer unavailable")
    }
    updateNoofanswer(_id,noOfAnswers)
    try{
    await QuestionSchema.updateOne(
        {_id},
        {$pull:{"answer":{_id:answerId}}}
    )
    res.send("answer deleted")
    }
    catch(error){
        res.send(error.message)
    }
}

export const voteQuestion=async(req,res)=>{
    const {id:_id}=req.params;
    const {value,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.send("Question unavailable")
    }
    try{
    const question=await QuestionSchema.findById(_id)
    const upIndex=question.upVote.findIndex((id)=>id===String(userId))
    const downIndex=question.downVote.findIndex((id)=>id===String(userId))
    if(value==="upVote"){
        if(downIndex !==-1){
            question.downVote=question.downVote.filter((id)=>id !==userId)
        }
        if(upIndex===-1){
            question.upVote.push(userId)
        }
        else{
            question.upVote=question.upVote.filter((id)=>id!==userId)
        }
    }
    else if(value==="downVote"){
        if(upIndex !==-1){
            question.upVote=question.upVote.filter((id)=>id !==userId)
        }
        if(downIndex===-1){
            question.downVote.push(userId)
        }
        else{
            question.downVote=question.downVote.filter((id)=>id!==userId)
        }
    }
    await QuestionSchema.findByIdAndUpdate(_id,question)
    res.send("vote updated")
    }
    catch(error){
        res.send(error.message)
    }
}
 
export default Questions