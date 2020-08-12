# The Core Serverless Services

## What Services Do We Need?

Let's say we're making a static web app. We want to host this somewhere where we don't have to start and shutdown the servers ourselves. A great place for this is AWS S3 (Simple Storage Service). It's actually a file storage service, but a static app is just a couple of files. Since we're not runing any server-side code (which wouldn't be supported by S3), it's perfect to host our app because we don't have to set up any capacities there. We just store our files, configure them to be accessible on the web and we're good to go. This is actually a common use case for it. 

We probably want to connect to some API to store/fetch data, so we'll need a restful API. API Gateway is a service that makes it easy for us to create an API with different paths and HTTP methods. 

For 

