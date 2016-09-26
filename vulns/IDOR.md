## Insecure Direct Object References

#### Description

Insecure Direct Object References are a class of vulnerability where users are able to directly access database objects based on their input. This commonly manifests itself in application URLs that end in an object identifer, such as ```/profile?id=<user id>```. In many cases, the developer does not consider that simplying not giving the user a link to another page does not prevent them from finding it on their own.

In order for this problem to be an *insecure* direct object reference, it should allow the attacker to bypass normal authentication methods. For example, a system that stores invoices and allows them to be accessed by ID (```/invoice?id=343243```) would have IDOR vulnerabilities if an attacker could bruteforce ID numbers to view other users' private invoices.

#### Problem
Navigate to an edit listings page on the Employer Dashboard.
1. Authenticate to the application as an employer.
2. Navigate to the Listings Tab.
3. Click on the eye in the status tab of any listing to edit that listing.

Example URL: http://localhost:8081/editListing?id=57d707573952354d2802926a


There is no verification that the user submitting the request is attempting to view their own information. It is reasonable to assume that Employers do not want other employers modifying their listings. Yet, if an Employer passes in a document ID that is not one of its own, the application will dutifully reveal that listing's information and allow the user to edit.



#### Walkthrough

1. Authenticate to the application as an employer, and navigate to the following URL:

http://localhost:8081/listings

2. Click on the eye in the status tab of any listing to edit that listing:

Example URL: http://localhost:8081/editListing?id=57d707573952354d2802926a

3. Modify the id parameter to another valid listing ID in order to access another listing that does not belong to the 

#### Code Snippet



#### Solution

Implement middleware for authorization of endpoints:
The following function can be used for ensuring that employers can only access their listings:

```
var validateListing=function(req,res,next){
	var id=req.query.id;
	Listing.find({"owner":id},function(listing,err){
		if(err){ throw err}
		else{
			next();
		}
		});
}


```

This kind of middleware can be adapted based on the parameter that requires validation.


