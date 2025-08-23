import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { YCDataService } from './services/yc.js';
import {
    searchCompaniesToolDefinition,
    getCompanyToolDefinition,
    getCompaniesByBatchToolDefinition,
    getCompaniesByIndustryToolDefinition,
    getCompaniesByStatusToolDefinition,
    getCompaniesByStageToolDefinition,
    getCompaniesByRegionToolDefinition,
    getCompaniesByTagToolDefinition,
    getHiringCompaniesToolDefinition,
    getTopCompaniesToolDefinition,
    getCompanyStatsToolDefinition,
    getAllCompaniesToolDefinition,
    handleSearchCompaniesTool,
    handleGetCompanyTool,
    handleGetCompaniesByBatchTool,
    handleGetCompaniesByIndustryTool,
    handleGetCompaniesByStatusTool,
    handleGetCompaniesByStageTool,
    handleGetCompaniesByRegionTool,
    handleGetCompaniesByTagTool,
    handleGetHiringCompaniesTool,
    handleGetTopCompaniesTool,
    handleGetCompanyStatsTool,
    handleGetAllCompaniesTool
} from './tools/index.js'

/**
 * Main server class for YC Lists MCP integration
 * @class YCListServer
 */
export class YCListServer {
    private dataService: YCDataService;
    private server: Server;

    /**
     * Creates a new YCListServer instance
     */
    constructor() {
        this.dataService = new YCDataService();
        this.server = new Server(
            {
                name: 'yc-lists',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupHandlers();
        this.setupErrorHandling();
    }

    /**
     * Sets up MCP request handlers for tools
     * @private
     */
    private setupHandlers(): void {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                searchCompaniesToolDefinition,
                getCompanyToolDefinition,
                getCompaniesByBatchToolDefinition,
                getCompaniesByIndustryToolDefinition,
                getCompaniesByStatusToolDefinition,
                getCompaniesByStageToolDefinition,
                getCompaniesByRegionToolDefinition,
                getCompaniesByTagToolDefinition,
                getHiringCompaniesToolDefinition,
                getTopCompaniesToolDefinition,
                getCompanyStatsToolDefinition,
                getAllCompaniesToolDefinition
            ],
        }));

        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            switch (name) {
                case 'yc_search_companies':
                    return handleSearchCompaniesTool(this.dataService, args);
                
                case 'yc_get_company':
                    return handleGetCompanyTool(this.dataService, args);
                
                case 'yc_get_companies_by_batch':
                    return handleGetCompaniesByBatchTool(this.dataService, args);
                
                case 'yc_get_companies_by_industry':
                    return handleGetCompaniesByIndustryTool(this.dataService, args);
                
                case 'yc_get_companies_by_status':
                    return handleGetCompaniesByStatusTool(this.dataService, args);
                
                case 'yc_get_companies_by_stage':
                    return handleGetCompaniesByStageTool(this.dataService, args);
                
                case 'yc_get_companies_by_region':
                    return handleGetCompaniesByRegionTool(this.dataService, args);
                
                case 'yc_get_companies_by_tag':
                    return handleGetCompaniesByTagTool(this.dataService, args);
                
                case 'yc_get_hiring_companies':
                    return handleGetHiringCompaniesTool(this.dataService, args);
                
                case 'yc_get_top_companies':
                    return handleGetTopCompaniesTool(this.dataService, args);
                
                case 'yc_get_company_stats':
                    return handleGetCompanyStatsTool(this.dataService, args);
                
                case 'yc_get_all_companies':
                    return handleGetAllCompaniesTool(this.dataService, args);
                
                default:
                    throw new McpError(
                        ErrorCode.MethodNotFound,
                        `Unknown tool: ${name}`
                    );
            }
        });
    }

    /**
     * Configures error handling and graceful shutdown
     * @private
     */
    private setupErrorHandling(): void {
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    /**
     * Returns the underlying MCP server instance
     * @returns {Server} MCP server instance
     */
    getServer(): Server {
        return this.server;
    }

    /**
     * Returns the data service instance
     * @returns {YCDataService} Data service instance
     */
    getDataService(): YCDataService {
        return this.dataService;
    }
}

/**
 * Factory function for creating standalone server instances
 * Used by HTTP transport for session-based connections
 * @returns {Server} Configured MCP server instance
 */
export function createStandaloneServer(): Server {
    const server = new Server(
        {
            name: "yc-lists-discovery",
            version: "1.0.0",
        },
        {
            capabilities: {
                tools: {},
            },
        },
    );

    const dataService = new YCDataService();

    // Set up handlers
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [
            searchCompaniesToolDefinition,
            getCompanyToolDefinition,
            getCompaniesByBatchToolDefinition,
            getCompaniesByIndustryToolDefinition,
            getCompaniesByStatusToolDefinition,
            getCompaniesByStageToolDefinition,
            getCompaniesByRegionToolDefinition,
            getCompaniesByTagToolDefinition,
            getHiringCompaniesToolDefinition,
            getTopCompaniesToolDefinition,
            getCompanyStatsToolDefinition,
            getAllCompaniesToolDefinition
        ],
    }));

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;

        switch (name) {
            case 'yc_search_companies':
                return handleSearchCompaniesTool(dataService, args);
            
            case 'yc_get_company':
                return handleGetCompanyTool(dataService, args);
            
            case 'yc_get_companies_by_batch':
                return handleGetCompaniesByBatchTool(dataService, args);
            
            case 'yc_get_companies_by_industry':
                return handleGetCompaniesByIndustryTool(dataService, args);
            
            case 'yc_get_companies_by_status':
                return handleGetCompaniesByStatusTool(dataService, args);
            
            case 'yc_get_companies_by_stage':
                return handleGetCompaniesByStageTool(dataService, args);
            
            case 'yc_get_companies_by_region':
                return handleGetCompaniesByRegionTool(dataService, args);
            
            case 'yc_get_companies_by_tag':
                return handleGetCompaniesByTagTool(dataService, args);
            
            case 'yc_get_hiring_companies':
                return handleGetHiringCompaniesTool(dataService, args);
            
            case 'yc_get_top_companies':
                return handleGetTopCompaniesTool(dataService, args);
            
            case 'yc_get_company_stats':
                return handleGetCompanyStatsTool(dataService, args);
            
            case 'yc_get_all_companies':
                return handleGetAllCompaniesTool(dataService, args);
            
            default:
                throw new McpError(
                    ErrorCode.MethodNotFound,
                    `Unknown tool: ${name}`
                );
        }
    });

    return server;
}
