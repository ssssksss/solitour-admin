interface IImageUpload {
  url: string;
  file: File;
  directory: string;
}

export const imageUpload = async ({ url, file, directory }: IImageUpload) => {
  try {
    const formData = new FormData();
    formData.append("imageFile", file);
      formData.append("directory", directory);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

export const imageDelete = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};
