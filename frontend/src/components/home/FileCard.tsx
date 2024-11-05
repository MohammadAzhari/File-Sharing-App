import { UploadedFile } from "../../types/UploadedFile";
import { FaDownload } from "react-icons/fa";
import { getFileDownloadUrl } from "../../config/config";

export default function FileCard(props: { file: UploadedFile }) {
  return (
    <div className="card bg-base-100 shadow-xl p-5">
      <h2 className="card-title">{props.file.tag}</h2>
      <div className="card-body">
        <p>
          <strong>Size:</strong> {(props.file.size / 1024).toFixed(2)} KB
        </p>
        <p>
          <strong>Total Views:</strong> {props.file.totalViews}
        </p>
        {props.file.user && (
          <p>
            <strong>Uploaded by:</strong> {props.file.user.username}
          </p>
        )}
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(props.file.createdAt).toLocaleString()}
        </p>
        <div className="card-actions justify-end">
          <a
            href={getFileDownloadUrl(props.file.name)}
            className="btn btn-sm btn-primary"
          >
            Download File <FaDownload />
          </a>
        </div>
      </div>
    </div>
  );
}
