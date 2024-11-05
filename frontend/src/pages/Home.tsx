import ListFiles from "../components/home/ListFiles";
import UploadFileModal from "../components/home/UploadFileModal";
import useProtected from "../hooks/useProtected";
import storage from "../utils/storage";

export default function HomePage() {
  useProtected();

  return (
    <div className="flex justify-center w-full">
      <div className="p-4 container">
        <UploadFileModal />
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold">
            Hi, {storage.getUsername()}
          </div>
          <div>
            <button
              onClick={() =>
                (
                  document.getElementById("upload_file_modal") as any
                ).showModal()
              }
              className="btn btn-primary"
            >
              Upload file
            </button>
          </div>
        </div>

        {/* Middle section for uploaded files */}
        <ListFiles />
      </div>
    </div>
  );
}
