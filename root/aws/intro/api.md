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

### Client sends request -> Method Request

Method request defines how requests reaching this endpoint should actually look like. We can reject requests here if they don't fit a certain schema (not just schemas we might have set up in any of our request data models). 

It's here that we can set up authorization and validation. We can check for auth, check if the query parameters fit our scheme, check if the headers attached fit our needs, and check the request body (which we can connect to a model we might have created). We can also require an API key from here.

### Method Request -> Integration Request

Integration request is about mapping incoming data or transforming incoming data into the shape we want to use on the action we're about to trigger. So the role of integration request is to trigger an endpoint and, if need be, transform our incoming request data so that it allows us to extract the data and pass it on to the endpoint.

### Endpoint -> Integration Response

The integration response is the first thing that gets triggered as soon as the action is done. It then allows us to do the same kind of thing that integration request does, just the other way around (allows us to configure the response we're sending back). So we can handle the content we get back from the action, set headers, and map the content we're receiving from our action to the response. 

### Integration Response -> Method Response

Method response is like method request, just for response data. It's not really a gatekeeper, but it defines the shape of our response. So here, we can configure possible responses we're sending back, and on this response we can set up which headers this response should be allowed to have and which type of data it should send back. We can use models we define so that we can be clear about which shape of data we're sending back. This part will never block the response. 

This is the full cycle:
- Request received
- Checked by gatekeeper
- Transform and pass to action
- Action does something with it
- Take the data the action returns and transform that for the response
- Check against the boundaries that are set up for the response
- Response is sent back to client

## Creating a new API

### Creating a Resource

Click Actions -> Create Resource.

Once we've created another resource, we want to be careful about where we want to add new resources since they will always be appended to the one selected. Starting out, it's fine since there's only one before we've created (root). 

### Proxy Resource

Configure as proxy resource means that this will be a catch-all resource, catching all other paths and methods - this makes this a flexible path and, therefore, the API may only have this single resource because it catches all requests. Why would we do this? Because this action can be a lambda function. For now, we wont do this.

### CORS

CORS is about a security model where we aren't allowed to access resources on a server from another server. By default, the browser prohibits this. The server has to return the right headers to the client. The client needs to know that it's ok to access this data. That's what this checkbox takes care of. 

When we send a request, the browser sends a preflight request to the server, which are there to check if the resource the request is about to get sent to is actually available and if it's allowed to send a request. So we need to provide an options endpoint so that the browser can send a preflight request, and the options endpoint also need to return the right CORS headers to inform the browser that we're good to go. 

`Access-Control-Allow-*` are the headers that allows CORS. 

## Creating an HTTP Method

So we've created a resource, but this alone doesn't allow us to send a request because the request always has some request method (HTTP method). Let's say we want to handle a POST request. Select the newly created resource, go to actions -> create method.

With this, we can now create a new integration type. This means 'which kind of action do you want to execute whenever a request hits this resource?'. If we select lambda, this allows us to run some code on-demand whenever a POST request reaches this resource. 

Use Lambda Proxy Integration takes the incoming request, grabs the meta-data off it, and passes that unfiltered JSON object as JSON data to the lambda function. This also means that in the lambda function, you'll have to extract what you need and send back a response from lambda. This is a way of doing more logic in lambda and less in API Gateway. Since we want a clear separation (logic in lambda, logic about API should stick in API Gateway), we won't check this.

We won't be able to save yet though because we haven't created a lambda function yet, so let's do that.

## What is AWS Lambda

It's a service that allows you to host your code and run it upon certain events. In detail:

- We get different event sources
	+ For example, S3 - a file upload could trigger a lambda function which then will receive info about that file as an input and could possibly transform it. 
	+ Another example is CloudWatch, which are scheduled triggers. Useful for cleanup, or anything that runs on a regular basis
	+ Or, we could use API Gateway to run the code whenever a request hits the API 
- Event source triggers our code
	+ This code is stored in lambda and written in node/python/java/c#/
- Could interact with other AWS Services
- Return the response or execute a callback to indicate that this function is done, can shut down, and possibly pass any data back to the event source that called it

