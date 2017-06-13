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
 

```


< Note about JSON POST requests and CSRF >


#### Solution

There are several ways to prevent CSRF attacks on your application. The most straightforward method is to use a "synchronizer token" with any request that change state in your application. This involves creating a unique token and attaching it to every HTML form or AJAX call sent to the user. If the user wishes to then make a state-modifying request, they will have to attach the token they were just sent. The server verifies that the token was sent to the user, and only then accepts the request.



```

```
