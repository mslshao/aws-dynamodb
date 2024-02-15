# AWS DynamoDB fanout to DynamoDB Streams and AWS Kinesis Data Streams

The CDK stack deploys a DynamoDB table with a DynamoDB Stream enabled, and a Kinesis Data Stream.

When new items are added to the DynamoDB table, the item-level changes in the table will be streamed to the Kinesis Data Stream.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [`npm` installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) (AWS CDK) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ``` 
    git clone https://github.com/mslshao/aws-dynamodb
    ```
2. Change directory to the pattern directory:
    ```
    cd aws-dynamodb/src
    ```
3. Install dependencies
    ```
    npm install
    ```
4. From the command line, use AWS CDK to bootstrap the AWS resources:
    ```
    cdk bootstrap
    ```
5. Now that you have bootstrapped the necessary resources, deploy the AWS resources for the pattern as specified in the template.yml file:
    ```
    cdk deploy
    ```
## How it works

When new items are added to the DynamoDB table, a payload with item-level changes will be streamed to two destinations:
1. the DynamoDB stream (enabled on creation of the DynamoDB table), and
2. the Kinesis Data Stream.

## Testing

After deployment, add an item to the DynamoDB table:
```
aws dynamodb put-item \
    --table-name Product \
    --item \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "1"}}'
```

Go to the CloudWatch Metrics for the deployed Kinesis Data Stream. You will see incoming record metrics for the item data.

## Cleanup
 
Run the given command to delete the resources that were created. It might take some time for the CloudFormation stack to get deleted
```
cdk destroy
```
----
Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0
