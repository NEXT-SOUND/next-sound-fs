import { VectorInputEmbed, VectorInputFind } from './vector-input';
import { WeaviateService } from './vector.service';
export declare class VectorController {
    private readonly vectorService;
    constructor(vectorService: WeaviateService);
    embedText(body: VectorInputEmbed, timezone: string): Promise<{
        message: string;
        chunkCount: number;
    }>;
    searchText(body: VectorInputFind): Promise<{
        text: string;
        metadata: Record<string, any>;
    }[]>;
    askQuestion(body: VectorInputFind, timezone: string): Promise<{
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
