import { WeaviateFilter } from '@langchain/weaviate';
import { SelfQueryResult, VectorMetadata } from './types';
export declare class WeaviateService {
    private client;
    private embeddings;
    constructor();
    embedText(text: string, metadata: VectorMetadata): Promise<{
        message: string;
        chunkCount: number;
    }>;
    searchText(query: string, userId: string, filter?: WeaviateFilter['where']): Promise<{
        text: string;
        metadata: Record<string, any>;
    }[]>;
    refineQuery(query: string, timezone: string): Promise<SelfQueryResult>;
    answerQuestion(query: string, userId: string, timezone: string): Promise<{
        answer: string;
        sources: {
            content: any;
            metadata: any;
        }[];
        filter: {
            operands?: any[];
            operator?: "And" | "Or" | "Equal" | "Like" | "NotEqual" | "GreaterThan" | "GreaterThanEqual" | "LessThan" | "LessThanEqual" | "WithinGeoRange" | "IsNull" | "ContainsAny" | "ContainsAll";
            path?: string[];
            valueInt?: number;
            valueNumber?: number;
            valueBoolean?: boolean;
            valueString?: string;
            valueText?: string;
            valueDate?: string;
            valueIntArray?: number[];
            valueNumberArray?: number[];
            valueBooleanArray?: boolean[];
            valueStringArray?: string[];
            valueTextArray?: string[];
            valueDateArray?: string[];
            valueGeoRange?: {
                geoCoordinates?: {
                    latitude?: number;
                    longitude?: number;
                };
                distance?: {
                    max?: number;
                };
            };
        };
    }>;
}
