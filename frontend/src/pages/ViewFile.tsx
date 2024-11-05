import { useEffect, useState } from "react";
import ListFiles from "../components/home/ListFiles";
import UploadFileModal from "../components/home/UploadFileModal";
import storage from "../utils/storage";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { UploadedFile } from "../types/UploadedFile";
import Loading from "../components/Loading";
import FileCard from "../components/home/FileCard";

export default function ViewFilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const { filename } = useParams();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile>();

  useEffect(() => {
    const fetchFile = async () => {
      setIsLoading(true);
      try {
        const res = await api.getFile(filename!);
        setUploadedFile(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFile();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!uploadedFile) {
    return <div>File not found</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="p-4 container">
        <UploadFileModal />
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold">
            File: {storage.getUsername()}
          </div>
          <div>
            {!storage.getToken() && (
              <Link to={"/auth"} className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
        {/* middle */}
        <FileCard file={uploadedFile} />
      </div>
    </div>
  );
}
