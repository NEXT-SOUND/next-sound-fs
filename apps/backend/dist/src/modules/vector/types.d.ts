import { WeaviateFilter } from '@langchain/weaviate';
export type VectorMetadata = {
    timestamp: number;
    title: string;
    tags?: string[];
    userId: string;
};
export type SelfQueryResult = {
    query: string;
    filter: WeaviateFilter['where'];
};
