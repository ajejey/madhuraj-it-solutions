import { Client, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const storage = new Storage(client);

const bucketId = process.env.NEXT_PUBLIC_STORAGE_ID;

export async function uploadFile(file) {
  try {
    const response = await storage.createFile(
      bucketId,
      'unique()',
      file
    );
    console.log('File uploaded successfully:', response);
    return response.$id;
  } catch (error) {
    console.error('Appwrite Storage Upload Error:', error);
    throw error;
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(bucketId, fileId);
    return true;
  } catch (error) {
    console.error('Appwrite Storage Delete Error:', error);
    return false;
  }
}

export function getFileUrl(fileId) {
  if (!fileId) return '/placeholder-image.png';
  
  return `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
}

export function getFilePreview(fileId, width, height) {
  if (!fileId) return '/placeholder-image.png';
  
  return `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/preview?width=${width}&height=${height}&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
}
