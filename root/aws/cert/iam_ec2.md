# AWS Fundamentals: IAM + EC2

## IAM Intro

> IAM: Identity and Access Management

The whole of AWS security is here:
- Users
- Groups
- Roles

note:
- The root account should never be used (or shared). 
- Users must be created with proper permissions. 
- IAM is at the center of AWS (every aws service is connected with this).
- Policies are written in json

**Users** are usually a physical person. They can be **grouped** together. **Roles** are only for internal usage within aws resources (they're given to the machine). **Policies** define what each of the previous stated entities can and cannot do.

IAM has a global view, which means that when we create a user/group/role it will be across all regions. MFA can be set up. IAMs come with some predefined 'managed policies' for ease of management. 

It's best to give users the minimal amount of permissions they need to perform their job (least privilege principles). 

For big enterprises, we use IAM Federation. 
- Big enterprises usually integrate their own repository of users with IAM
- This way, onean login into aws using their company credentials 
- Identity Federation uses the SAML standard (Active Directory)

Note:
- ONE IAM user per physical person
- ONE IAM role per application
- IAM credentials should *never* be shared
- Never write IAM credentials in code
- Never use the root account except for initial setup
- Never use the root IAM credentials

## EC2 Intro

EC2 is one of the most popular aws services, mainly consists in the capibility of:
- Renting virtual machines (in cloud) :: EC2
- Storing data on virtual drives :: EBS
- Distributing load across machines :: ELB
- Scaling the services using an auto-scaling group :: ASG

Knowing EC2 is funamental to understanding how the cloud works. 

If we head over to aws and go into EC2, we can launch an instance. This will require us to choose an Amazon Machine Image (AMI), which is the software/os that will be launched on that server. For the certification, it's much better if we use the Amazon Linux AMI because they come with a lot of amazon specific things. Recently, Amazon Linux 2 came out and is recommended we use this since it's how amazon sees us using linux. Once we've selected an AMI, we can select the instance type, which is basically asking us "how powerful do you want the machine to be? how many vCPUs do you want it to have? how much memory?". There's a LOT available, but only one is free tier eligible (t2.micro) so we'll go with that. There's more steps that can be configured, but at this point we can just start our instance since we'll be going over further configuration later. 

When we launch, we have to either select an existing key pair or create a new key pair. Basically, a key pair is what's going to give us access to login to or ssh into a machine we launch. When we create a key, we can download a .pem file that we'll use later. Once we launch it, we can view our instance in the 'Instances' tab. 

## SSH

> SSH allows us to control a remote machine, all using the command line.

So we have our EC2 machine that we launched Amazon Linux 2 on, and our machine has a public IP. We want to access that machine. For this, we have a security group on which we allowed port22 of ssh. What's going to happen is that our computer will access the EC2 machine over the web through that port22. Our cli is going to be just as if we were inside that machine. 

Going back to our Instances tab and looking at the instance we launched, the bottom right should show a public DNS and a public IP. This is how we can connect over the web to this instance. Copy the public IP. Just to double check what port is open, we can look at the instance's 'Security groups' and click 'view inbound rules'. 

Remember the .pem file? We're going to use it here. 

To SSH into the instance, open the cli and type:
```cli
ssh -i <.pem file> ec2-user@<ip address> 
```
However, we'll still be denied permission. This is because the .pem file has permissions 0644, which is too open. Basically, because the private key is accessible to others, it will be flagged as bad permissions. To fix this, we do:
```cli
chmod 0400 <.pem file>
ssh -i <.pem file> ec2-user@<ip address> 
```
And we're in.

If we type:
```
whoami
```
We'll get back `ec2-user`. 

To exit, ctrl+d.

## EC2 Instance Connect

On our Instances tab, if we check our instance and click the Connect button, we can connect to our instance using EC2 Instance Connect, which is a browser-based ssh connection. We simply specify the username, click connect, and we're in. 

Now, from the browser, we can issue commands. This wouldn't work if we blocked the ssh port. This only works with Amazon Linux 2 for now.

## Intro to Security Groups

> Security Groups are the fundamental of network security in AWS. They control how traffic is allowed into or out of our EC2 Machines. Basically acting as a firewall on EC2 instances.

We'll look at how to use them to allow inbound and outbound ports.

Looking at the inbound rules of our instance, port 22 is allowed (for ssh).

When we click on it, we're sent to the security group. Under *inbound*, these are all the rules that will allow traffic **into** our ec2 machine. By default, there are no rules. Earlier we set up an inbound rule for port22. going to *outbound*, all traffic is enabled out of the machine by default. This means that the machine can communicate with everything everywhere. Finally, there are tags but we don't really care about it right now. 

Security groups regulate:
- Access to ports
- Authorized IP ranges - IPv4 and IPv6 
- Control of inbound network (from other to the instance)
- Control of outbound network (from the instance to other)

Note: Security Groups...
- Can be attached to multiple instances
- Are locked down to a region/VPC combination
- Live 'outside' the EC2 - so if traffic is blocked, the EC2 instance will never see it
- It's good to maintain one separate security group for ssh access
- If your application is not accessible (timeout), then it's a security group issue
- If your app gives a 'connection refused' error, then it's an app error or it's not launched
- By default:
    + All inbound traffic is blocked
    + All outbound traffic is authorised

We can also reference security groups from other security groups, but it's an advanced feature.

## Private vs Public vs Elastic IP

Networking has two sorts of IPs: IPv4 and IPv6.

Example:
- IPv4: 1.160.10.240
    + What we're used to
    + Most common format used online
- IPv6: 3ffe: 1900:4545:3:200:f8ff:fe21:67cf
    + Much longer
    + Is newer and solves problems for the Internet of Things (IoT)

In this course, we'll mainly use IPv4.

So using public IPs, public servers can talk to each other. When we have a company and it has a private network, the private network has a private IP range, which has a very specific way of being defined. This basically means that all the computers within that private network can talk to each other using the private IP. Whereas, when you touch an internet gateway, which is a public gateway, these instances will also get access to other servers and so on.

Fundamental differences:

- Public IP:
    + The machine can be identified on the interest (WWW)
    + Must be unique across the whole web (no two machines can have the same public IP)
    + Can be geo-located easily
- Private IP:
    + The machine can only be identified on a private network only
    + The IP must be unique across the private network
    + BUT two different private networks can have the same IPs
    + Machines connect to WWW using a NAT + internet gateway (a proxy)
    + Only a specified range of IPs can be used as a private IP
- Elastic IPs
    + An elastic IP is a public IPv4 IP you own as long as you don't delete it
    + When you stop and then start an EC2 instance, it can change its public IP
    + If you need to have a fixed public IP, you need an elastic IP
    + You can attach it to one instance at a time
    + With an elastic IP address, you can mask the failure of an instance or software by rapidly remapping the address to another instance in your account
    + You can only have 5 elastic IPs in your account (can ask aws to increase)
    + Overall, try to avoid using this
        * Often reflects poor architectural decisions
        * Instead, use a random public IP and register a DNS name to it
        * Or, use a Load Balancer and don't use a public IP


By default, our EC2 machine comes with:
- A private IP for the internal AWS network
- A public IP for the WWW


When we ssh into our EC2 machines:
- We can't use a private IP because we are not in the same network
- We can only use the public IP

If our machine is stopped then started, *the public IP can change*.

To allocate an elastic ip, there is an elastic ip tab where you can do this.

## Install Apache on EC2

First, ssh into the instance. 
```
sudo su
```
will elevate our rights on the machine, making us the root account so that we can run any commands without problems. 

```
yum update -y
```
forces the machine to update itself.

Next, we install httpd:
```
yum install -y httpd.x86_64
```

To start the service:
```
systemctl start httpd.service
```

To ensure service remains enabled across reboots:
```
systemctl enable httpd.service
```

```
curl localhost:80
```
gets us this html page.

So we can actually access this webpage on our browser by going to `<ip address>:80` as the url *BUT* it's going to be blocked since our inbound rules only allow port 22 and yet the page is hosted on port 80. We have to open up port 80 to access it (type HTTP - 0.0.0.0/0).

Accessing the page will tell us that we can add content by creating files in `var/www/html`.
```
echo "hello world" > /var/www/html/index.html
```

## EC2 User Data

It is possible to bootstrap our instances using an *EC2 User Data script*. *Bootstrapping* means launching commands when a machine starts. The script is *only run once* at the instance *first start*.

So the EC2 user data has a very specific purpose: to automate boot tasks such as...
- Installing updates
- Installing software
- Downloading common files from the internet
- Anything you can think of, whatever you want

The EC2 User Data Script runs with the root user. Any command will have sudo rights. 

We want to make sure that this isntance has an Apache http server instaslled on it to display a simple web page. For this, we're going to write a user-data script, which will be executed at the first boot of the instance.

First, terminate the instance we previously created. Launch a new instance with Amazon Linux 2 AMI, t2.micro, step 3 advanced details - on User data we paste a script:
```
#!/bin/bash
# install httpd(Linux 2 version)
yum update -y
yum install -y httpd.servicex86_64
systemctl start httpd.service
systemctl enable httpd.service
echo "Hello world from $(hostname -f)" > /var/www/html/index.html
```
then for security group, select the existing security group we created earlier that allowed port 22 (ssh) and 80 (http). 

Launch, choose existing key pair (check box to say we have access), finally actually launch. 

If everything worked properly, we should be able to access the server over the web AND ssh into it. 

## EC2 Instance Launch Types

Overview:
- *On Demand Instances*: Short workload, predictable pricing
- *Reserved*: (Minimum 1 year)
    + *Reserved Instances*: Long workloads 
    + *Convertible Reserved Instances*: Long worklooads with flexibility
    + *Scheduled Reserved Instances*: E.g. every thursday between 3 - 6pm
- *Spot Instances*: Short workloads, for cheap, risk is can lose instances (less reliable)
- *Dedicated Instances*: No other customers will share your hardware
- *Dedicated Hosts*: Book an entire physical server, control instance placement

### On Demand
- Pay for what you use (billing per second, after the first minute)
- Has the highest cost but no upfront payment
- No long term commitment
- Recommended for short-term and un-interrupted workloads, where you can't predict how the application will behave
    + Great for elastic workloads

### Reserved Instances
- Because we know that we're going to need the instance for a long period of time, we can get up to 75% discount compared to on demand
- Pay upfront for what you use with long term commitment
- Reservation period can be 1 - 3 years
- Reserve a specific instance type
- Recommended for staedy state usage applications (think database)

#### Convertible Reserved Instances
- Can change the EC2 instance type
- Up to 54% discount

#### Scheduled Reserved Instances
- Launch within a time window you reserve
- When you require a fraction of day/week/month

#### Spot Instances
- Can get up to 90% discount compared to on demand
- But, these are instances that you can 'lose' at any point of time if your max price is less than the current spot price
- The MOST cost-efficient instance in aws
- Only useful for workloads that are resilient to failure
    + Batch jobs
    + Data analysis
    + Image processing
    + Anything that is possible to retry/resilient to failure
- *Not great for critical jobs or databases*
- Good combo: Reserved Instance for baseline + On-Demand & Spot for peaks

#### Dedicated Hosts
- Physical dedicated EC2 server for your use
- Full control of EC2 instance placement
- That gives you visibility into the underlying sockets/physical cores of the hardware
- Allocated for your account for a 3 year period reservation
- More expensive
- Useful for software that have complicated licensing model (BYOL - Bring Your Own License)
- Or for comapnies that have strong regulatory or compliance needs

#### Dedicated Instances
- Instances running on hardware that's dedicated to you
- May share hardware with other instances in the same account
- No control over instance placement (can move hardware after Stop/Start)

#### So Which Host is Right for Me?
Let's compare by using an analogy of picking the right hotel:

- *On Demand*: coming and staying in resort whenever we like, we pay the full price
-  *Reserved*: when you want to plan way ahead of time and stay for a while, we can get a good discount
-  *Spot*: the hotel allows people to bid for the empty rooms and the highest bidder keeps the rooms. You can get kicked out at any time
-  *Dedicated*: we book the entire building of the resort

All of the instance launch types are on the left with their own tabs.













































