import { nanoid } from "@reduxjs/toolkit";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImageToServer = async ({ imageUri, folder }) => {
  const uniqueAvatarId = nanoid();

  if (imageUri) {
    try {
      const response = await fetch(imageUri);

      const file = await response.blob();

      const imageRef = ref(storage, `${folder}/${uniqueAvatarId}`);

      const uploadTask = await uploadBytesResumable(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.warn("uploadImageToServer: ", error);
    }
  }
};
