import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dropfile from "../Dropfile";
import { FaUpload } from "react-icons/fa";
import api from "../../services/api";

export default function UploadFileModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file!);
      await api.uploadFile(formData);
      toast.success("File uploaded successfully");
      navigate(0);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="upload_file_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Upload a new File!</h3>
        <div className="mt-5"></div>
        <p className="py-4">Press ESC key or click outside to close</p>
        <div className="m-3">
          <Dropfile
            file={file}
            accepedFormats={["mp4", "png"]}
            onDrop={(file) => setFile(file)}
          />
        </div>
        {file && (
          <button
            disabled={isLoading}
            onClick={handleCreateGame}
            className="btn btn-primary"
          >
            Upload File <FaUpload />
          </button>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
