# YC Lists MCP Server

A Model Context Protocol (MCP) server that provides comprehensive access to Y Combinator company data. This server enables AI agents and applications to search, filter, and analyze information about over 1,000 YC companies.

## 🚀 Features

- **Advanced Company Search**: Full-text search across company names, descriptions, websites, and tags
- **Multi-dimensional Filtering**: Filter by industry, stage, status, batch, location, team size, and more
- **Comprehensive Company Data**: Access to detailed company information including funding status, team size, and location
- **Batch Analysis**: Explore companies from specific YC batches
- **Industry Insights**: Analyze companies by industry, stage, and development phase
- **Geographic Data**: Search companies by region, city, or country
- **Tag-based Discovery**: Find companies using specific tags and categories
- **Statistical Analysis**: Get comprehensive analytics about the YC ecosystem
- **Pagination Support**: Efficient handling of large result sets
- **Real-time Data**: In-memory processing for fast response times

## 🛠️ Available Tools

The server provides 12 powerful tools for accessing YC company data:

1. **`yc_search_companies`** - Advanced search with filters and sorting
2. **`yc_get_company`** - Get detailed company information by ID
3. **`yc_get_companies_by_batch`** - Find companies from specific YC batches
4. **`yc_get_companies_by_industry`** - Filter companies by industry
5. **`yc_get_companies_by_status`** - Find companies by status (Public, Private, Acquired, etc.)
6. **`yc_get_companies_by_stage`** - Filter by company stage (Idea, Early, Growth, Scale)
7. **`yc_get_companies_by_region`** - Search companies by geographic location
8. **`yc_get_companies_by_tag`** - Find companies with specific tags
9. **`yc_get_hiring_companies`** - Discover companies currently hiring
10. **`yc_get_top_companies`** - Access YC's top company list
11. **`yc_get_company_stats`** - Get comprehensive statistics and analytics
12. **`yc_get_all_companies`** - Browse all companies with pagination

## 📊 Data Coverage

The server provides access to comprehensive company information including:

- **Company Details**: Name, description, website, location
- **Business Information**: Industry, stage, status, team size
- **YC Information**: Batch, funding status, top company designation
- **Operational Data**: Hiring status, nonprofit status, launch dates
- **Categorization**: Tags, industries, regions, sub-industries

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd mcps/yclists
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Development

For development with hot reloading:
```bash
npm run dev
```

## 📖 Usage Examples

### Search for AI companies that are hiring
```json
{
  "query": "AI",
  "filters": {
    "isHiring": true,
    "tags": ["AI/ML"]
  },
  "sortBy": "team_size",
  "sortOrder": "desc"
}
```

### Get companies from a specific YC batch
```json
{
  "batch": "Summer 2013",
  "page": 1,
  "pageSize": 25
}
```

### Find Fintech companies in San Francisco
```json
{
  "filters": {
    "industry": "Fintech",
    "regions": ["San Francisco"]
  }
}
```

### Get comprehensive statistics
```json
{
  "industry": "Fintech",
  "stage": "Growth"
}
```

## 🔧 Configuration

The server automatically loads YC company data from the `data/yc.json` file. The data includes:

- Over 1,000 YC companies
- Comprehensive company profiles
- Industry classifications
- Geographic information
- Funding and status data

## 📚 API Reference

For detailed API documentation, see [mcp.md](./mcp.md) which includes:

- Complete tool definitions
- Parameter specifications
- Request/response examples
- Error handling information

## 🏗️ Architecture

The server is built with a modular architecture:

- **`src/types.ts`** - TypeScript type definitions
- **`src/services/ycDataService.ts`** - Data loading and querying service
- **`src/tools/ycTools.ts`** - Tool definitions and handlers
- **`src/index.ts`** - Main MCP server implementation

## 🔍 Search Capabilities

The server provides powerful search functionality:

- **Text Search**: Search across company names, descriptions, websites, and tags
- **Filtering**: Multiple filter criteria for precise results
- **Sorting**: Sort by name, team size, launch date, or batch
- **Pagination**: Efficient handling of large result sets
- **Fuzzy Matching**: Intelligent text matching for better search results

## 📈 Analytics Features

Get comprehensive insights about the YC ecosystem:

- Company counts by industry, stage, and status
- Team size distributions
- Geographic distribution
- Batch analysis
- Hiring trends
- Top company statistics

## 🚀 Performance

- **Fast Response**: In-memory data processing
- **Efficient Queries**: Optimized search and filtering algorithms
- **Scalable**: Handles large datasets with pagination
- **Reliable**: Robust error handling and validation

## 🤝 Contributing

This MCP server is designed to be extensible. To add new tools:

1. Define tool schemas in `src/tools/ycTools.ts`
2. Implement corresponding handlers
3. Register tools in the main server class
4. Update documentation

## 📄 License

MIT License - see [package.json](./package.json) for details.

## 🔗 Related Projects

- [Gmail MCP Server](../gmail/) - Email management via MCP
- [Brave Search MCP Server](../brave-search-mcp/) - Web search capabilities

## 📞 Support

For questions or issues:

1. Check the [mcp.md](./mcp.md) documentation
2. Review the code examples in this README
3. Examine the TypeScript types for parameter requirements

---

**Built with ❤️ for the MCP ecosystem**
