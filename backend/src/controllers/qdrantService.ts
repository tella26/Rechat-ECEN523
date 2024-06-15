// qdrantService.ts

import axios from 'axios';

const BASE_URL = 'https://3e896b9c-ba11-4e74-a08c-ce131b46048f.us-east4-0.gcp.cloud.qdrant.io:6333';

export async function deleteAllPoints(apiKey: string, collectionName: string): Promise<void> {
    try {
        const pointIds = await getAllPoints(apiKey, collectionName);
        if (pointIds.length === 0) {
            console.log('No points to delete.');
            return;
        }

        const url = `${BASE_URL}/collections/${collectionName}/points/delete`;
        const headers = {
            'api-key': apiKey,
            'Content-Type': 'application/json',
        };
        const data = {
            points: pointIds,
        };

        await axios.post(url, data, { headers });

        console.log('All points deleted successfully.');
    } catch (error) {
        console.error('Failed to delete points:', (error as Error).message);
        throw error;
    }
}

async function getAllPoints(apiKey: string, collectionName: string): Promise<string[]> {
    const url = `${BASE_URL}/collections/${collectionName}/points/scroll`;
    const headers = {
        'api-key': apiKey,
        'Content-Type': 'application/json',
    };

    const response = await axios.post(url, {}, { headers });
    const points = response.data.result.points;
    const pointIds = points.map((point: any) => point.id);
    return pointIds;
}
