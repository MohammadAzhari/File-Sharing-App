import { useEffect, useState } from "react";
import { UploadedFile } from "../../types/UploadedFile";
import api from "../../services/api";
import { FaCopy, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListFiles() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await api.listFiles();
      setUploadedFiles(files);
    };
    fetchFiles();
  }, []);

  const handleClickCopy = (filename: string) => {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/view/${filename}`
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your uploaded files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{file.name}</h3>
                <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
                <p>Total views: {file.totalViews}</p>
              </div>
              <div className="card-actions justify-end mb-4">
                <Link
                  to={`/view/${file.name}`}
                  className="btn btn-sm btn-primary"
                >
                  View <FaEye />
                </Link>
                <button
                  onClick={() => handleClickCopy(file.name)}
                  className="btn btn-sm btn-secondary"
                >
                  Copy Link <FaCopy />{" "}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
