import express from 'express';
import jwt from 'jsonwebtoken';

const app=express();
app.use(express.json());
const secret_key="nothing";
const users=[];

app.post("/signup",(req,res)=>{

  const username=req.body.username;
  const password=req.body.password;

  users.push({
    username:username,
    password:password
  });

  res.json({
    message:"you are singup"
  })

})


app.post("/signin",(req,res)=>{

  const username=req.body.username;
  const password=req.body.password;

  const user=users.find(u=>u.username===username && u.password===password)

  if(!user){
    res.json({
      message:"you are not login"
    })
  }else{ 
    const token=jwt.sign({username},secret_key);
    //const token=jwt.sign(username,secret_key); don't do this. here you use the string. you must use the object
    
    res.json({
      token:token
    })
  }

})

function auth(req,res,next){
  const token=req.headers.token;
  const decode=jwt.verify(token,secret_key);

  if(decode.username){
    req.username=decode.username;
    next();
  }
  else{
    res.json({
      message:"you aren't login"
    })
  }

}

app.get("/me",auth,(req,res)=>{
  
  if(req.username){
    const user=users.find(u=>u.username===req.username);

    res.json({
      username:user.username,
      password:user.password
    })
  }
  
})

app.get("/",(req,res)=>{
  res.sendFile("V:\\april\\weak6\\jwt\\public\\index.html");
})



app.listen(3000);
