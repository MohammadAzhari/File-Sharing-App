import { getFileDownloadUrl } from "../config/config";
import { UploadedFile } from "../types/UploadedFile";

export default function FileCover({ file }: { file: UploadedFile }) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "mp4":
      return (
        <video controls className="max-h-[220px] object-cover">
          <source src={getFileDownloadUrl(file.name)} type="video/mp4" />
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
}
