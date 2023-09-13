const fs = require('node:fs');
const path = require('node:path');
const yargs = require('yargs');
const { parse } = require('json2csv');

// Parse command line arguments
const { argv } = yargs
    .option('format', {
        alias: 'f',
        description: 'Output format: human, csv, json',
        type: 'string',
        default: 'human',
    })
    .option('sort', {
        alias: 's',
        description: 'Sort by count',
        type: 'boolean',
        default: false,
    })
    .option('extension', {
        alias: 'e',
        description: 'File extension to filter by: js, ts',
        type: 'string',
        default: 'js,ts',
    })
    .help()
    .alias('help', 'h');

// Get the directory from the args or use the current working directory
const directory = argv._[0] || process.cwd();

// Get the file extensions to filter by
const extensions = argv.extension.split(',');

// Function to count exports in a file
const countExports = (fileContent) => {
    const patterns = [
        /export default/g, // Default exports
        /export (const|let|var|function|class)/g, // Named exports
        /export {/g, // Export lists
    ];

    return patterns.reduce((count, pattern) => count + (fileContent.match(pattern) || []).length, 0);
};

// Array to hold the results
const results = [];

// Function to traverse directory
const traverseDirectory = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            traverseDirectory(filePath);
        } else if (stats.isFile() && extensions.includes(path.extname(file).slice(1))) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const count = countExports(fileContent);
            results.push({ filePath, count });
        }
    }
};

// Start traversing from the specified directory
traverseDirectory(directory);

// Sort results by count if requested
if (argv.sort) {
    results.sort((a, b) => b.count - a.count);
}

// Output results in the requested format
if (argv.format === 'json') {
    console.log(JSON.stringify(results, null, 2));
} else if (argv.format === 'csv') {
    const csv = parse(results);
    console.log(csv);
} else { // Default to human readable format
    for (const result of results) {
        console.log(`File ${result.filePath} has ${result.count} exports.`);
    }
}
