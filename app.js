const express=require('express');
const app=express();

require('dotenv').config();

const userroutes=require('./routes/user');
const expenseroutes=require('./routes/expense');
const purchaseroutes=require('./routes/purchase');
const premiumroutes=require('./routes/leaderboard');
const passwordroutes=require('./routes/forgetpassword');

const path=require('path')

const cors=require('cors');
const mongoose = require('mongoose');

app.use(cors({
    origin:'*',
    methods:['GET','PUT','POST']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

app.get('/expense', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'expense.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(userroutes);
app.use(expenseroutes);
app.use(purchaseroutes);
app.use(premiumroutes);
app.use(passwordroutes);

async function database() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(process.env.PORT);
        console.log('connected!');
    }catch(err){
        console.log("Error in connecting!",err)
    }
}
database();


