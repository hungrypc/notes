# Creating an API Gateway & AWS Lambda

## What is API Gateway?

With API Gateway, we can create restful APIs and it generally works like this:

Typically, we have an app that reaches out to our API. These clients will send requests because it needs something (execute code, store or retrieve something in database, etc). APIs can be created in Node/PHP/etc where we write the whole code for providing API endpoints on our own. API Gateway makes this easier where we don't have to write any code and conveniently create an API in a nice interface. 

We can create endpoints which are combinations of resources, paths, and methods so that we get urls that can be sent requests which we then can handle with API Gateway. You can also implement authentication too. 

It also gives us a way to so something on any action trigger. So with API Gateway, we can then directly access other AWS services *or* trigger an AWS Lambda function. 

## General API Gateway Features

- API Keys: We can generate API keys to access our API for other devs
- Custom Domain Names: Allows us to connect our own domain to the API
- Client Certificates: Important if we plan on forwarding incoming requests to yet another HTTP endpoint, and on that other endpoint we can validate that the request it gets is indeed stems from our API Gateway API
	+	With this, we can generate a certificate which proves this to our final API endpoint on a different API

## API-specific Features & Options

How does the API actually work?

Resources helps us manage resources and methods of our API. When we create a new resource, we create a new path in the final URL we can use. This isn't our live API though. To bring it to life and expose it to the web, we must deploy it. 

Once we've deployed, we have to select the stage. Stages are like deployed snapshots of our API. We work under reseources to manage the resources there, but when we're happy with the state of our work and want to use it in production or for testing we can deploy it. Our API is then taken and shipped to the web. We can view all our stages under the stages tab. 

Authorizers allows us to add authentication to our API. We can make our API only accessible to those logged in, just us, etc. 

Models allows us to define the shape of the data we work with in the API. They're created using JSON, so we define how the actual JSON data our API recieves should be structured.  If we do set up models, we can use them to validate incoming data, see if it fits a schema, reject data if it doesn't, and use the model in other useful places. 

Binary support is important if we plan on sending files along with requests. 

## Introducing the Request-Response Cycle

So when we create an endpoint and it receives a request, we go through a certai n cycle. On our resources tab, when we click on an endpoint, we can see a depiction of the flow of our data in our API. There's a test button that tests a request being sent by a client. 

Client sends request -> Method Request

Method request defines how requests reaching this endpoint should actually look like. We can reject requests here if they don't fit a certain schema (not just schemas we might have set up in any of our request data models). 

It's here that we can set up authorization and validation. We can check for auth, check if the query parameters fit our scheme, check if the headers attached fit our needs, and check the request body (which we can connect to a model we might have created). We can also require an API key from here.

Method Request -> Integration Request

Integration request is about mapping incoming data or transforming incoming data into the shape we want to use on the action we're about to trigger. 