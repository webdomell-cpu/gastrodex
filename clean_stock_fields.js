const fs = require('fs');

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log("Cleaning", filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // If it is JSON
  if (filePath.endsWith('.json')) {
    let data = JSON.parse(content);
    if (data.items && Array.isArray(data.items)) {
      data.items = data.items.map(item => {
        delete item.inStock;
        delete item.stockQuantity;
        delete item.storageLocation;
        return item;
      });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } else if (filePath.endsWith('.js')) {
    // For data_bundle.js, let us parse MASTER_ITEMS
    const match = content.match(/const MASTER_ITEMS = (\[[\s\S]*?\]);\s*(?:window\.|const|$)/);
    if (match) {
      try {
        let items = JSON.parse(match[1]);
        items = items.map(item => {
          delete item.inStock;
          delete item.stockQuantity;
          delete item.storageLocation;
          return item;
        });
        const newMasterItemsStr = `const MASTER_ITEMS = ${JSON.stringify(items, null, 2)};`;
        content = content.replace(match[1], JSON.stringify(items, null, 2));
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Successfully cleaned MASTER_ITEMS in", filePath);
      } catch (e) {
        console.error("Error parsing MASTER_ITEMS in", filePath, e);
      }
    }
  }
}

cleanFile('pwa/catalog_latest.json');
cleanFile('app/src/main/assets/pwa/catalog_latest.json');
cleanFile('pwa/data_bundle.js');
console.log("Cleanup completed!");
