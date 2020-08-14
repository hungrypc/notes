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

## Creating a Lambda Function

When creating a lambda function, you can select how you want to author the function (from scratch, from a blueprint, from serverless app repositories), enter a function name, and then choose a runtime to select the language used to write the function. 

Once we click Create Function, we'll be directed to an interface. Here, we can test the function, add triggers to run the function, add destinations, monitor the function, view logs, etc. 

Scrolling down, we arrive at the meat of the function. At the moment, we're editing in the browser but we can upload either a zipfile or via S3. The function in the browser editor is the function that gets called whenever the lambda function executes. 

## Accessing the API from the Web and Fixing CORS Issues

So if we want to call the API from the web, we need to deploy it.

Things that we've set up in resources isn't live yet. Click actions -> deploy API, create new stage, deploy. 

Here's the thing though, although CORS is enabled on our OPTIONS resource, our POST resource won't work. We have to set the headers.

Click resources -> POST -> Method Response -> Add Header Access-Control-Allow-Origin -> back to Integration Response -> on the header value add `'*'`

Then redeploy.

There's a quicker way to enable CORS. Click Actions -> Enable CORS.

## Understanding "event" in Lambda Functions

With this, we can move on to how we can actually work with data our request might hold, and use lambda to return a meaningful response. 

### Forwarding Requests with "Proxy Integration"

Let's start by changing the data which reaches lambda/whatever our endpoint may be. 

We do this at Integration Request, under body mapping templates where we can change the behavior. 

Another way to do this is by checking 'Use Lambda Proxy Integration' to forward the complete request object with all the meta data to the lambda function. 

If we test this, we'll get an error with a status code of 502. Notice that Integration Response is greyed out. The reason for this is that it never gets to work. This was originally the place where API Gateway allowed us to define our response or to fill it with values - it automatically took what lambda returned and put it into the response body.  

If we edit the lambda function to:
```js
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return {
        headers: {
            "Control-Access-Allow-Origin": "*"
        }
    };
};
```
...and hit test again, we don't get an error but just get no response data since we've added no body property. 

This is how we can work with this integration proxy that we forward to complete requests to lambda. 

If we want to take a look at the complete request, we will need to look into the running lambda function.

### Accessing Lambda Logs

If we want to see inside the event object, we can't do it by returning data back as the example above. Instead, we can `console.log(event)` it. But where do we see the console? Test it again, go to the CloudWatch service, and under the Logs tab. It's here that we see our entire request object. 

There is a disadvantage of using this proxy integration. We get all this meta data that might be useful, but there is another way of getting this in a better way. If we want to extract the body, we have to access it on this global object on body and then JSON parse it. 

### Getting Started with Body Mapping Templates

Maybe the lambda function shouldn't need to parse any incoming event and extract exactly what it needs if it doesn't need 90% of that data. Instead, that should be the job the the API Gateway - we should ensure that we only pass our action, lambda in this case, what this action needs. 

Going back to Integration Request, uncheck Proxy, and we're back to our old setup. Since no template is selected, the whole request body is forwarded to lambda. Fix the lambda to return event. 

In the lambda function, maybe we don't want the entire body. We could edit the lambda function to:
```js
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    const age = event.age
    return age
};
```
So this makes sense, but the lambda function has to care about the structure of the data it receives. It would be better if the lambda function could simply access `age` on the event becaue it knows that there will be an `age` property. 

This is where body mapping templates enter the stage. In the integration request and response, we can use them to map - in the case of request: the data we pass, and in the case of response: data we get out of the action. 

On Integration Request, under Mapping Templates, switch 'Request body passthrough' to 'When there are no templates defined', and add a mapping template with the name 'application/json'. With that, the request body will not be forwarded by default anymore but this template will be used. Set it to an empty object and hit save, go back to test and test it - we'll get back null as a response. 

The reason for this is that in our template, we transformed the incoming data and passed on an empty object to lambda. Typically, we don't overwrite the data with an empty object. Instead, we want to do is use mapping template language that API Gateway provides us with. 

### Extracting Request Data with Mapping Templates 

We can learn more about this language [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html). 

A quick example can be found if we select Method Request passthrough in 'Generate template' on our mapping template. This basically extracts a lot of data from the request and returns it as a mapped json response. It also doesn't override our integration response, we're still in API Gateway doing request and response handling, we just happened to extract a bunch of data from the request and pass it to the action. We can narrow this down even more. 

On the template, get rid of all the stuff at the bottom and leave this:
```js
{
"body-json" : $input.json('$')
}
```
`$` refers to the request body, `json` parses it. 

With this, we can even rename:

```js
{
"age" : $input.json('$')
}
```

