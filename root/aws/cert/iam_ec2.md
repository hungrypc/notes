# AWS Fundamentals: IAM + EC2

## IAM Intro

> IAM: Identity and Access Management

The whole of AWS security is here:
- Users
- Groups
- Roles

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










































