/**
 * CLI argument parsing for the YC Lists MCP Server
 */

export interface CliOptions {
    stdio?: boolean;
    port?: number;
}

/**
 * Parses command line arguments
 * @returns {CliOptions} Parsed CLI options
 */
export function parseArgs(): CliOptions {
    const args = process.argv.slice(2);
    const options: CliOptions = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        switch (arg) {
            case '--stdio':
                options.stdio = true;
                break;
            case '--port':
                if (i + 1 < args.length) {
                    const port = parseInt(args[i + 1], 10);
                    if (!isNaN(port) && port > 0 && port < 65536) {
                        options.port = port;
                        i++; // Skip next argument as it's the port value
                    } else {
                        console.error('Invalid port number. Must be between 1 and 65535.');
                        process.exit(1);
                    }
                } else {
                    console.error('--port requires a port number.');
                    process.exit(1);
                }
                break;
            case '--help':
            case '-h':
                console.log(`
YC Lists MCP Server

Usage: npm start [options]

Options:
  --stdio           Force STDIO transport (default for local development)
  --port <number>   Use HTTP transport on specified port
  --help, -h        Show this help message

Examples:
  npm start                    # Use STDIO transport
  npm start --stdio           # Force STDIO transport
  npm start --port 3000       # Use HTTP transport on port 3000
                `);
                process.exit(0);
                break;
            default:
                console.error(`Unknown argument: ${arg}`);
                console.error('Use --help for usage information.');
                process.exit(1);
        }
    }

    return options;
}
