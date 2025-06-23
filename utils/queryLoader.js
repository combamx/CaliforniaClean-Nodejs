const fs = require('fs');
const path = require('path');

let queries;

try {
  const rawData = fs.readFileSync(path.join(__dirname, 'queries.json'), 'utf8');
  queries = JSON.parse(rawData);
} catch (err) {
  console.error('Error loading queries.json:', err.message);
  queries = {};
}

function getQuery(entity, action) {
  return queries?.[entity]?.[action] || '';
}

module.exports = { getQuery };
