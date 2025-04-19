const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const googleAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = googleAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
const express=require('express')
const app=express()
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const db=require("./config/mongoose-connection")
const userModel=require("./models/user-model.js")
const memberModel=require("./models/member-model.js")
const hospitalModel=require("./models/hospital-model.js")
const vacModel=require("./models/vaccine_collection-model.js")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
const session = require('express-session');

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));


app.get("/",(req,res)=>{
    res.render("animate")
})


app.get("/register",(req,res)=>{
    res.render("register_user")
})

app.get("/add_member",async(req,res)=>{
    res.render("add_member")
})

app.get("/login",async(req,res)=>{
    res.render("login")
})
app.get("/add_hospital",(req,res)=>{
    res.render("add_hospital")
})
app.get("/developer",(req,res)=>{
    res.render("developer")
})
app.post("/register_user",async(req,res)=>{
    let{email,phone,password,confirm_password}=req.body
    bcrypt.genSalt(10,(err,Salt)=>{
        bcrypt.hash(password,Salt,async(err,hash)=>{
            let new_user=await userModel.create({
                        email,
                        phone,
                        password:hash,
                        confirm_password:hash
                    })
            let token=jwt.sign({email},"store")
            res.cookie("token",token)
            res.redirect("/add_member")
        })
    })
})
function isLogged(req,res,next){
    if(req.cookies.token === ""){
        res.status(400).send("You need to login")
    }
    else{
        
        let data=jwt.verify(req.cookies.token,"pause")
        req.user = data
        next();
    }
}


app.post("/added_members", async (req, res) => {
    let { name, age, gender, building, street, city, state, pincode, vaccines } = req.body;
    if (!vaccines) vaccines = [];
    else if (!Array.isArray(vaccines)) vaccines = [vaccines];

    if (!req.session.userId) return res.send("Unauthorized");

    await memberModel.create({
        name,
        age,
        gender,
        building,
        street,
        city,
        state,
        pincode,
        vaccines_taken: vaccines,
        user: req.session.userId //link member to logged-in user
    });

    res.redirect("/add_member");
});

app.post("/login_user", async (req, res) => {
    const check_user = await userModel.findOne({ email: req.body.email });
    bcrypt.compare(req.body.password, check_user.password, (err, result) => {
        if (err) {
            return res.status(500).send("Error during password check");
        }
        if (result) {
            req.session.userId = check_user._id;
            return res.redirect("/interface");
        } else {
            return res.send("Incorrect password");
        }
    });
    
});


app.get("/logout",async(req,res)=>{
    res.cookie("token","")
    res.redirect("/login")
})

app.get("/interface",isLogged, async (req, res) => {
    //if (!req.session.userId) return res.redirect("/login");
    const extract_member = await memberModel.find({ user: req.session.userId });
    const allHospitals = await hospitalModel.find();
    const paidHospitals = allHospitals.filter(h => h.hos_category === "Paid");
    const freeHospitals = allHospitals.filter(h => h.hos_category === "Free");
    const vaccines = await vacModel.find();
    const recommendedMap = extract_member.map(member => {
        const filtered = vaccines.filter(v => member.age >= v.minAge && member.age <= v.maxAge);
        return filtered.map(v => v.name);
    });

    res.render("interface", {
        extract_member,
        paidHospitals,
        freeHospitals,
        recommendedMap
    });
});
//hospitals-site-to-add-their-respective-hospital
app.post("/added_hospital",async(req,res)=>{
    let {hos_name,hos_email,hos_phone,hos_category,hos_vaccines,address_1,street,city,state,pincode}=req.body;``
    if (!hos_vaccines) {
        hos_vaccines = [];
      } else if (!Array.isArray(hos_vaccines)) {
        hos_vaccines = [hos_vaccines];
      }
      
    let hospitals=await hospitalModel.create({
        hos_name,
        hos_email,
        hos_phone,
        hos_category,
        Vaccine_available : hos_vaccines,
        address_1,
        street,
        city,
        state,
        pincode
    })
    res.send(hospitals)
})
//developers-site-to-add-vaccine
app.post("/add_vaccines", async (req, res) => {
    try {
        let { vaccines } = req.body; 
        if (!Array.isArray(vaccines)) return res.status(400).send("Invalid format");

        await vacModel.insertMany(vaccines);
        res.status(201).send("Vaccines added");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add vaccines");
    }
});

//gemini
app.post("/gemini_health_query", async (req, res) => {

    function isValidHealthcareQuery(input) {
        const keywords = [
            "vaccine", "vaccination", "immunization", "dose", "hospital",
            "side effects", "healthcare", "medicine", "disease", "covid",
            "booster", "appointment", "doctor", "clinic", "injection"
        ];

        const lowerInput = input.toLowerCase();
        return keywords.some(keyword => lowerInput.includes(keyword));
    }

    const userInput = req.body.prompt;

    if (!userInput || typeof userInput !== "string") {
        return res.status(400).json({ error: "Invalid or missing prompt." });
    }

    if (!isValidHealthcareQuery(userInput)) {
        return res.status(400).json({
            error: "This assistant only handles healthcare and vaccine-related queries."
        });
    }

    try {
        const result = await model.generateContent(userInput);
        const response = result.response.text();
        res.json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generating response from Gemini." });
    }
});


app.listen(3000)

