var express = require('express');
var user = require('./routes/user.js');
var payment = require('./routes/payment.js');
var posts = require('./routes/postings.js');
var admin = require('./routes/admin.js');
var dash = require('./routes/dashboard.js');
var friend = require('./routes/friend.js');
var mongoose = require('mongoose');

var app = express();
var db = require('./config/db.js');

mongoose.connect(db.url);
app.get('/', function(req,res){
  res.send("Cowabungaa");
});

//User Routes
app.get('/api/login',user.login);
app.post('/api/register',user.register);
app.get('/api/profile',user.profile);
app.post('/api/profile',user.updateProfile);
app.get('/api/update-password',user.updatePassword);
app.get('/api/get-public-users',user.getPublicUsers);
app.get('/api/get-settings',user.getSettings);
app.get('/api/update-settigs',user.updateSettings);
app.post('/api/forgot-password',user.forgotPassword);
app.get('/api/isLoggedIn',user.isLoggedIn);
app.get('/api/get-current-user',user.getCurrentUser);

//Payment Routes
app.get("/api/payment/list-received",payment.listReceived);
app.get("/api/payment/list-sent",payment.listSent);
app.post("/api/payment/balance",payment.balance);
app.post("/api/payment/make-payment",payment.makePayment);



//Friend Routes
app.post("/api/friend/delete-friend",friend.deleteFriend);
app.get("/api/friend/get-friend",friend.getFriend);
app.get("/api/friend/list-received-friend-requests",friend.listReceivedFriendRequests);
app.get("/api/friend/send-friend-request",friend.acceptFriendRequest);
app.get("/api/friend/delete-friend-request",friend.deleteFriendRequest);

//Post Routes

app.get("/api/posts/get-owner",posts.listOwner);
app.get("/api/posts/list-member",posts.listMember);
app.post("api/posts/add",posts.add);
app.get("/api/posts/delete",posts.deletePost);
app.get("/api/posts/update",posts.update);


//Dashboard Routes

app.get("/api/dashboard",dash.getDash);

//Admin Routes



 
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});



