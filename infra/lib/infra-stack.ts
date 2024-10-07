import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3 } from "./constructs/S3";
import { Route53 } from "./constructs/Route53";

export class InfraStack extends cdk.Stack {
  public readonly s3: S3;

  public readonly route53: Route53;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.route53 = new Route53(this, "Route53");

    this.s3 = new S3(this, "S3", {
      route53: this.route53,
    });
  }
}
