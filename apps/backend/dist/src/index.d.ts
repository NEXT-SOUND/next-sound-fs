import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
interface WebSocketEventContext extends APIGatewayEventRequestContext {
    connectionId: string;
    domainName: string;
    stage: string;
}
interface WebSocketEvent extends APIGatewayProxyEvent {
    requestContext: WebSocketEventContext;
}
interface WebSocketAuthEvent extends APIGatewayProxyEvent {
    methodArn: string;
    headers: {
        Auth?: string;
    };
}
export declare const connect: APIGatewayProxyHandler;
export declare const disconnect: APIGatewayProxyHandler;
export declare const handlerSocket: (event: WebSocketEvent, _context: Context) => Promise<APIGatewayProxyResult>;
export declare const auth: (event: WebSocketAuthEvent, _context: Context) => Promise<{
    principalId: string;
    policyDocument: {
        Version: string;
        Statement: {
            Action: string;
            Effect: string;
            Resource: string;
        }[];
    };
}>;
export declare const handler: APIGatewayProxyHandler;
export {};
