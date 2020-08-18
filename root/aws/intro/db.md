# Data Storage with DynamoDB

## What is DynamoDB?

It's a fully managed NoSQL database provided by AWS. We don't to care of provisioning any database services and NoSQL means that there are no relations in the DB. 

Why is NoSQL a great fir for serverless architectures? Because it's fully managed and we don't have to spin up any database servers. For relational databases, we *do* have to do that. 

The data format we have here are key-value pairs, and we don't have any schema. We'll still have an important implication (eg. id would be a field which has to be present in all data entries), but besides that, we're pretty free about which kind of data we store in one table. It's this transactional nature of NoSQL database which makes it interesting for large sets of data, because we have that flexibility.  

## How DynamoDB Organizes Data

When we create a table in DynamoDB, we're always required to have a partition key (eg user id), which can have as many attributes as we need, but the partition key is required. The partition key has to be unique, present on each item we add, and set by ourselves. 

Sometimes, just having one single attribute isn't really a good identifier. Instead, we might want to have a combination of two. DynamoDB gives us an alternative. Instead of using a partition key for the primary key, we can use a partition key **and** sort key as a primary key. 

## Using DynamoDB with Lambda

DynamoDB can be both a trigger and something lambda works with. 

It can be an event source where we configure lambda to rreact to changes in the db table so that if we add a new element, it triggers a lambda function. We can also access the db as a data repository from a lambda function. 

## Creating a Table

When creating a table, we have to set the partition key as either a string, number, or binary. For our app, we'll name this 'UserId'. 

Once we've created the table, we'll arrive at the table dashboard. 

The Items tab allows us to view and create items in this table. Metrics is obvious what it does. Alarms informs you when you reach your limits or whatever you set. Access Control controls who can access this data. Tags for cost control centre. 

## Creating and Scanning Items

When we create an item, we get this interface. We're prompted to enter a UserId string. We can append an item (like the rest of our properties such as height or age).

## Accessing via Lambda

So how do we access the db with lambda? AWS gives us a package to use all its services programatically - AWS SDK. Usually, we would need to install it, but since we're using lambda, it's not necessary. In lambda, the full SDK is provided in each function by default. 

Going back to lambda, we'll enter the following code:
```js
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
	region: 'us-east-2'
})
```

## Putting Items into the DB Table from Lambda

```js
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
	region: 'us-east-2'
})

exports.handler = (event, context, callback) => {
    const params = {
		Item: {
			"UserId": {
				S: "fds987dsff3"
			},
			"age": {
				N: "28"
			},
			"height": {
				N: "176"
			},
			"income": {
				N: "70000"
			}
		},
		TableName: "compare-yourself"
	}
	dynamodb.putItem(params, function(error, data) {
		if (error) {
			console.log(error)
			callback(error)
		} else {
			console.log(data)
			callback(null, data)
		}
	})
};
```
When we test this, we'll get an access denied error. We need to set permissions. 

Go to the IAMS service, under Roles, access our cy-store-data role. Right now, the only thing this role is allowed to do is log. We need to attach a new policy and select the DynamoDBFullAccess policy. 

Testing the lambda function again, we wont get the error anymore and will be able to see the the item added in the db. 

## Using API Gateway Request Data for Item Creation

Integration Request mapping template:
```js
#set($inputRoot = $input.path('$'))
{
  "age" : "$inputRoot.age",
  "height" : "$inputRoot.height",
  "income" : "$inputRoot.income"
}
```
Wrapping values in quotation marks so that they're transformed into strings.

Lambda:
```js
// ...
const params = {
	Item: {
		"UserId": {
			S: "user_" + Math.random()
		},
		"age": {
			N: event.age
		},
		"height": {
			N: event.height
		},
		"income": {
			N: event.income
		}
	},
	TableName: "compare-yourself"
}
// ...
```