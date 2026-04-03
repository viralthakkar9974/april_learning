import express from 'express';
import  jwt  from 'jsonwebtoken';

const app=express();
app.use(express.json());

const users=[];


app.post("/signin",(req,res)=>{

  const name=req.body.username;
  const password=req.body.password;
  
  const user=users.find(u=>u.username===name);

  if(user){
      const token=genToken();
      user.token = token;
      res.json({
        message:token
      })
    }
    else{
      res.json({
        message:"you are not signup"
      })
    }
  
  console.log(users);
  
  
});

app.post("/signup",(req,res)=>{
  const name=req.body.username;
  const password=req.body.password;
  
  if(users.find(u=>u.username===name)){
    res.json({
      message:"you already signup"
    })
  }
  

  users.push({
    username:name,
    password:password
  })

  res.json({
    message:"you are signup"
  })

  console.log(users);
  
});

app.get("/me",(req,res) =>{
  const token=req.headers.token;
  const user=users.find(u=>u.token==token)

  if(user){
    res.send({
      username:user.username,
      password:user.password
    })
  }
  else{
    res.send({
      message:"nothing bro "
    })
  }


})

app.listen(3000),()=>{
  console.log("listen in 3000");
}
