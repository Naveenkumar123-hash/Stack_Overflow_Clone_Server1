import UserSchema from "../Models/AuthSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{
   const {name,email,password}=req.body;
   try{
       const existinguser=await UserSchema.findOne({email})
       if(existinguser){
        return res.send({
            status:400,
            result:"Users Already Exists"
        })
       }
       else{
        const hashedpassword= await bcrypt.hash(password,12)
        const newUser=new UserSchema({
            name,
            email,
            password:hashedpassword
        })
        const token=jwt.sign({email:newUser.email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
        UserSchema.create(newUser)
        res.status(201).send({
            status:201,
            message:"User Signed In Successfully",
            newUser,
            token
        })
       }
   }
   catch(error){
     return res.status(500).send("Something Went Wrong")
   }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existinguser=await UserSchema.findOne({email})
        if(!existinguser){
         return res.send({
             status:400,
             result:"User Not Exists"
         })
        }
         const checkpassword= await bcrypt.compare(password,existinguser.password)
         if(!checkpassword){
            return res.send({
                status:400,
                message:"Invalid user credentials"
            })
         }
         const token=jwt.sign({email:existinguser.email,id:existinguser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
         res.status(201).send({
             status:201,
             message:"User Logged In Successfully",
             token,
             result:existinguser
         })
    }
    catch(error){
      return res.status(500).send(
        {message:"Something Went Wrong"})
    }
}

export const getAllUsers = async (req, res) => {
    try {
      const allUsers = await UserSchema.find();
      const allUserDetails = [];
      allUsers.forEach((user) => {
        allUserDetails.push({
          _id: user._id,
          name: user.name,
          about: user.about,
          tags: user.tags,
          joinedOn: user.joinedon,
        });
      });
      res.status(200).send(allUserDetails);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  
export const updateProfile=async(req,res)=>{
  const {id:_id}=req.params;
  const {name,about,tags}=req.body;
  try{
  const updatedProfile=await UserSchema.findByIdAndUpdate(_id,{$set:{name:name,about:about,tags:tags}},{new:true})
  res.send(updatedProfile)
  }
  catch(error){
    res.send(error.message)
  }
}


