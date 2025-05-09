import 'dotenv/config'
import { app } from "./app.js";
import { connectDB } from "./db/connectDB.js";

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("app is listen on ", process.env.PORT)
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})  
