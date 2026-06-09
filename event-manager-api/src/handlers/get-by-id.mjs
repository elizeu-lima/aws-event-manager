import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.EVENTS_TABLE;

export const getByIdHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getById only accepts GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const eventId = event.pathParameters.id;

    const data = await ddbDocClient.send(new GetCommand({
        TableName: tableName,
        Key: {
            eventId
        }
    }));

    if (!data.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Event not found' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data.Item)
    };
};