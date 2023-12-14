const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }
    // PUT method for updating user data
app.put("/update/:id", async (req, res) => {
    const userId = req.params.id;
    const { newPassword } = req.body;
  
    try {
      // Find the user by ID and update the password
      await collection.updateOne({ _id: userId }, { $set: { password: newPassword } });
  
      res.json("success");
    } catch (e) {
      res.json("fail");
    }
  });
  
  // DELETE method for deleting user account
  app.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find the user by ID and delete the account
      await collection.deleteOne({ _id: userId });
  
      res.json("success");
    } catch (e) {
      res.json("fail");
    }
  });

})

app.listen(8000,()=>{
    console.log("port connected");
})


