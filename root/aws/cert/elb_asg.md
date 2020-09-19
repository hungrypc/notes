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