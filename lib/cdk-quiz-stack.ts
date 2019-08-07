import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

export class CdkQuizStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });

        // VPC configuration could go here for specifying s public/private/isolated subnet
        // const vpc = new ec2.Vpc(this, 'MyVpc', {
        //     cidr: '10.0.0.0/21',
        //     subnetConfiguration: [
        //       {
        //         cidrMask: 24,
        //         name: 'Ingress',
        //         subnetType: ec2.SubnetType.PUBLIC,
        //       },
        //       {
        //         cidrMask: 24,
        //         name: 'Application',
        //         subnetType: ec2.SubnetType.PRIVATE,
        //       },
        //       {
        //         cidrMask: 28,
        //         name: 'Database',
        //         subnetType: ec2.SubnetType.ISOLATED,
        //       }
        //     ],
        //   });

        const cluster = new ecs.Cluster(this, 'Ec2Cluster', { vpc });
        
        cluster.addCapacity('DefaultAutoScalingGroup', {
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        });

        // create a task definition with CloudWatch Logs
        const logging = new ecs.AwsLogDriver({ streamPrefix: 'myapp' });

        const taskDef = new ecs.Ec2TaskDefinition(this, 'MyTaskDefinition');

        taskDef.addContainer('AppContainer', {
            image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
            memoryLimitMiB: 512,
            logging
        });

        // Instantiate ECS Service with just cluster and image
        new ecs.Ec2Service(this, 'Ec2Service', {
            cluster,
            taskDefinition: taskDef
        });
    }
}
