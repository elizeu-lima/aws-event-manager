import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.EVENTS_TABLE;

export const createEventHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`createEvent only accepts POST method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);

    const item = {
        eventId: body.eventId,
        title: body.title,
        description: body.description,
        location: body.location,
        date: body.date,
        createdAt: new Date().toISOString()
    };

    const params = {
        TableName: tableName,
        Item: item
    };

    await ddbDocClient.send(new PutCommand(params));

    const response = {
        statusCode: 201,
        body: JSON.stringify(item)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
};