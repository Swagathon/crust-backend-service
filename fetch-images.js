const ipfs = require('ipfs-http-client'); // Install with: npm install ipfs-http-client

// Replace these with your actual IPFS CIDs
const cids = [
  'QmNNDeEaefJre6tTsF8x4sWdDmGSEUBkkKs17Kr4a3muYM', // Replace with CID 1
  'QmbnYg8TAxBEZKr8WnZPFZ3NQBik6gUxSLRAxLV6DJ51Br', // Replace with CID 2
  'QmbAcfFZ8DtuRqesoE1R4p7BquBJ9f2cxoTNX8K1JtK4dY', // Replace with CID 3
  'QmVXWagfmorR9JRVBPAf4JkiWqV5SCQkMw2D33SThNcvNx', // Replace with CID 4
  'QmWrSRyYHXD1iudUFgkhBL2KghA3tLQ4oHRWKZGNkfZwJg', // Replace with CID 5
  'QmWgersrBY4g6CAzdtpqWz5udg3q2JkZGfe5uxt1RSzTMM', // Replace with CID 6
];

async function fetchAndLogImages() {
  const ipfsClient = await ipfs.create();

  for (const cid of cids) {
    try {
      const response = await ipfsClient.cat(cid);
      const mimeType = await ipfsClient.files.stat(cid).then(data => data.type);
      console.log(`CID: ${cid}, MIME Type: ${mimeType}`);

      // Handle different file types (optional)
      if (mimeType.startsWith('image/')) {
        const buffer = await response.arrayBuffer();
        const base64data = Buffer.from(buffer).toString('base64');
        console.log(`Image Data (Base64): ${base64data.slice(0, 50)}...`); // Show first 50 characters
      } else {
        console.log('Non-image file, skipping image data.');
      }
    } catch (error) {
      console.error(`Error fetching CID ${cid}:`, error);
    }
  }

  await ipfsClient.stop(); // Close the IPFS client connection
}

fetchAndLogImages();
