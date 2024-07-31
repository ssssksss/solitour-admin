import { imageUpload } from "./imageUpload";

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false },
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // Set canvas dimensions to the size of the image
  canvas.width = image.width;
  canvas.height = image.height;

  // Apply rotation and flipping
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

  // Draw the image on the canvas
  ctx.drawImage(
    image,
    -image.width / 2, // Move the image to the left
    -image.height / 2, // Move the image up
  );

  // Create a new canvas for the cropped image
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise<string | null>((resolve, reject) => {
  croppedCanvas.toBlob(async (blob) => {
    if (blob) {
      const file = new File([blob], new Date().toString(), {
        type: "image/png",
      });

      try {
        await imageUpload({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`,
          file: file,
          directory: "admin/banner",
        });
        resolve(URL.createObjectURL(file));
      } catch (error) {
        console.error("Image upload failed", error);
        reject(new Error("Image upload failed"));
      }
    } else {
      reject(new Error("Canvas is empty"));
    }
  }, "image/png");
  });
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
    image.src = url;
  });
