import useToastifyStore from "@/store/toastifyStore";
import { getCroppedImg } from "@/utils/cropImage";
import { imageDelete } from "@/utils/imageUpload";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

interface BannerImage {
  id: number;
  url: string;
  croppedUrl?: string;
}

interface IBannerImageList {
  bannerList: BannerImage[];
  addBannerHandler: ({ id, url }: { id: number; url: string }) => void;
  deleteBannerHandler: (id: number) => void; // Add handler for deleting images
}

const BannerImageList = ({
  bannerList,
  addBannerHandler,
  deleteBannerHandler,
}: IBannerImageList) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toastifyStore = useToastifyStore();

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const showCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      setImageSrc(null);
      setIsModalOpen(false);
      addBannerHandler({
        id: bannerList.length + 1,
        url: croppedImage as string,
      });
      toastifyStore.setToastify({
        type: "success",
        message: "이미지 업로드에 성공했습니다."
      })
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setImageSrc(null);
    setIsModalOpen(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setIsModalOpen(true); // Open modal
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setIsModalOpen(true); // Open modal
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-[] flex-col py-4">
      <div
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {bannerList.map((image) => (
          <div
            key={image.id}
            className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={image.url}
              className="h-full w-full object-cover"
              alt={`Banner ${image.id}`}
            />
            {image.id !== 0 && (
              <button
                onClick={async () => {
                    const response = await imageDelete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner/${image.id}`);
                    if (response.ok) {
                      deleteBannerHandler(image.id);
                      toastifyStore.setToastify({
                        type: "success",
                        message: "삭제 되었습니다."
                      })
                    } else {
                      toastifyStore.setToastify({
                        type: "error",
                        message: "삭제에 실패했습니다.",
                      });
                    }
                }}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <label className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <span className="text-gray-500">Upload Image</span>
          <input
            type="file"
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      {isModalOpen && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative h-full max-h-screen w-full max-w-screen-lg overflow-hidden rounded-lg bg-white p-4">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1440 / 600} // Aspect ratio for cropping
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-4">
              <button
                onClick={showCroppedImage}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
              >
                Crop & Save
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerImageList;
