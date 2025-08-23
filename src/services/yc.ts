import { readFileSync } from 'fs';
import { join } from 'path';
import { 
    YCCompany, 
    CompanySearchFilters, 
    CompanyListResponse, 
    CompanyStatsResponse,
    SearchCompaniesArgs 
} from '../types.js';

/**
 * Service for managing YC company data
 */
export class YCDataService {
    private companies: YCCompany[] = [];
    private dataLoaded = false;

    constructor() {
        this.loadData();
    }

    /**
     * Load YC company data from JSON file
     */
    private loadData(): void {
        try {
            const dataPath = join(process.cwd(), 'data', 'yc.json');
            const rawData = readFileSync(dataPath, 'utf8');
            const parsedData = JSON.parse(rawData);
            this.companies = parsedData.companies || [];
            this.dataLoaded = true;
            console.log(`Loaded ${this.companies.length} companies from YC data`);
        } catch (error) {
            console.error('Error loading YC data:', error);
            this.companies = [];
        }
    }

    /**
     * Get all companies with pagination
     */
    public getAllCompanies(page: number = 1, pageSize: number = 50): CompanyListResponse {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = this.companies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: this.companies.length,
            page,
            pageSize,
            hasMore: endIndex < this.companies.length
        };
    }

    /**
     * Search companies with filters and pagination
     */
    public searchCompanies(args: SearchCompaniesArgs): CompanyListResponse {
        const { query, filters, page = 1, pageSize = 50, sortBy, sortOrder = 'asc' } = args;
        
        let filteredCompanies = [...this.companies];

        // Apply text search if query provided
        if (query) {
            const searchTerm = query.toLowerCase();
            filteredCompanies = filteredCompanies.filter(company => 
                company.name.toLowerCase().includes(searchTerm) ||
                company.one_liner?.toLowerCase().includes(searchTerm) ||
                company.long_description?.toLowerCase().includes(searchTerm) ||
                company.website?.toLowerCase().includes(searchTerm) ||
                company.all_locations?.toLowerCase().includes(searchTerm) ||
                company.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                company.industries.some(industry => industry.toLowerCase().includes(searchTerm))
            );
        }

        // Apply filters
        if (filters) {
            filteredCompanies = this.applyFilters(filteredCompanies, filters);
        }

        // Apply sorting
        if (sortBy) {
            filteredCompanies = this.sortCompanies(filteredCompanies, sortBy, sortOrder);
        }

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get company by ID
     */
    public getCompanyById(companyId: string | number): YCCompany | null {
        const id = typeof companyId === 'string' ? parseInt(companyId, 10) : companyId;
        return this.companies.find(company => company.id === id) || null;
    }

    /**
     * Get companies by batch
     */
    public getCompaniesByBatch(batch: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => 
            company.batch?.toLowerCase() === batch.toLowerCase()
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get companies by industry
     */
    public getCompaniesByIndustry(industry: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const industryLower = industry.toLowerCase();
        const filteredCompanies = this.companies.filter(company => 
            company.industries.some(ind => ind.toLowerCase() === industryLower)
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: filteredCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get companies by status
     */
    public getCompaniesByStatus(status: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => 
            company.status?.toLowerCase() === status.toLowerCase()
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get companies by stage
     */
    public getCompaniesByStage(stage: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => 
            company.stage?.toLowerCase() === stage.toLowerCase()
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get companies by region
     */
    public getCompaniesByRegion(region: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const regionLower = region.toLowerCase();
        const filteredCompanies = this.companies.filter(company => 
            // Check if the region appears anywhere in the location string
            company.all_locations?.toLowerCase().includes(regionLower) ||
            // Check if any of the regions array contains the search term
            company.regions.some(r => r.toLowerCase().includes(regionLower))
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: filteredCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get companies by tag
     */
    public getCompaniesByTag(tag: string, page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => 
            company.tags.some(t => t.toLowerCase() === tag.toLowerCase()) ||
            company.tags_highlighted.some(t => t.toLowerCase() === tag.toLowerCase())
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get hiring companies
     */
    public getHiringCompanies(page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => company.isHiring);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get top companies
     */
    public getTopCompanies(page: number = 1, pageSize: number = 50): CompanyListResponse {
        const filteredCompanies = this.companies.filter(company => company.top_company);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
            companies: paginatedCompanies,
            total: filteredCompanies.length,
            page,
            pageSize,
            hasMore: endIndex < filteredCompanies.length
        };
    }

    /**
     * Get company statistics
     */
    public getCompanyStats(filters?: Partial<CompanySearchFilters>): CompanyStatsResponse {
        let companiesToAnalyze = [...this.companies];

        // Apply filters if provided
        if (filters) {
            companiesToAnalyze = this.applyFilters(companiesToAnalyze, filters);
        }

        const stats: CompanyStatsResponse = {
            totalCompanies: companiesToAnalyze.length,
            byStatus: {},
            byIndustry: {},
            byStage: {},
            byBatch: {},
            averageTeamSize: 0,
            hiringCompanies: 0,
            topCompanies: 0,
            publicCompanies: 0,
            acquiredCompanies: 0
        };

        let totalTeamSize = 0;
        let companiesWithTeamSize = 0;

        companiesToAnalyze.forEach(company => {
            // Count by status
            if (company.status) {
                stats.byStatus[company.status] = (stats.byStatus[company.status] || 0) + 1;
            }

            // Count by industry
            if (company.industry) {
                stats.byIndustry[company.industry] = (stats.byIndustry[company.industry] || 0) + 1;
            }

            // Count by stage
            if (company.stage) {
                stats.byStage[company.stage] = (stats.byStage[company.stage] || 0) + 1;
            }

            // Count by batch
            if (company.batch) {
                stats.byBatch[company.batch] = (stats.byBatch[company.batch] || 0) + 1;
            }

            // Team size calculations
            if (company.team_size) {
                totalTeamSize += company.team_size;
                companiesWithTeamSize++;
            }

            // Special counts
            if (company.isHiring) stats.hiringCompanies++;
            if (company.top_company) stats.topCompanies++;
            if (company.status === 'Public') stats.publicCompanies++;
            if (company.status === 'Acquired') stats.acquiredCompanies++;
        });

        // Calculate average team size
        stats.averageTeamSize = companiesWithTeamSize > 0 ? Math.round(totalTeamSize / companiesWithTeamSize) : 0;

        return stats;
    }

    /**
     * Apply filters to companies
     */
    private applyFilters(companies: YCCompany[], filters: CompanySearchFilters): YCCompany[] {
        return companies.filter(company => {
            // Industry filter
            if (filters.industry && company.industry && company.industries) {
                const industryMatch = company.industry.toLowerCase() === filters.industry.toLowerCase() ||
                    company.industries.some(ind => ind.toLowerCase() === filters.industry!.toLowerCase());
                if (!industryMatch) return false;
            }

            // Stage filter
            if (filters.stage && company.stage) {
                if (company.stage.toLowerCase() !== filters.stage.toLowerCase()) return false;
            }

            // Status filter
            if (filters.status && company.status) {
                if (company.status.toLowerCase() !== filters.status.toLowerCase()) return false;
            }

            // Batch filter
            if (filters.batch && company.batch) {
                if (company.batch.toLowerCase() !== filters.batch.toLowerCase()) return false;
            }

            // Team size filters
            if (filters.minTeamSize && company.team_size) {
                if (company.team_size < filters.minTeamSize) return false;
            }
            if (filters.maxTeamSize && company.team_size) {
                if (company.team_size > filters.maxTeamSize) return false;
            }

            // Tags filter
            if (filters.tags && filters.tags.length > 0) {
                const hasMatchingTag = filters.tags.some(tag => 
                    company.tags.some(companyTag => companyTag.toLowerCase() === tag.toLowerCase())
                );
                if (!hasMatchingTag) return false;
            }

            // Regions filter
            if (filters.regions && filters.regions.length > 0) {
                const hasMatchingRegion = filters.regions.some(region => 
                    company.all_locations?.toLowerCase().includes(region.toLowerCase()) ||
                    company.regions.some(companyRegion => companyRegion.toLowerCase().includes(region.toLowerCase()))
                );
                if (!hasMatchingRegion) return false;
            }

            // Boolean filters
            if (filters.isHiring !== undefined && company.isHiring !== filters.isHiring) return false;
            if (filters.topCompany !== undefined && company.top_company !== filters.topCompany) return false;
            if (filters.nonprofit !== undefined && company.nonprofit !== filters.nonprofit) return false;

            // Launch date filters
            if (filters.launchedAfter && company.launched_at) {
                if (company.launched_at < filters.launchedAfter) return false;
            }
            if (filters.launchedBefore && company.launched_at) {
                if (company.launched_at > filters.launchedBefore) return false;
            }

            return true;
        });
    }

    /**
     * Sort companies by specified field
     */
    private sortCompanies(companies: YCCompany[], sortBy: string, sortOrder: 'asc' | 'desc'): YCCompany[] {
        return companies.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'team_size':
                    aValue = a.team_size || 0;
                    bValue = b.team_size || 0;
                    break;
                case 'launched_at':
                    aValue = a.launched_at || 0;
                    bValue = b.launched_at || 0;
                    break;
                case 'batch':
                    aValue = a.batch || '';
                    bValue = b.batch || '';
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    /**
     * Check if data is loaded
     */
    public isDataLoaded(): boolean {
        return this.dataLoaded;
    }

    /**
     * Get total company count
     */
    public getTotalCompanyCount(): number {
        return this.companies.length;
    }
}
