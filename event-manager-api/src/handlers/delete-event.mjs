import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.EVENTS_TABLE;

export const deleteEventHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`deleteEvent only accepts DELETE method, you tried: ${event.httpMethod}`);
    }

    const eventId = event.pathParameters.id;

    await ddbDocClient.send(new DeleteCommand({
        TableName: tableName,
        Key: { eventId }
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Event deleted successfully',
            eventId
        })
    };
};