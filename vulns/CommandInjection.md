## Command Injection

#### Description

Command and Expression Language Injection vulnerabilities are a class of vulnerability similar to SQL Injection where attackers can execute malicious on the server. Often times, untrusted data that is unproperly validated can end up in strings that are directly executed as code, and become indistinguishable from the code created by the original developer. Since the malicious commands will appear in-stream with the intended code, it will also execute with the same privileges as the original operation, creating a security risk. Command and Expression Language Injection attacks are often used to establish a foothold on the affected server that is then leveraged by an attacker to further attack an organization's network.

The most common avenue for any injection attack is when unverified input is directly concatenated to a command string.

#### Problem
Authenticate into the admin dashboard and navigate to the ping tab.
URL: http://localhost:8081/ping

The node.nV admin tab contains a page which was originally designed to test network conectivity via ping. However, because the backend service does not validate inputs, the page is vulnerable to Command Injection.

#### Walkthrough

1. Open up the application directory, and navigate to the views folder (```src/main/webapp/WEB-INF/views```). Notice that there is a ```test.jsp``` file in that folder that appears to be debug functionality.
2. Attempt to access the path ```/test?test=@environment``` on the system. The output appears to be code injection, since we can access the environment object!
3. Navigate to ```/test?test=@environment.getProperty(%27user%27)```. We can leverage this vulnerability to access the current logged in user. Since we have command execution in the JSP template, we can use it to execute arbitrary code on the server and return it to the client.

#### Code Snippet
UIRoutes.js

```
exports.ping=function(req,res){
        var uname=req.decoded._doc.username;
        var ip = req.query.q;
        
        if(ip){
                exec('ping -c 5 '+ip,function(err,stdout,stderr){
                        res.render("adminping.ejs", { q: ip, username: uname, ping: stdout });
                });
        }else{
                res.render("adminping.ejs", { q: "", username: uname, ping: "Submit An IP Address To Test Connectivity!" });
        }
        
}
```

#### Solution

The main solution for dealing with command injection attacks is to remove any evaluation or passing of user-controlled parameters back to command interpreters. This functionality very rarely needs user-input, but if it does, input validation must be performed to eliminate control characters that give an attacker freeform access to commands and expressions. The most common way to do this is by building a regular expression that validates the user-provided string before being concatanated to the command expression.

In the case of node.nV,


#### Solution Code 

```
        //Solution
```

