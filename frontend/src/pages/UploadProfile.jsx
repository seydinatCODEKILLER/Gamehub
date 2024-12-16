/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import useUpload from "@/hooks/useUpload";
import { useNavigate } from "react-router-dom";

const ProfilePicture = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { handleUploadImage, loading, error } = useUpload();

  const handleNavigate = () => {
    localStorage.setItem("hasProfilePicture", "true");
    navigate("/");
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    },
  });

  const handleUpload = () => {
    if (!file) return alert("Veuillez sélectionner une image.");
    const formData = new FormData();
    formData.append("avatar", file);
    handleUploadImage(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <Button
        onClick={handleNavigate}
        className="absolute right-0 bottom-0 mr-3 mb-3"
      >
        Continuer
      </Button>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Mettre à jour votre photo de profil
      </h2>

      {/* Zone de drag and drop */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 text-center">
            Déposez votre fichier ici...
          </p>
        ) : (
          <p className="text-gray-500 text-center">
            Glissez et déposez votre image ici, ou cliquez pour sélectionner
          </p>
        )}
      </div>

      {/* Aperçu de l'image */}
      {preview && (
        <div className="mt-4 flex justify-center">
          <img
            src={preview}
            alt="Aperçu"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>
      )}

      {/* Affichage de l'erreur */}
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Bouton pour valider */}
      <div className="mt-6 text-center">
        <Button onClick={handleUpload} className="w-full" disabled={loading}>
          {loading ? "Chargement..." : "Valider l'image"}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicture;
