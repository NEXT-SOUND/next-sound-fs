import { WeaviateFilter } from '@langchain/weaviate';
export declare function transformDateFilters(node: WeaviateFilter['where'], timezone: string): WeaviateFilter['where'];
