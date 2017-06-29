var http = require('http');
var fs = require('fs');

 
const PORT=8080; 
 
function handleRequest(request, response){
    var body = [];
    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        try {
            var jsonObj = JSON.parse(body);
            console.log(jsonObj.subject);
            console.log(jsonObj.text);
            console.log(jsonObj.from);
            console.log(jsonObj.to);
        } catch (e) {
            console.error(e);
        }
 
        response.on('error', function(err) {
            console.error(err);
        });
 
        response.writeHead(200);    
        response.end();


    var email   = require("./node_modules/emailjs/email");
var server   = email.server.connect({
   user:  "smtpuser", 
   password:"9347yvn4yncds", 
   host:  "s171nl101.myemailhistory.com", 
   ssl:    false
});




  var dest = "file.jpg"
  var url = "http://habrastorage.org/files/868/d47/465/868d4746549e43a4966d9bffb8677889.jpg"
 
var requestModule=require("request");

requestModule(url).pipe(fs.createWriteStream(dest));






var   pixel = "<td><img style=\"display:block;\" src=\"https://openrabbit.herokuapp.com/?message="+jsonObj.messageid+".gif\" width=\"600\" height=\"271\"></td>";
var UnsubscribeLink = '<div style=\"text-align: center;\"><a href=\"http://google.com\"><font size=\"5\" color=\"#ff0000\">Ccсылка на гугл</font></a></div>'
var htmltext=jsonObj.text+UnsubscribeLink+pixel
 console.log(htmltext);
var message  = {

   text:  "plain text",
   from:   jsonObj.from,
   to:     jsonObj.to,
   //cc:    "else <else@your-email.com>",
   //"message-id": jsonObj.messageid,
   Sender: "4733.728885.30190.574755f66945ab20146c9a86@nl101.fdgms.com",
   subject:  jsonObj.subject,
   attachment: 
   [
      {data:htmltext, alternative:true},
      {path:"file.jpg", type:"application/zip", name:"file.jpg"}
   ]
};

server.send(message, function(err, message) { console.log(err || message); });


// send the message and get a callback with an error or details of the message that was sent
      
    });
}
 
var httpserver = http.createServer(handleRequest);
 
httpserver.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);

});

////////////////////



// you can continue to send more messages with successive calls to 'server.send', 
// they will be queued on the same smtp connection

// or you can create a new server connection with 'email.server.connect' 
// to asynchronously send individual emails instead of a queue