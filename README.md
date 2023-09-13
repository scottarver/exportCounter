# JavaScript/TypeScript Export Counter

This is a utility script written in Node.js that counts the number of exports in JavaScript (`.js`) and TypeScript (`.ts`) files within a specified directory. The script traverses the directory recursively, looking into sub-directories as well.

## Features

- Count the number of exports in each `.js` or `.ts` file
- Accepts a directory as a command line argument (defaults to the current working directory if not provided)
- Outputs results in human readable, JSON, or CSV format
- Option to sort results by the count of exports
- Option to filter by file extension

## Installation

Before running the script, ensure you have Node.js installed on your system. You can download Node.js from [here](https://nodejs.org/).

Clone the repository:

```
git clone https://github.com/<your-username>/js-ts-export-counter.git
```

Navigate to the project directory:

```
cd js-ts-export-counter
```

Install the required Node.js modules:

```
npm install
```

## Usage

Run the script with Node.js:

```
node index.js ./path/to/directory --format csv --sort --extension js,ts
```

Command line options:

- `--format, -f`: Specify the output format. Options: `human`, `csv`, `json`. Default: `human`.
- `--sort, -s`: Sort results by the count of exports. Default: `false`.
- `--extension, -e`: File extension to filter by. Provide a comma-separated list for multiple extensions. Default: `js,ts`.

