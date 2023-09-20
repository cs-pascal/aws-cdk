import * as lambda from 'aws-cdk-lib/aws-lambda'
import {Stack, App, StackProps, Duration} from 'aws-cdk-lib'
import {WebSocketApi, WebSocketStage} from "@aws-cdk/aws-apigatewayv2-alpha";
import {WebSocketLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

export class MyStack extends Stack{
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdaFunction = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.PYTHON_3_11,
            handler: "index.handler",
            code: lambda.Code.fromInline('print(hello World!)'),
            timeout: Duration.seconds(5)
        });

        const api = new WebSocketApi(this, 'WebSockedID', {
            connectRouteOptions: {integration: new WebSocketLambdaIntegration('ConnectIntegration', lambdaFunction)}

        })

        new WebSocketStage(this, 'WebSocketStage', {
            webSocketApi: api,
            stageName: 'workflow',
        });

    }

}

const app = new App();
new MyStack(app, 'MyStack')
