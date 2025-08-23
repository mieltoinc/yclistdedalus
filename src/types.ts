/**
 * Type definitions for YC Lists MCP integration
 */

/**
 * YC Company data structure
 */
export interface YCCompany {
    id: number;
    name: string;
    slug: string;
    former_names: string[];
    small_logo_thumb_url?: string;
    website?: string;
    all_locations?: string;
    long_description?: string;
    one_liner?: string;
    team_size?: number;
    industry?: string;
    subindustry?: string;
    launched_at?: number;
    tags: string[];
    tags_highlighted: string[];
    top_company: boolean;
    isHiring: boolean;
    nonprofit: boolean;
    batch?: string;
    status?: string;
    industries: string[];
    regions: string[];
    stage?: string;
    app_video_public: boolean;
    demo_day_video_public: boolean;
    app_answers?: any;
    question_answers: boolean;
    objectID: string;
    _highlightResult?: any;
}

/**
 * Company status options
 */
export type CompanyStatus = 'Public' | 'Private' | 'Acquired' | 'Dead' | 'IPO' | 'Merged';

/**
 * Company stage options
 */
export type CompanyStage = 'Idea' | 'Early' | 'Growth' | 'Scale' | 'Mature';

/**
 * Industry categories
 */
export type Industry = 'Consumer' | 'Fintech' | 'Enterprise' | 'Healthcare' | 'Industrials' | 'AI/ML' | 'Developer Tools' | 'Education' | 'Real Estate' | 'Transportation' | 'Other';

/**
 * Search and filter options
 */
export interface CompanySearchFilters {
    name?: string;
    industry?: Industry | string;
    stage?: CompanyStage | string;
    status?: CompanyStatus | string;
    batch?: string;
    minTeamSize?: number;
    maxTeamSize?: number;
    tags?: string[];
    regions?: string[];
    isHiring?: boolean;
    topCompany?: boolean;
    nonprofit?: boolean;
    launchedAfter?: number;
    launchedBefore?: number;
}

/**
 * Company list response
 */
export interface CompanyListResponse {
    companies: YCCompany[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

/**
 * Company detail response
 */
export interface CompanyDetailResponse {
    company: YCCompany;
    relatedCompanies?: YCCompany[];
}

/**
 * Search query arguments
 */
export interface SearchCompaniesArgs {
    query?: string;
    filters?: CompanySearchFilters;
    page?: number;
    pageSize?: number;
    sortBy?: 'name' | 'team_size' | 'launched_at' | 'batch';
    sortOrder?: 'asc' | 'desc';
}

/**
 * Get company by ID arguments
 */
export interface GetCompanyArgs {
    companyId: string | number;
}

/**
 * Get companies by batch arguments
 */
export interface GetCompaniesByBatchArgs {
    batch: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get companies by industry arguments
 */
export interface GetCompaniesByIndustryArgs {
    industry: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get companies by status arguments
 */
export interface GetCompaniesByStatusArgs {
    status: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get companies by stage arguments
 */
export interface GetCompaniesByStageArgs {
    stage: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get companies by region arguments
 */
export interface GetCompaniesByRegionArgs {
    region: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get companies by tag arguments
 */
export interface GetCompaniesByTagArgs {
    tag: string;
    page?: number;
    pageSize?: number;
}

/**
 * Get hiring companies arguments
 */
export interface GetHiringCompaniesArgs {
    page?: number;
    pageSize?: number;
}

/**
 * Get top companies arguments
 */
export interface GetTopCompaniesArgs {
    page?: number;
    pageSize?: number;
}

/**
 * Get company statistics arguments
 */
export interface GetCompanyStatsArgs {
    industry?: string;
    stage?: string;
    status?: string;
    batch?: string;
}

/**
 * Company statistics response
 */
export interface CompanyStatsResponse {
    totalCompanies: number;
    byStatus: Record<string, number>;
    byIndustry: Record<string, number>;
    byStage: Record<string, number>;
    byBatch: Record<string, number>;
    averageTeamSize: number;
    hiringCompanies: number;
    topCompanies: number;
    publicCompanies: number;
    acquiredCompanies: number;
}
