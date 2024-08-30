import { useState, FormEvent, Dispatch, SetStateAction } from "react";

export const ImageUploader = ({
  setImage,
}: {
  setImage: Dispatch<SetStateAction<File | null>>;
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Set the preview image URL
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
      <div className="upload-file-div w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>
      {previewImage && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Image Preview:</p>
          <img
            src={previewImage}
            alt="Image preview"
            className="uploaded-img mt-2 rounded-md max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};
