## Document Object Model (DOM) Cross-site Scripting (XSS)

#### Description

Cross-Site Scripting is a vulnerability that occurs when user-supplied data is unsafely rendered back in an application. When malicious data is rendered to the front end views without any escaping, the user's browser may be hijacked or commanded for malicious purposes. DOM-XSS is a unique version of XSS where the user-supplied data is rendered back using the browser's rendering engine (for example, JavaScript) instead of by the application server. In other words, the page itself (the HTTP response) does not change, but the client side code contained in the page executes differently due to the malicious modifications that have occurred in the DOM environment.

XSS flaws usually rely on executing JavaScript in the user's browser, but can occur in a wide variety of settings beyond the common ```<script>``` tag. HTML is a versatile language, and JavaScript can be executed from within HTML attributes, CSS, or even from within JSON payloads.

There are usually two broad forms of XSS: stored XSS, and reflected XSS. DOM-XSS is a subset of both forms, but is most commonly seen as an addition to reflected XSS. DOM XSS is usually parsed from a URL or some other client-only input, and affects the user without any interaction from the server. Reflected XSS is much harder to detect, since there is no interaction with the server as the user is hijacked. On the other hand, stored XSS is usually sent as input to the server and saved in a database. Any time the page with the payload is loaded, it will replay the exploit. While easier to detect, stored XSS can have a wider reaching impact on the end user.

#### Problem
URL: http://localhost:8081/search

node.nV intends to use JavaScript to search for specific URL hash terms within each page. However, as seen with reflected and stored XSS, the application is not adequately protected! 



#### Walkthrough
1. Navigate to the search tab in the Employer Dashboard.
2. Appened ```#?url=javascript:alert(1);``` to the end of the URL.



#### Code Snippet
views/er/ersearch.ejs:

Lines 151-155
```
<script>
var redirUrl = decodeURIComponent(window.location.hash.slice(window.location.hash.indexOf("?url=")+5)); 
if (redirUrl) window.location = redirUrl;
</script>
```

#### Solution

DOM-XSS requires specific knowledge of the user-controlled JavaScript parameters, in addition to those functions that write directly to the DOM without any protections against unsafe content. First of all, always treat untrusted data as displayable text. Use ```element.textContent``` to instruct the browser how the data should be treated. Further, use ```document.createElement``` instead of ```document.write``` when manipulating the DOM directly. 

### Solution Code

```
   
```
