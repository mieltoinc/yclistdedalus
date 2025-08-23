/**
 * Configuration management for the YC Lists MCP Server
 */

export interface Config {
    port: number;
    nodeEnv: 'development' | 'production';
    isProduction?: boolean;
}

/**
 * Loads configuration from environment variables
 * @returns {Config} Server configuration
 */
export function loadConfig(): Config {
    const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    const port = parseInt(process.env.PORT || '5000', 10);
    return {
        port,
        nodeEnv,
        isProduction: nodeEnv === 'production',
    };
}
