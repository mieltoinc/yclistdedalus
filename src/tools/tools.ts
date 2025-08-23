import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { YCDataService } from '../services/yc.js';
import {
    SearchCompaniesArgs,
    GetCompanyArgs,
    GetCompaniesByBatchArgs,
    GetCompaniesByIndustryArgs,
    GetCompaniesByStatusArgs,
    GetCompaniesByStageArgs,
    GetCompaniesByRegionArgs,
    GetCompaniesByTagArgs,
    GetHiringCompaniesArgs,
    GetTopCompaniesArgs,
    GetCompanyStatsArgs
} from '../types.js';

/**
 * Tool definition for searching companies
 */
export const searchCompaniesToolDefinition: Tool = {
    name: "yc_search_companies",
    description: "Search and filter YC companies with advanced querying, filtering, and sorting capabilities. Examples: Find AI companies hiring in San Francisco, search for fintech startups with 100+ employees, get consumer companies from Summer 2013 batch.",
    inputSchema: {
        type: "object",
        properties: {
            query: {
                type: "string",
                description: "Text search query for company name, description, website, location, tags, or industries. Examples: 'AI', 'delivery', 'San Francisco', 'fintech', 'marketplace'"
            },
            filters: {
                type: "object",
                properties: {
                    industry: { type: "string", description: "Filter by industry (e.g., 'Consumer', 'Fintech', 'Enterprise', 'AI/ML', 'Healthcare', 'Industrials')" },
                    stage: { type: "string", description: "Filter by company stage (e.g., 'Idea', 'Early', 'Growth', 'Scale', 'Mature')" },
                    status: { type: "string", description: "Filter by company status (e.g., 'Public', 'Private', 'Acquired', 'Dead', 'IPO', 'Merged')" },
                    batch: { type: "string", description: "Filter by YC batch (e.g., 'Summer 2013', 'Winter 2009', 'Summer 2012', 'Winter 2014')" },
                    minTeamSize: { type: "number", description: "Minimum team size filter (e.g., 10, 50, 100)" },
                    maxTeamSize: { type: "number", description: "Maximum team size filter (e.g., 100, 500, 1000)" },
                    tags: { type: "array", items: { type: "string" }, description: "Filter by tags (e.g., ['AI/ML', 'Marketplace'], ['E-commerce', 'B2B'])" },
                    regions: { type: "array", items: { type: "string" }, description: "Filter by regions (e.g., ['San Francisco', 'New York'], ['United States', 'Europe'])" },
                    isHiring: { type: "boolean", description: "Filter by hiring status" },
                    topCompany: { type: "boolean", description: "Filter by top company status" },
                    nonprofit: { type: "boolean", description: "Filter by nonprofit status" },
                    launchedAfter: { type: "number", description: "Filter by launch date (Unix timestamp) after this date (e.g., 1262304000 for 2010, 1420070400 for 2015)" },
                    launchedBefore: { type: "number", description: "Filter by launch date (Unix timestamp) before this date (e.g., 1577836800 for 2020, 1640995200 for 2022)" }
                }
            },
            page: {
                type: "number",
                description: "Page number for pagination (e.g., 1 for first page, 2 for second page)",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page (e.g., 10, 25, 50, 100)",
                default: 50
            },
            sortBy: {
                type: "string",
                enum: ["name", "team_size", "launched_at", "batch"],
                description: "Field to sort by (e.g., 'name' for alphabetical, 'team_size' for company size, 'launched_at' for founding date, 'batch' for YC batch)"
            },
            sortOrder: {
                type: "string",
                enum: ["asc", "desc"],
                default: "asc",
                description: "Sort order ('asc' for ascending, 'desc' for descending)"
            }
        }
    }
};

/**
 * Tool definition for getting company by ID
 */
export const getCompanyToolDefinition: Tool = {
    name: "yc_get_company",
    description: "Get detailed information about a specific YC company by ID. Examples: Get details for DoorDash (ID: 531), find information about Coinbase, retrieve Airbnb company profile.",
    inputSchema: {
        type: "object",
        properties: {
            companyId: {
                type: "string",
                description: "Company ID to retrieve (e.g., '531' for DoorDash, '123' for Coinbase, '456' for Airbnb)"
            }
        },
        required: ["companyId"]
    }
};

/**
 * Tool definition for getting companies by batch
 */
export const getCompaniesByBatchToolDefinition: Tool = {
    name: "yc_get_companies_by_batch",
    description: "Get all companies from a specific YC batch (e.g., 'Summer 2013', 'Winter 2009'). Examples: Find all companies from Summer 2013 (DoorDash, Coinbase), get Winter 2009 batch (Airbnb), explore Summer 2012 companies (Instacart).",
    inputSchema: {
        type: "object",
        properties: {
            batch: {
                type: "string",
                description: "YC batch name (e.g., 'Summer 2013', 'Winter 2009', 'Summer 2012', 'Winter 2014', 'Summer 2015')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["batch"]
    }
};

/**
 * Tool definition for getting companies by industry
 */
export const getCompaniesByIndustryToolDefinition: Tool = {
    name: "yc_get_companies_by_industry",
    description: "Get all companies in a specific industry (e.g., 'Consumer', 'Fintech', 'Enterprise'). Examples: Find all Consumer companies (DoorDash, Airbnb, Instacart), get Fintech startups (Coinbase, Stripe), explore Enterprise SaaS companies.",
    inputSchema: {
        type: "object",
        properties: {
            industry: {
                type: "string",
                description: "Industry name (e.g., 'Consumer', 'Fintech', 'Enterprise', 'AI/ML', 'Healthcare', 'Industrials', 'Developer Tools', 'Education')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["industry"]
    }
};

/**
 * Tool definition for getting companies by status
 */
export const getCompaniesByStatusToolDefinition: Tool = {
    name: "yc_get_companies_by_status",
    description: "Get all companies with a specific status (e.g., 'Public', 'Private', 'Acquired', 'Dead'). Examples: Find all Public companies (DoorDash, Coinbase, Airbnb), get Private startups, discover Acquired companies, identify Dead/defunct startups.",
    inputSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                description: "Company status (e.g., 'Public', 'Private', 'Acquired', 'Dead', 'IPO', 'Merged', 'Bankrupt')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["status"]
    }
};

/**
 * Tool definition for getting companies by stage
 */
export const getCompaniesByStageToolDefinition: Tool = {
    name: "yc_get_companies_by_stage",
    description: "Get all companies at a specific stage (e.g., 'Idea', 'Early', 'Growth', 'Scale'). Examples: Find Idea-stage startups, get Early-stage companies (pre-seed/seed), explore Growth-stage startups (Series A/B), discover Scale-stage companies (Series C+).",
    inputSchema: {
        type: "object",
        properties: {
            stage: {
                type: "string",
                description: "Company stage (e.g., 'Idea', 'Early', 'Growth', 'Scale', 'Mature', 'Seed', 'Series A', 'Series B')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["stage"]
    }
};

/**
 * Tool definition for getting companies by region
 */
export const getCompaniesByRegionToolDefinition: Tool = {
    name: "yc_get_companies_by_region",
    description: "Get all companies in a specific region or location. Examples: Find companies in San Francisco (DoorDash, Airbnb, Coinbase), get startups in New York, explore companies in Europe, discover startups in Asia.",
    inputSchema: {
        type: "object",
        properties: {
            region: {
                type: "string",
                description: "Region or location (e.g., 'San Francisco', 'New York', 'United States', 'Europe', 'Asia', 'Canada', 'London', 'Berlin')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["region"]
    }
};

/**
 * Tool definition for getting companies by tag
 */
export const getCompaniesByTagToolDefinition: Tool = {
    name: "yc_get_companies_by_tag",
    description: "Get all companies with a specific tag (e.g., 'AI/ML', 'Marketplace', 'E-commerce'). Examples: Find AI/ML companies, get Marketplace startups (Airbnb, DoorDash), explore E-commerce companies, discover Blockchain/Crypto startups.",
    inputSchema: {
        type: "object",
        properties: {
            tag: {
                type: "string",
                description: "Tag name (e.g., 'AI/ML', 'Marketplace', 'E-commerce', 'B2B', 'B2C', 'Mobile', 'Web', 'Blockchain', 'SaaS', 'API')"
            },
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        },
        required: ["tag"]
    }
};

/**
 * Tool definition for getting hiring companies
 */
export const getHiringCompaniesToolDefinition: Tool = {
    name: "yc_get_hiring_companies",
    description: "Get all YC companies that are currently hiring. Examples: Find companies actively recruiting engineers, discover startups hiring for sales/marketing roles, explore companies with open product positions, get hiring companies by location or industry.",
    inputSchema: {
        type: "object",
        properties: {
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        }
    }
};

/**
 * Tool definition for getting top companies
 */
export const getTopCompaniesToolDefinition: Tool = {
    name: "yc_get_top_companies",
    description: "Get all YC companies marked as top companies. Examples: Find YC's most successful startups, discover unicorn companies, explore companies with exceptional growth, get top companies by industry or batch.",
    inputSchema: {
        type: "object",
        properties: {
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        }
    }
};

/**
 * Tool definition for getting company statistics
 */
export const getCompanyStatsToolDefinition: Tool = {
    name: "yc_get_company_stats",
    description: "Get comprehensive statistics about YC companies with optional filtering. Examples: Get overall YC ecosystem stats, find industry breakdowns, analyze company stages distribution, compare batch performance, discover hiring trends across industries.",
    inputSchema: {
        type: "object",
        properties: {
            industry: {
                type: "string",
                description: "Filter statistics by industry"
            },
            stage: {
                type: "string",
                description: "Filter statistics by company stage"
            },
            status: {
                type: "string",
                description: "Filter statistics by company status"
            },
            batch: {
                type: "string",
                description: "Filter statistics by YC batch"
            }
        }
    }
};

/**
 * Tool definition for getting all companies
 */
export const getAllCompaniesToolDefinition: Tool = {
    name: "yc_get_all_companies",
    description: "Get all YC companies with pagination support. Examples: Browse all 1000+ YC companies, explore companies page by page, get comprehensive company listings, discover new startups across all industries and batches.",
    inputSchema: {
        type: "object",
        properties: {
            page: {
                type: "number",
                description: "Page number for pagination",
                default: 1
            },
            pageSize: {
                type: "number",
                description: "Number of results per page",
                default: 50
            }
        }
    }
};

/**
 * Type guards for tool arguments
 */
function isSearchCompaniesArgs(args: unknown): args is SearchCompaniesArgs {
    return typeof args === "object" && args !== null;
}

function isGetCompanyArgs(args: unknown): args is GetCompanyArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "companyId" in args &&
        typeof (args as GetCompanyArgs).companyId === "string"
    );
}

function isGetCompaniesByBatchArgs(args: unknown): args is GetCompaniesByBatchArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "batch" in args &&
        typeof (args as GetCompaniesByBatchArgs).batch === "string"
    );
}

function isGetCompaniesByIndustryArgs(args: unknown): args is GetCompaniesByIndustryArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "industry" in args &&
        typeof (args as GetCompaniesByIndustryArgs).industry === "string"
    );
}

function isGetCompaniesByStatusArgs(args: unknown): args is GetCompaniesByStatusArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "status" in args &&
        typeof (args as GetCompaniesByStatusArgs).status === "string"
    );
}

function isGetCompaniesByStageArgs(args: unknown): args is GetCompaniesByStageArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "stage" in args &&
        typeof (args as GetCompaniesByStageArgs).stage === "string"
    );
}

function isGetCompaniesByRegionArgs(args: unknown): args is GetCompaniesByRegionArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "region" in args &&
        typeof (args as GetCompaniesByRegionArgs).region === "string"
    );
}

function isGetCompaniesByTagArgs(args: unknown): args is GetCompaniesByTagArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "tag" in args &&
        typeof (args as GetCompaniesByTagArgs).tag === "string"
    );
}

/**
 * Helper function to format company information for display
 */
function formatCompanyInfo(company: any): string {
    const info = [
        `**${company.name}**`,
        company.one_liner ? `*${company.one_liner}*` : '',
        company.website ? `Website: ${company.website}` : '',
        company.all_locations ? `Location: ${company.all_locations}` : '',
        company.industry ? `Industry: ${company.industry}` : '',
        company.stage ? `Stage: ${company.stage}` : '',
        company.status ? `Status: ${company.status}` : '',
        company.batch ? `YC Batch: ${company.batch}` : '',
        company.team_size ? `Team Size: ${company.team_size}` : '',
        company.tags && company.tags.length > 0 ? `Tags: ${company.tags.join(', ')}` : '',
        company.isHiring ? '🟢 **Currently Hiring**' : '',
        company.top_company ? '⭐ **Top Company**' : '',
        company.nonprofit ? '🏛️ **Nonprofit**' : ''
    ].filter(Boolean).join('\n');

    return info;
}

/**
 * Helper function to format company list response
 */
function formatCompanyListResponse(response: any, title: string): string {
    if (response.companies.length === 0) {
        return `No companies found for: ${title}`;
    }

    const companyList = response.companies.map((company: any, index: number) => {
        const number = response.page > 1 ? (response.page - 1) * response.pageSize + index + 1 : index + 1;
        return `${number}. ${formatCompanyInfo(company)}`;
    }).join('\n\n');

    const paginationInfo = `\n\n---\nPage ${response.page} of ${Math.ceil(response.total / response.pageSize)} | Total: ${response.total} companies`;
    const hasMoreInfo = response.hasMore ? '\n*Use pagination to see more results*' : '';

    return `${title}\n\n${companyList}${paginationInfo}${hasMoreInfo}`;
}

/**
 * Tool handlers
 */
export async function handleSearchCompaniesTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isSearchCompaniesArgs(args)) {
            throw new Error("Invalid arguments for yc_search_companies");
        }

        const response = dataService.searchCompanies(args);
        
        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompanyTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompanyArgs(args)) {
            throw new Error("Invalid arguments for yc_get_company");
        }

        const company = dataService.getCompanyById(args.companyId);
        if (!company) {
            return {
                content: [{ type: "text", text: `Company with ID ${args.companyId} not found.` }],
                isError: false,
            };
        }

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(company, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByBatchTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByBatchArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_batch");
        }

        const response = dataService.getCompaniesByBatch(args.batch, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByIndustryTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByIndustryArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_industry");
        }

        const response = dataService.getCompaniesByIndustry(args.industry, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByStatusTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByStatusArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_status");
        }

        const response = dataService.getCompaniesByStatus(args.status, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByStageTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByStageArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_stage");
        }

        const response = dataService.getCompaniesByStage(args.stage, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByRegionTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByRegionArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_region");
        }

        const response = dataService.getCompaniesByRegion(args.region, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompaniesByTagTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isGetCompaniesByTagArgs(args)) {
            throw new Error("Invalid arguments for yc_get_companies_by_tag");
        }

        const response = dataService.getCompaniesByTag(args.tag, args.page, args.pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetHiringCompaniesTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        const page = (args as any)?.page || 1;
        const pageSize = (args as any)?.pageSize || 50;

        const response = dataService.getHiringCompanies(page, pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetTopCompaniesTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        const page = (args as any)?.page || 1;
        const pageSize = (args as any)?.pageSize || 50;

        const response = dataService.getTopCompanies(page, pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetCompanyStatsTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        const filters = args as GetCompanyStatsArgs;
        const stats = dataService.getCompanyStats(filters);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(stats, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}

export async function handleGetAllCompaniesTool(dataService: YCDataService, args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        const page = (args as any)?.page || 1;
        const pageSize = (args as any)?.pageSize || 50;

        const response = dataService.getAllCompanies(page, pageSize);

        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(response, null, 2)
            }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
}
