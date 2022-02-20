# AWS Fundamentals: ELB + ASG

## High Scalability and Availability

> Scalability: means that an application/system can handle greater loads by adapting

There're two kinds of scalability:
- Vertical 
- Horizontal (also known as elasticity)

Scalability is linked but different to high *availability*

To explore the difference, let's use a call center as an example. 

### Vertical Scalability

**Vertical scalability means increasing the size of the instance.** 

Let's say we have a jr call operator that can only take 5 calls a day. An example of vertical scaling would be upgrading our call operator to a senior operator who is much greater and can take 10 calls per day. 

With EC2, an example of vertical scaling would be scaling our application from a t2.micro to a t2.large.

So when do we need vertical scalability? It's very common for non distributed systems, such as a database. RDS, ElastiCache, etc are services that can scale vertically. There's usually a limit to how much you can vertically scale (hardware limit). 

### Horizontal Scalability

**Horizontal scalability means increasings the number of instances/systems for your application.**

Let's say our jr call operator is starting to get overloaded. Instead of upgrading him vertically, we can hire a second operator. 

Horizontal scaling implies distributed systems. This is quite common for web apps. It's easy to horizontally scale thanks to cloud offerings such as Amazon EC2. 

### High Availability

High availability means running your application/system in at least 2 data centers(== availability zones), and usually goes hand in hand with horizontal scaling. The goal of high availability is to survive a data center loss. 

So high availability can be passive (for RDS Multi AZ for example) or active (for horizontal scaling).

So what does this mean for EC2?
- Vertical scaling: increase instance size (= scale up/down)
	+ from t2.nano (0.5G RAM, 1 vCPU) to u-12tb1.metal (12.3TB RAM, 448 vCPU)
- Horizontal scaling: increase number of instances (= scale out/in)
	+ Auto Scaling Group
	+ Load Balancer
- High availability: run instances for the same app across multi AZ
	+ Auto Scaling Group multi AZ
	+ Load balancer multi AZ

## Elastic Load Balancing (ELB) Overview

> **Load Balancers** are servers that forward internet traffic to multiple servers (EC2 Instances) downstream. 

So users will interface with a single point of entry (our Load Balancer) which will divert the traffic towards one of many backend instances to serve them. This balances the load, hence the name 'Load Balancer'. 

So why should we use them? 
- Spread load across multiple downstream instances
- Expose a single point of access (DNS) to our application
- Seamlessly handles failure of downstream instances
- Does regular health checks to our instances
- Provides SSL termination (HTTPS) for our websites
- Helps enforce stickiness with cookies
- High availability across zones
- Separate public traffic from private traffic

An ELB (EC2 Load balancer) is a **managed load balancer**. AWS will take care of all the upgrades, maintenance, and high availability. AWS also provides only a few configuration knobs to make sure that the behavior we get is the one we expect. While it would cost less to setup our own load balancer, it would be a lot more effort on our end. It's also integrated with many AWS offerings/services

Health Checks are crucial for Load Balancers because they enable them to know if instances are available to reply to requests. They're done on a port and a route (/health is common). If the response is not 200 (OK), the instance is unhealthy. 

#### Types of Load Balancers on AWS

1. Classic Load Balancer (v1 - old generation) - 2009
	+ Supports HTTP, HTTPS, TCP traffic
2. Application Load Balancer (v2 - new generation) - 2016
	+ Supports HTTP, HTTPS, WebSocket traffic
3. Network Load Balancer (v2 - new generation) - 2017
	+ Supports TCP, TLS (secure TCP) & UDP

Overall, it's recommended to use the newer load balancers as they provide more features. 

You can set up *internal* (private) or *external* (public) ELBs. 

#### Load Balancer Security Groups

**Users** <- HTTP/HTTPS from anywhere -> **Load Balancer** <-HTTP Restricted to Load balancer-> **EC2 instances**

So users can communicate with the load balancer through HTTP/HTTPS from anywhere. But, our EC2 instance expects only the load balancer to send traffic to it. 

Good things to know:
- LBs can scale but not instantaneously - contact AWS for a 'warm-up'
- Troubleshooting
	+ 4xx errors: client induced
	+ 5xx errors: application induced
	+ Load Balancer Errors 503: at capacity or no registered target
	+ If the LB can't connect to app, check security groups
- Monitoring 
	+ ELB access logs will log all access requests (so we can debug per request)
	+ CloudWatch Metrics will give aggregate statistics (eg connections count)

## Classic Load Balancers (v1)

- Supports TCP (Layer 4), HTTP & HTTPS (Layer 7) 
- Health checks are TCP or HTTP based
- Fixed hostname: XXX.region.elb.amazonaws.com

Hands on notes:
- Internal makes it inaccessible to the public
- The listener config is for what our CLB is going to be listened onto, demo set on HTTP port 80
- The security group settings is where we allow anyone on port 80 to access our CLB from anywhere, which is what we need because we want to access it through here
- In health check config
	+ Ping path is address that is pinged to check the health status
	+ Response timeout: how long are we willing to wait for a response?
	+ Interval: how often do we want to ping our instance?
	+ Unhealthy threshold: how many failed pings does it take to be considered unhealthy?
	+ Healthy threshold: how many successful pings is considered healthy?

So if we copy the DNS name and go to it, we should see what we would see on our EC2 instance. This is as expected because we're using the load balancer to access the EC2 instance. 

However, we're still able to access both the EC2 instance and the load balancer at the same time. We want to only be able to expose and access the load balancer and not be able to access the EC2 instance directly. To do this, we have to go back to our security groups. Our load balancer security group inbound settings are fine, it just allows anyone to access it on port 80. We have to change the inbound settings for our EC2 instance security group and change the source on port 80 to our load balancer security group so that only the load balancer can access the EC2 instance from port 80. 

## Application Load Balancer (v2)

- Supports HTTP (Layer 7)
- Load balancing to multiple HTTP applications across machines (target groups)
- Load balancing to multiple applications on the same machine (eg containers)
- Support for HTTP/2 and WebSocket
- Support redirects (from HTTP to HTTPS for example)
- Routing tables to different target groups:
	+ Routing based on parth in URL
	+ Routing based on hostname in URL
	+ Routing based on query strings, headers

ALBs are great for micro services and container-based application (eg Docker & Amazon ECS). They have a port mapping features which allow you to redirect to a dynamic port in ECS. In classic load balancers, we'd need multiple CLBs per application, whereas with ALB we can have one load balancer in front of many applications. 

### Target Groups

- EC2 isntances (can be managed by an Auto Scaling Group) - HTTP
- ECS tasks (managed by ECS itself) - HTTP
- Lambda functions - HTTP request is translated into a json event
- IP addresses - must be private IPs

So ALBs can route to multiple target groups and the health checks are going to be done at the target group level. 

Good to knows: 
- Fixed hostname XXX.region.elb.amazonaws.com
- Application servers don't see the IP of the client directly
	+ The true IP of the client is inserted in the header *X-Forwarded-For*
	+ We can also get Port (*X-Forwarded-Port*) and proto (*X-Forwarded-Proto*)

What this means is that our Client IP is directly talking to our LB, which performs something called a connection termination, and our LB talks to our EC2 instance using the LB IP, which is a private IP into our EC2 instance through these extra headers. 

### Hands-on

Create a Load Balancer -> Application Load Balancer -> select Availability Zones -> Configure Security Groups and select existing load balancer security group -> Configure Routing -> Advanced health check settings:
- Healthy threshold: 5
- Unhealthy threshold: 2
- Timeout: 5
- Interval: 10
- Success codes: 200

Register Targets -> register some targets into our Target Group and click add to registered -> Review -> Create

If we copy the DNS name and open it on a new tab, we should see the page of our instances. 

We can edit the rules on our listener by clicking *View/edit rules*. 

Insert new rule -> Add condition -> Path is '/test' -> Add action -> Forward to second-target-group' -> save

This rule we just made is saying 'if the path is /test, then forward to second-target-group, else forward to first-target-group'. 

So through listeners, we're able to have many rules and these rules allow us to redirect not just to one target group but to multiple target groups, which is part of the power of LBs.

## Network Load Balancer (v2)

- Network load balancers (Layer 4) allow us to:
	+ Forward TCP & UDP traffic to our instances 
	+ Handle millions of requests per seconds
	+ Less latency at around 100ms (vs 400ms for ALB)
- NLB has **one static IP per AZ, and supports assigning Elastic IP** (helpful for whitelisting specific IP)
- NLB are used for extreme performance, TCP or UDP traffic
- Not included in the AWS free tier

Layer 4 means that our target groups can be EC2 instances, but now our TCP based traffic will reach our target groups - so it could be from external and we could have some rules to redirect to target groups. 

## Elastic Load Balancer

### Stickiness

> Stickiness is where the same client will always be directed to the same underlying isntance that is behind the LB

- This works for Classic Load Balancers & Application Load Balancers
- There is a 'cookie' that is used for stickiness and has an expiration date we can control
- Use Case: make sure the user doesn't lose their session data
- Enabling stickiness may bring imbalance to the load over the backend EC2 instance because the load is now not evenly distributed, it's sticky

So stickiness is very helpful if you want the same request originating from the same client to go to the same target EC2 instance.

Hands On notes:
- Stickiness is not a load balancer specific configuration, you can configure it on the load balancer page only if you are using a classic load balancer
- Because we have an application load balancer, the stickiness setting is at the target group level (set it in Target Group -> edit attributes)

### Cross Zone Load Balancing

> With Cross Zone Load Balncing, each load balancer instance distributes evenly across all registered instances in all AZ

Otherwise, each load balancer node distributes requests evenly across the registered instances in its AZ only. 

Classic Load Balancer:
- Disabled by default
- No charges for inter AZ data if enabled 

Application Load Balancer: 
- Always on (can't be disabled)
- No charges for inter AZ data 

Network Load Balancer:
- Disabled by default
- You pay charges for inter AZ data if enabled

### SSL/TLS Certificates (Basics)

> An **SSL Certificate** allows traffic between your clients and your load balancer to be encrypted in transit (in-flight encryption). This means that data, as it goes through a network, will be encrypted and only able to be decrypted by the sender and the receiver. 

SSL refers to **Secure Sockets Layer**, used to encrypt connections. TLS refers to **Transport Layer Security**, which is a newer version. 

- Nowadays, TLS certificates are mainly used but people still refer as SSL.
- Public SSL certificates are issued by Certificate Authorities (CA) such as GoDaddy, Comodo, etc. 
- SSL certificates have an expiration date (you set) and must be renewed

So how it works is users connect to the load balancer via HTTPS (S because it's using SSL certificates and it's encrypted) over WWW (public). Internally, the load balancer does SSL termination, and talks to the EC2 instance using HTTP (not encrypted) over private VPC (private traffic network). The load balancer will load an X509 certificate (SSL/TLS server certificate), which can be managed in AWS using AWS Certificate Manager (ACM). You can create/upload your own certificate in AWS, though you must set up an HTTPS listener where you have to specify a default certificate and add an optional list of certs to support multiple domains. Clients can use SNI (Server Name Indiccation) to specify the hostname they reach. You also have the ability to specify a security policy to support older versions of SSL/TLS. 

#### SNI

> SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites).

It's a newer protocol, and requires the client to indicate the hostname of the target server in the intial SSL handshake. The server will then find the correct certificate, or return the default one. 

Note:
- Only works for ALB & NLB (newer generation), or a CloudFront
- Does not work for CLB (older gen)

So, using SNI, you are able to have multiple target groups for different websites using different SSL certificates. 

Classic Load Balancer: 
-  Supports only one SSL cert
- Must use multiple CLB for multiple hostname with multiple SSL certs

Application Load Balancer:
- Supports multiple listeners with multiple SSL certs
- Uses SNI to make it work

Network Load Balancer:
- Supports multiple listeners with multiple SSL certs
- Uses SNI to make it work

### Connection Draining

This has two different names depending on which load balancer you're considering:
- Classic LB: **Connection Draining**
- Target Group: Deregistration Delay (for AppLB & NetworkLB)

(Depsite the naming difference, let's just call it connection draining from here on out)

> Connection Draining = The time to complete "in-flight requests" while the instance is deregistering or unhealthy. This allows the instance to shut down anything it was doing before being deregistered.

So as soon as the instance is in draining mode, it stops sending new requests to the instance which is deregistering. Existing connections will have to wait for the draining period ot be completed (300s by default). Any new connection that is made by the users into the ELB will be redirected to the other EC2 instances that are available and registered to the ELB.

## Auto Scaling Groups

In real life, the load on your websites and applications can change. In the cloud, you can create and get rid of servers very quickly. The goal of an Auto Scaling Group (ASG) is to:
- Scale out (add EC2 instances) to match an increased load
- Scale in (remove EC2 instances) to match a decreased load
- Ensure we have a minimum and a mazimum number of machines running
- Automatically register new instanecs to a load balancer

ASGs have the following attributes:
- A launch config
	+ AMI + Instance Type
	+ EC2 User Date
	+ EBS Volumes
	+ Security Groups
	+ SSH Key Pair
- Min size / max size/ initial capacity
- Network + Subnets information
- Load Balancer information
- Scaling Policies (what triggers scale out/in)

### Auto Scaling Alarms

It is possible to scale an ASG based on CloudWatch alarms. It monitors a few metrics (eg Average CPU) and when an alarm goes off, it scales in/out depending on how it's set. Metrics are computed for the overall ASG instances. 

### Auto Scaling New Rules

It is now possible to define "better" auto scaling rules taht are directly managed by EC2
- Target average CPU usage - scales in/out based o n the load to meet that target CPU usage
- Number of requests on the ELB per instance
- Average network in
- Average network out

These rules are easier to set up and can make more sense. 

### Auto Scaling Custom Metric

We can also auto scale based on a custom metric (eg number of connected users). 
1. Send custom metric from app on EC2 to CloudWatch (PutMetric API)
2. Create CloudWatch alarm to react to low/high values
3. Use the CloudWatch alarm as the scaling policy for ASG

### Brain Dump

- Scaling policies can be on CPU, Network... and can even be on custom metrics or based on a schedule (if you know your visitors patterns)
- ASGs use Launch configurations or Launch Templates (newer)
- To update an ASG, you must provide a new launch config/template
- IAM roles attached to an ASG will get assigned to EC2 instances
- ASGs are free - you pay for the underlying resources being launched
- Having instances under an ASG means that if they get terminated for whatever, the ASG will automatically create new ones as a replacement - extra safety
- ASG can terminate instanes marked as unhealthy by an LB (and hence replace them)
