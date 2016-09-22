## Broken Authentication and Session Management

#### Description

Broken Session and Authentication Management refers to several different problems with website authentication and authorization. Passing session token in the URL, poor storage of passwords, improper session storage and transmissions all fall under this broad class of vulnerabilities.


Session tokens being passed via URL is an information disclosure vulnerability. Sensitive tokens passed via URL could potentially be logged in log files or records which could then be accessible to attackers.

As an aside, user sessions must also be handled correctly on logout (deauthorization). Rather than simply resetting the cookie, make sure that someone who holds onto the sesion identifier does not retain any privileges for later.

This issue can also be used to refer to poor password storage in the database. Passwords should be stored with a strong, computationally intensive hash function such as **bcrypt**, **scrypt**, or **PBKDF2**. Avoid using MD5 or SHA for password storage, and never implement a hashing function on your own or store passwords in plaintext!

Ensure that sessions are properly stored in cookies on the client, and nowhere else. Some web frameworks will allow code to fall-back on storing the session as a GET parameter to every request (usually as SESSIONID or similar). This usually results in the session being stored in user history, and making it easier to expose the user to CSRF or other attacks. In addition, ensure that authenticate and session identifier transmission is securely handled over SSL. In actuality, there isn't much of a downside to running your entire site over SSL!

Finally, some session implementations make it easy to hijack user sessions through smaller features; "forgot password" or "change password" is a common avenue of attack. These features should be complex enough to prevent attackers from malicious resetting credentials.

#### Problem

node.nV has several issues with its authentication and session management. Firstly, the platform passes the Session ID in the URL upon authentication. As discussed above, this allows an attacker to hijack a user session without knowing their credentials. The attacker need only gain access to a log file containing tokens and can authenticate as the user.


node.nV also stores passwords insecurely; they are stored by default in plaintext in the database. Anyone who compromises the database server will have full access to all user accounts. Furthermore, even an attacker who manages to exploit SQL Injection or a similar attack will be able to read off user credentials. The system also lacks TLS overall, so authentication is not protected when it passes over the network. Even if the passwords were encrypted, they could still be read as the user logs in.


#### Walkthrough



#### Solution