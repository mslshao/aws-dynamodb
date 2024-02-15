import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, StreamViewType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Stream } from 'aws-cdk-lib/aws-kinesis';
import * as iam from 'aws-cdk-lib/aws-iam'

export class DynamodbKinesisCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Kinesis Data Stream
    const stream = new Stream(this, "KinesisStream", {
      streamName: "kinesis-stream",
      shardCount: 1,
    });

    // DynamoDB table
    const dynamoTable = new Table(this, 'DynamoTable', {
      partitionKey: {name:'id', type: AttributeType.STRING},
      kinesisStream: stream,
      readCapacity: 5,
      writeCapacity: 5,
      stream: StreamViewType.NEW_AND_OLD_IMAGES // Enable DynamoDB Streams
    });

  }
}
