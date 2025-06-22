"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose = __importStar(require("dynamoose"));
const fs = __importStar(require("fs"));
const glob = __importStar(require("glob-promise"));
const yaml = __importStar(require("js-yaml"));
const lodash_1 = require("lodash");
const path = __importStar(require("path"));
const args = process.argv.slice(2);
const matchPattern = args[1];
const outputFile = args[2];
const deletionPolicy = 'Delete';
const globalOptions = {
    throughput: 'ON_DEMAND',
    prefix: '${self:service}-${self:provider.stage}-',
    suffix: '-table',
};
async function main() {
    if (!matchPattern || !outputFile) {
        console.log('missing required arguments.');
        return;
    }
    const slsResources = { Resources: {} };
    try {
        const files = await glob.promise(matchPattern);
        console.log('Found schema files:', files);
        await Promise.all(files.map(async (file) => {
            console.log('Processing schema file:', file);
            const fileNameExt = file.split(/[\\\/]/).pop();
            const fileName = fileNameExt.split('.').shift();
            const tableName = (0, lodash_1.upperFirst)((0, lodash_1.camelCase)(fileName));
            try {
                const exports = await Promise.resolve(`${`.${path.sep}${file}`}`).then(s => __importStar(require(s)));
                const schema = Object.values(exports).shift();
                if (schema.constructor.name === 'Schema') {
                    const model = dynamoose.model(fileName, schema, globalOptions);
                    slsResources.Resources[`${tableName}Table`] = {
                        Type: 'AWS::DynamoDB::Table',
                        DeletionPolicy: deletionPolicy,
                        Properties: await model.table().create({ return: 'request' }),
                    };
                    console.log(`Successfully processed schema for ${tableName}Table`);
                }
                else {
                    console.warn(`Skipping ${file}: Not a valid Schema class`);
                }
            }
            catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }));
        const yamlResources = yaml.dump(slsResources);
        const outputPath = outputFile.split(/[\\\/]/);
        if (outputPath.length > 1) {
            await fs.promises.mkdir(outputPath.slice(0, outputPath.length - 1).join(path.sep), { recursive: true });
        }
        await fs.promises.writeFile(outputFile, yamlResources);
        console.log(`Serverless resources file generated at ${outputFile}`);
        console.log('Generated tables:', Object.keys(slsResources.Resources));
    }
    catch (error) {
        console.error('Error in main process:', error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
//# sourceMappingURL=genres.js.map