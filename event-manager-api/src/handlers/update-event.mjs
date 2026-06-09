import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.EVENTS_TABLE;

export const updateEventHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`updateEvent only accepts PUT method, you tried: ${event.httpMethod}`);
    }

    const eventId = event.pathParameters.id;
    const body = JSON.parse(event.body);

    const params = {
        TableName: tableName,
        Key: {
            eventId
        },
        UpdateExpression: `
            set title = :title,
                description = :description,
                #location = :location,
                #date = :date,
                updatedAt = :updatedAt
        `,
        ExpressionAttributeNames: {
            '#location': 'location',
            '#date': 'date'
        },
        ExpressionAttributeValues: {
            ':title': body.title,
            ':description': body.description,
            ':location': body.location,
            ':date': body.date,
            ':updatedAt': new Date().toISOString()
        },
        ReturnValues: 'ALL_NEW'
    };

    const data = await ddbDocClient.send(new UpdateCommand(params));

    return {
        statusCode: 200,
        body: JSON.stringify(data.Attributes)
    };
};