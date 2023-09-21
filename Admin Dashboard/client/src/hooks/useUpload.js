import { message } from 'antd';
import { v4 } from 'uuid';
import { storage } from '../config/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadFile = async (file) => {
  try {
    // Determine the file type based on the MIME type
    const fileType = file.type.startsWith('image/') ? 'images' : 'videos';

    // Create a reference for the file in Firebase Storage
    const fileRef = ref(storage, `${fileType}/${file.name + v4()}`);

    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);

    // Get the download URL for the uploaded file
    const fileUrl = await getDownloadURL(snapshot.ref);

    message.success('File uploaded successfully');

    // Return the download URL for the uploaded file
    return fileUrl;
  } catch (error) {
    message.error('File upload failed');
    console.error(error);
    throw error; // You can choose to handle or propagate the error as needed
  }
};
