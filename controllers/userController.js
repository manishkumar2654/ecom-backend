const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSignup=async(req, res)=>{
    const { name,  city,  address, email,  pincode,  password }= req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const User = await UserModel.create({


        name:name,
    city:city,
    address:address,
    pincode:pincode,
    email:email,
    password:hashedPassword


    })
    res.status(200).send({msg:"User sucesfull registrartionn"});
}

const userLogin=async(req, res) =>{

    const user = await UserModel.findOne({email: req.body.email});

    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
        if(match){
            
            res.json({ accessToken: accessToken});
        }
        else{
            res.json({message: "invali credential"});
        }
        
        
    } catch (e) {
        console.log(e);
        
    }
    alert("login sesuceshul");

 res.send(userLogin);
}

const userAuth=async(req, res)=>{
    const token = req.header("x-auth-token");
   if (!token) return res.json(false);
   const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) return res.json(false);
      const user = await UserModel.findById(verified._id);

      if (!user) return res.json(false);
      return res.json(user)

    
    res.send("okya");
    
}

const getUser =async(req, res)=>{
    
    const User= await UserModel.findById(req.query.userid);  
    console.log(User);
    
    
    res.send(User)
    
}

module.exports={
    userSignup,
    userLogin,
    userAuth,
    getUser
}   