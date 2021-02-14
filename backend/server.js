const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongodata = require('./dbModel');
const userData = require('./userdataModel');


//app config
const app = express();
const PORT = 4000;

//middlewares
app.use(cors());
app.use(bodyparser.json());

//db config
const mongoose = require('mongoose');
const localurl = 'mongodb://127.0.0.1:27017'
const mongoUrl = 'mongodb+srv://rohith_yelagam:Aa1%40bcde@cluster0.qqlvf.mongodb.net/amigoport?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

//api routes

//add new club in db
app.post('/new/club', (req, res) => {
    let DBdata = req.body;
    mongodata.findOne({clubName:DBdata.clubName},(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(!data){
                console.log('channel is not present');
                mongodata.create(DBdata, (err, data) => {
                    if (err) {
                        res.status(500).send(err);
                    } 
                })
            }else{
                console.log('channel is alredy present');
            }
            res.status(201).send(data);
        }
    })
})


//add message of one user
app.post('/new/message', (req, res) => {
    let msg = req.body;
   // console.log(req.body);
    userData.updateMany({
        'clubs.club_name':msg.clubName,
    },{
            $push:{
                   "clubs.$[].messages":{
                        from_uid: msg.from_uid,
                        timestamp: msg.timestamp,
                        msg: msg.msg,
                        photo: msg.photo
                      }
                }
    },(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })

    
})

//add new user in db
app.post('/new/user', (req, res) => {
    let userd=req.body;
  // console.log(userd);
    userData.findOne({user_id : userd.user_id},(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(!data){
                console.log("user needs to be added");
                userData.create(userd, (err,data) => {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.status(201).send(data);
                    }
                })
               
            }else{
                console.log("user already exists");
              //  console.log(data);
                res.status(201).send(data);
            }
            
        }
    })
    
})

//add club in user db
app.post('/new/user/club',(req,res)=>{
                let nn = req.body;
                userData.find({
                    'user_id':nn.user_uid,
                   'clubs.club_name' : nn.club_name
                },(err,data)=>{
                    if (err) {
                        res.status(500).send(err);
                    }else{
                        if(data[0]!=undefined){
                            console.log("club is already present");
                            res.status(201).send(data);
                        }else{
                      userData.updateOne({user_id : nn.user_uid},
                        {$push:{clubs:[{club_name:nn.club_name}]}},
                         (err,data)=>{
                       if(err){
                              res.status(500).send(err);
                            }else{
                            mongodata.updateOne({clubName:nn.club_name},{
                                $push:{users:[{
                                    user_id: nn.user_uid,
                                    user_name: nn.user_name
                                }]}
                            },(err,data)=>{
                                if(err){
                                    res.status(500).send(err);
                                }else{
                                    res.status(201).send(data);
                                }
                            })
                            
                           }
                           }
                          )
                        }
                    }
                })
})

//get all clubslist
app.get('/get/clubsList', (req, res) => {
    mongodata.find((err, data) => {
        if (err){
            res.status(500).send(err);
        } else {
            console.log("accesed all clubs in the DB")
           // console.log(data);
            res.status(200).send(data);
        }
    })
})

//get user clublist
app.post('/get/user/clubsList', (req, res) => {
    let user_uid=req.body.uid;
    userData.find({user_id : user_uid},(err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {

            let clubs = [];
            //console.log(data.clubs);
            data.map((clubdata) => {
           // console.log(clubdata.clubs)
            clubdata.clubs.map((obj)=>{
                // console.log(obj.club_name);
                 clubs.push({clubname:obj.club_name,clubid:obj._id})
             })
            })
           // console.log(clubs);
            res.status(201).send(clubs);
        }
    })
})


//get single club
app.post('/get/present/club',(req,res)=>{
    let clubname = req.body.club_name;
    let userid = req.body.user_id;
    userData.find({
        'clubs.club_name': clubname 
    },(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
           if(data[0] != undefined){
               let msg =[];
               msg.push({"club_name":clubname});
            console.log(" data found");
            data.map((user)=>{
                user.clubs.map((club)=>{
                    //console.log(club.club_name)
                    if(club.club_name == clubname && user.user_id==userid){
                        msg.push(club.messages)
                    }
                })
            })
          // console.log(msg[1])
            res.status(201).send(msg);
           }else{
            console.log("no data found");
            res.status(201).send(data);
           }
        }
    })
})

//get all conversations of one user
app.get('/get/conversations', (req, res) => {
    mongodata.find({ _id: req.query.id }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//delete one club
app.post('/delete/club', (req, res) => {
    let club_query = req.query.cid;
    let req_send_id = req.query.uid;
    mongodata.find({ _id: club_query }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (data[0].admin_id == req_send_id) {
                // console.log(club_query);
                mongodata.deleteOne({ _id: club_query }, (err, res) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        console.log("deleted");
                        res.status(201).send(data);
                    }
                });
            } else {
                console.log("You are not a admin");
            }
            res.status(201).send(data);
        }
    })
})

 
//get userslist
app.get('/get/userlist', (req, res) => {
    userData.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})




//listerners
app.listen(PORT, function () {
    console.log("server is running at " + PORT);
});


