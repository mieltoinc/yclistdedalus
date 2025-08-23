# YC Lists MCP Server

A Model Context Protocol (MCP) server that provides access to Y Combinator company data. This server allows you to search, filter, and retrieve information about YC companies through various tools.

## Features

- **Company Search**: Advanced search with text queries and multiple filters
- **Company Details**: Get comprehensive information about specific companies
- **Batch Filtering**: Find companies from specific YC batches
- **Industry Analysis**: Filter companies by industry, stage, and status
- **Geographic Data**: Search companies by region and location
- **Tag-based Search**: Find companies with specific tags
- **Statistics**: Get comprehensive analytics about the YC ecosystem
- **Pagination**: Efficient handling of large result sets

## Available Tools

### 1. yc_search_companies
Search and filter YC companies with advanced querying, filtering, and sorting capabilities. Examples: Find AI companies hiring in San Francisco, search for fintech startups with 100+ employees, get consumer companies from Summer 2013 batch.

**Parameters:**
- `query` (optional): Text search query for company name, description, website, location, tags, or industries. Examples: 'AI', 'delivery', 'San Francisco', 'fintech', 'marketplace'
- `filters` (optional): Object containing various filter criteria
      - `industry`: Filter by industry (e.g., 'Consumer', 'Fintech', 'Enterprise', 'AI/ML', 'Healthcare', 'Industrials')
    - `stage`: Filter by company stage (e.g., 'Idea', 'Early', 'Growth', 'Scale', 'Mature')
    - `status`: Filter by company status (e.g., 'Public', 'Private', 'Acquired', 'Dead', 'IPO', 'Merged')
    - `batch`: Filter by YC batch (e.g., 'Summer 2013', 'Winter 2009', 'Summer 2012', 'Winter 2014')
  - `minTeamSize`: Minimum team size filter (e.g., 10, 50, 100)
  - `maxTeamSize`: Maximum team size filter (e.g., 100, 500, 1000)
  - `tags`: Array of tags to filter by (e.g., ['AI/ML', 'Marketplace'], ['E-commerce', 'B2B'])
  - `regions`: Array of regions to filter by (e.g., ['San Francisco', 'New York'], ['United States', 'Europe'])
  - `isHiring`: Filter by hiring status (boolean)
  - `topCompany`: Filter by top company status (boolean)
  - `nonprofit`: Filter by nonprofit status (boolean)
  - `launchedAfter`: Filter by launch date (Unix timestamp) after this date (e.g., 1262304000 for 2010, 1420070400 for 2015)
  - `launchedBefore`: Filter by launch date (Unix timestamp) before this date (e.g., 1577836800 for 2020, 1640995200 for 2022)
- `page` (optional): Page number for pagination (default: 1, e.g., 1 for first page, 2 for second page)
- `pageSize` (optional): Number of results per page (default: 50, e.g., 10, 25, 50, 100)
- `sortBy` (optional): Field to sort by ('name' for alphabetical, 'team_size' for company size, 'launched_at' for founding date, 'batch' for YC batch)
- `sortOrder` (optional): Sort order ('asc' for ascending, 'desc' for descending, default: 'asc')

**Example:**
```json
{
  "query": "AI",
  "filters": {
    "industry": "AI/ML",
    "stage": "Growth",
    "isHiring": true
  },
  "sortBy": "team_size",
  "sortOrder": "desc"
}
```

### 2. yc_get_company
Get detailed information about a specific YC company by ID. Examples: Get details for DoorDash (ID: 531), find information about Coinbase, retrieve Airbnb company profile.

**Parameters:**
- `companyId` (required): Company ID to retrieve

**Example:**
```json
{
  "companyId": "531"
}
```

### 3. yc_get_companies_by_batch
Get all companies from a specific YC batch. Examples: Find all companies from Summer 2013 (DoorDash, Coinbase), get Winter 2009 batch (Airbnb), explore Summer 2012 companies (Instacart).

**Parameters:**
- `batch` (required): YC batch name (e.g., 'Summer 2013', 'Winter 2009', 'Summer 2012', 'Winter 2014')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "batch": "Summer 2013",
  "page": 1,
  "pageSize": 25
}
```

### 4. yc_get_companies_by_industry
Get all companies in a specific industry. Examples: Find all Consumer companies (DoorDash, Airbnb, Instacart), get Fintech startups (Coinbase, Stripe), explore Enterprise SaaS companies.

**Parameters:**
- `industry` (required): Industry name (e.g., 'Consumer', 'Fintech', 'Enterprise', 'AI/ML', 'Healthcare', 'Industrials')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "industry": "Fintech",
  "page": 1,
  "pageSize": 50
}
```

### 5. yc_get_companies_by_status
Get all companies with a specific status. Examples: Find all Public companies (DoorDash, Coinbase, Airbnb), get Private startups, discover Acquired companies, identify Dead/defunct startups.

**Parameters:**
- `status` (required): Company status (e.g., 'Public', 'Private', 'Acquired', 'Dead', 'IPO', 'Merged')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "status": "Public",
  "page": 1,
  "pageSize": 100
}
```

### 6. yc_get_companies_by_stage
Get all companies at a specific stage. Examples: Find Idea-stage startups, get Early-stage companies (pre-seed/seed), explore Growth-stage startups (Series A/B), discover Scale-stage companies (Series C+).

**Parameters:**
- `stage` (required): Company stage (e.g., 'Idea', 'Early', 'Growth', 'Scale', 'Mature')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "stage": "Growth",
  "page": 1,
  "pageSize": 50
}
```

### 7. yc_get_companies_by_region
Get all companies in a specific region or location. Examples: Find companies in San Francisco (DoorDash, Airbnb, Coinbase), get startups in New York, explore companies in Europe, discover startups in Asia.

**Parameters:**
- `region` (required): Region or location (e.g., 'San Francisco', 'New York', 'United States', 'Europe', 'Asia')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "region": "San Francisco",
  "page": 1,
  "pageSize": 50
}
```

### 8. yc_get_companies_by_tag
Get all companies with a specific tag. Examples: Find AI/ML companies, get Marketplace startups (Airbnb, DoorDash), explore E-commerce companies, discover Blockchain/Crypto startups.

**Parameters:**
- `tag` (required): Tag name (e.g., 'AI/ML', 'Marketplace', 'E-commerce', 'B2B', 'B2C', 'Mobile', 'Web')
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "tag": "AI/ML",
  "page": 1,
  "pageSize": 50
}
```

### 9. yc_get_hiring_companies
Get all YC companies that are currently hiring. Examples: Find companies actively recruiting engineers, discover startups hiring for sales/marketing roles, explore companies with open product positions, get hiring companies by location or industry.

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "page": 1,
  "pageSize": 100
}
```

### 10. yc_get_top_companies
Get all YC companies marked as top companies. Examples: Find YC's most successful startups, discover unicorn companies, explore companies with exceptional growth, get top companies by industry or batch.

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "page": 1,
  "pageSize": 50
}
```

### 11. yc_get_company_stats
Get comprehensive statistics about YC companies with optional filtering. Examples: Get overall YC ecosystem stats, find industry breakdowns, analyze company stages distribution, compare batch performance, discover hiring trends across industries.

**Parameters:**
- `industry` (optional): Filter statistics by industry
- `stage` (optional): Filter statistics by company stage
- `status` (optional): Filter statistics by company status
- `batch` (optional): Filter statistics by YC batch

**Example:**
```json
{
  "industry": "Fintech",
  "stage": "Growth"
}
```

### 12. yc_get_all_companies
Get all YC companies with pagination support. Examples: Browse all 1000+ YC companies, explore companies page by page, get comprehensive company listings, discover new startups across all industries and batches.

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of results per page (default: 50)

**Example:**
```json
{
  "page": 1,
  "pageSize": 100
}
```

## Company Data Fields

Each company object contains the following fields:

- `id`: Unique company identifier
- `name`: Company name
- `slug`: URL-friendly company identifier
- `website`: Company website URL
- `all_locations`: Company location(s)
- `long_description`: Detailed company description
- `one_liner`: Brief company description
- `team_size`: Number of employees
- `industry`: Primary industry
- `subindustry`: Sub-industry category
- `launched_at`: Launch date (Unix timestamp)
- `tags`: Array of company tags
- `batch`: YC batch information
- `status`: Company status (Public, Private, Acquired, Dead, etc.)
- `stage`: Company development stage
- `isHiring`: Whether the company is currently hiring
- `top_company`: Whether it's marked as a top company
- `nonprofit`: Whether it's a nonprofit organization

## Usage Examples

### Find AI companies that are hiring
```json
{
  "query": "AI",
  "filters": {
    "isHiring": true,
    "tags": ["AI/ML"]
  }
}
```

### Get statistics for Fintech companies
```json
{
  "industry": "Fintech"
}
```

### Search for companies in San Francisco
```json
{
  "filters": {
    "regions": ["San Francisco"]
  }
}
```

### Find companies from a specific batch
```json
{
  "batch": "Summer 2013"
}
```

## Installation and Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Data Source

This server uses the YC Lists dataset containing information about over 1,000 Y Combinator companies. The data includes company details, funding information, team sizes, locations, and more.

## Error Handling

The server provides clear error messages for:
- Invalid tool arguments
- Data loading failures
- Company not found scenarios
- Filter validation errors

## Performance

- Efficient in-memory data processing
- Pagination support for large result sets
- Optimized search and filtering algorithms
- Fast response times for most queries

## Contributing

This MCP server is designed to be extensible. Additional tools can be added by:
1. Defining new tool schemas in `src/tools/ycTools.ts`
2. Implementing corresponding handlers
3. Registering tools in the main server class
4. Updating this documentation

## License

MIT License - see package.json for details.
