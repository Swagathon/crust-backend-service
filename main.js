import { create } from 'ipfs-http-client';

async function addFile(ipfs: IPFS.IPFS, rootCid: string) {
  // ... (Optional: Error handling and input validation)

  try {
    // 1. Get all links recursively from the root CID (if desired)
    const allLinks = await getAllLinksRecursive(ipfs, rootCid);

    // 2. Process links as needed (e.g., download, display)
    for (const link of allLinks) {
      console.log(link); // Example: Print links
      // TODO: Replace with your specific processing logic
    }
  } catch (error) {
    console.error('Error adding file:', error);
    // Handle errors appropriately (e.g., retry, provide user feedback)
  }
}

// Helper function for recursive link retrieval (optional)
async function getAllLinksRecursive(ipfs: IPFS.IPFS, cid: string): Promise<string[]> {
  const links = [];
  const lsResult = await ipfs.ls(cid, { recursive: true }); // Use recursive option

  for await (const link of lsResult.entries()) {
    links.push(link.cid.toString()); // Extract CIDs as strings
    if (link.type === 'dir') {
      const subLinks = await getAllLinksRecursive(ipfs, link.cid.toString());
      links.push(...subLinks); // Recursively add subdirectory links
    }
  }

  return links;
}

// Example usage (assuming you have an IPFS instance)
const ipfs = await create();
await addFile(ipfs, 'QmHashOfYourRootDirectory'); // Replace with actual CID
