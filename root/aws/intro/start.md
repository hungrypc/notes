# The Core Serverless Services

## What Services Do We Need?

Let's say we're making a static web app. We want to host this somewhere where we don't have to start and shutdown the servers ourselves. A great place for this is **AWS S3 (Simple Storage Service)**. It's actually a file storage service, but a static app is just a couple of files. Since we're not runing any server-side code (which wouldn't be supported by S3), it's perfect to host our app because we don't have to set up any capacities there. We just store our files, configure them to be accessible on the web and we're good to go. This is actually a common use case for it. 

We probably want to connect to some API to store/fetch data, so we'll need a restful API. **API Gateway** is a service that makes it easy for us to create an API with different paths and HTTP methods we want to handle.  

Now that we have the API, we want to do something when we receive requests and execute some code. That's where **AWS Lambda** comes in. It's a service which allows us to execute code on-demand. We're not limited to executing code whenever we receive an API request, there are other events that we can hook up but we'll just focus on the connection to the API Gateway to execute code whenever we recieve a request to one of our custom endpoints. 

Now, we need a database to store and retrieve data. We don't want to manage database servers for that, so we can use **DynamoDB**. It's a NoSQL database where we don't have to provision any database servers, so we can just store data as we get it.

Since we might want to autheticate users, we can use **Cognito**, which is a service where we can easily create user pools to allow users to sign up and login. We can protect the rest API so that only authenticated users are able to access certain or all of the endpoints we provide. 

Now with all this, we probably want to have our own URL. We can use **Route 53** for that. It allows us to register and configure our own domain so that whenever we receive a request to this domain, we actually load the webpage from our S3 bucket. 

Finally, if we want to improve the performance of our delivery time, we can use a caching service called **Cloud front**. This basically copies our static files in S3 to different destinations everywhere so that people accessing the web page will always have the quickest route possible. 

These are all the services that we'll learn in this course. 