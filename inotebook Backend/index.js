

// const connectToMongo =  require('./db');                          //First code 
// const express = require('express')

// connectToMongo();
// const app = express()
// const port = 3000
// app.use(express.json())

// // Available Routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })




const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const port = 200;
app.use(express.json())

const middleware = (req, res, next) =>{
  console.log('middleware function called');
  next();
}


app.get('/', (req, res)=>{

  res.send('Request From main page');

});

app.get('/contact', middleware, (req, res)=>{

  res.send('Request From Contact page');

});

app.get('/about', (req, res)=>{

  res.send('Request From About page');

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})



//CONNECTING TO MONGO DB CLOUD................................

// const DB = "string";
// mongoose.connect(DB).then(()=> {
//   console.log('Mongoose Connected');
// }).catch((err)=>{
//   console.log('Connnection Failed');
// });



Router.post('/', async(req, res) =>{

  const(name,password,email) = req.body;
  if(!name || !email || !password){
    return res.json({error:'please fill all'});
  }

  try {
    const userExists = await User.findOne({email:email})

    if(userExists){
      return res.json({error: "please use different email"});
    }
    else{
      const user = new User({name,password,email});
      await user.save();
      res.json({message: "USer Registered"})
    }
  } 
  
  catch (error) {
    console.log(error);
  }


})