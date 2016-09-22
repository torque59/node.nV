## Security Misconfiguration

#### Description

Security Misconfiguration refers to insecure settings chosen for any portion of the web application stack. When the application is configured in an insecure way, it can be vulnerable to any number of other attacks, since the regular defences are disabled. Such issues can involve default pages, system level accounts that are unprotected, access to private database pages, or insecure files or directories.

Security Misconfiguration issues can occur in the web application itself, the application server, the web server, the host operating system. For this reason, this class of vulnerability can be easy to exploit. Misconfiguration often involves searching for what is missing, rather than what is purposely configured insecurely. It can be also difficult to ensure that all layers of your stack are configured securely, especially across system updates.


#running as root
#SSL config
#cookies secure and HttpOnly Flag 