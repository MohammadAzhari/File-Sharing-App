import { useEffect, useState } from "react";
import { UploadedFile } from "../../types/UploadedFile";
import api from "../../services/api";
import { FaCopy, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFileDownloadUrl } from "../../config/config";

export default function ListFiles() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await api.listFiles();
      setUploadedFiles(files);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your uploaded files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              {(() => {
                const extension = file.name.split(".").pop()?.toLowerCase();
                switch (extension) {
                  case "mp4":
                    return (
                      <video controls>
                        <source
                          src={getFileDownloadUrl(file.name)}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    );
                  case "png":
                  case "jpeg":
                  case "jpg":
                    return (
                      <img
                        src={getFileDownloadUrl(file.name)}
                        alt="File Preview"
                        className="max-h-[220px] object-cover"
                      />
                    );
                  case "pdf":
                    return (
                      <embed
                        src={getFileDownloadUrl(file.name)}
                        type="application/pdf"
                        width="100%"
                        height="220px"
                      />
                    );
                  default:
                    return <p>Unsupported file type</p>;
                }
              })()}
              <div className="card-body">
                <h3 className="card-title">{file.tag}</h3>
                <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
                <p>Total views: {file.totalViews}</p>
                <span className="my-3 flex items-center flex-wrap">
                  Share Link <FaCopy />
                  <input
                    type="text"
                    value={`${window.location.protocol}//${window.location.host}/#/view/${file.name}`}
                    readOnly
                    className="input input-sm p-2 w-full"
                  />
                </span>
              </div>
              <div className="card-actions justify-end mb-4">
                <Link
                  to={`/view/${file.name}`}
                  className="btn btn-sm btn-primary"
                >
                  View <FaEye />
                </Link>
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
