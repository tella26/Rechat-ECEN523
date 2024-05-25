/* eslint-disable turbo/no-undeclared-env-vars */
import * as dotenv from "dotenv";
import { VectorStoreIndex, storageContextFromDefaults } from "llamaindex";
import { QdrantVectorStore } from "llamaindex/storage/vectorStore/QdrantVectorStore";
import { getDocuments } from "./loader";
import { initSettings } from "./settings";
import { checkRequiredEnvVars, getQdrantClient } from "./shared";

dotenv.config();

const collectionName = process.env.QDRANT_COLLECTION;

async function loadAndIndex() {
  // Load objects from storage and convert them into LlamaIndex Document objects
  const documents = await getDocuments();

  // Connect to Qdrant
  const client = getQdrantClient();
  const vectorStore = new QdrantVectorStore({
    collectionName,
    client,
  });

  
  // Function to get all point IDs
  async function getAllPointIds(offset = 0, allPointIds = []): Promise<any[]> {
    const pointsResponse = await client.scroll(collectionName, {
      limit: 1000,  // Adjust limit based on your collection size
      offset,
      with_payload: false,
      with_vector: false,
    });

    if (!pointsResponse || !pointsResponse.points) {
      console.error("Unexpected response format:", pointsResponse);
      throw new Error("Failed to fetch points");
    }

    const pointIds = pointsResponse.points.map(point => point.id);
    allPointIds = allPointIds.concat(pointIds);

    if (pointsResponse.next_page_offset !== undefined) {
      return getAllPointIds(pointsResponse.next_page_offset, allPointIds);
    }

    console.log(`All points in collection: ${allPointIds}`);
    return allPointIds;
  }


  // Delete all points in the collection
 /*  try {
    const pointIds = await getAllPointIds();
    
    if (pointIds.length > 0) {
      await client.deleteVectors(collectionName, {
        points: pointIds,
        vectors: ["text"],  // Adjust this based on your vector names
      });
      console.log(`Successfully deleted all points in collection ${collectionName}.`);
    } else {
      console.log(`No points to delete in collection ${collectionName}.`);
    }
  } catch (error) {
    console.error(`Failed to delete points in collection ${collectionName}:`, error);
    throw error;
  }
  */

  const storageContext = await storageContextFromDefaults({ vectorStore });
  await VectorStoreIndex.fromDocuments(documents, {
    storageContext: storageContext,
  });
  console.log(
    `Successfully uploaded embeddings to Qdrant collection ${collectionName}.`,
  );
}

(async () => {
  checkRequiredEnvVars();
  initSettings();
  await loadAndIndex();
  console.log("Finished generating storage.");
})();
