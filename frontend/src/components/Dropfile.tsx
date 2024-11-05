import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

interface IProps {
  onDrop: (file: File) => any;
  file?: File;
  accepedFormats?: string[];
  multipleFiles?: boolean;
}

export default function Dropfile({
  onDrop,
  accepedFormats,
  file,
  multipleFiles,
}: IProps) {
  const validateDropedFile = (file: File) => {
    const splitedName = file.name.split(".");
    const fileExtention = splitedName[splitedName.length - 1];

    if (!accepedFormats?.includes(fileExtention.toLowerCase())) {
      return toast.error(
        "File type is not supported. Supported file types are:" +
          " " +
          accepedFormats?.join(", ")
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return toast.error("File size is too big. Max file size is 10MB");
    }

    onDrop(file);
  };

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (multipleFiles) {
            acceptedFiles.forEach((file) => {
              validateDropedFile(file);
            });
          } else {
            validateDropedFile(acceptedFiles[0]);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full h-[200px] rounded-xl z-10 relative">
            <div
              {...getRootProps()}
              className="h-full flex flex-col items-center justify-center"
            >
              <input
                {...getInputProps()}
                accept={accepedFormats?.map((f) => "." + f).join(",") || "*"}
              />
              <div className="  grid place-items-center gap-2 py-4">
                <div className="text-center">
                  <div className="w-full text-center flex items-center justify-center mb-2">
                    {!file ? (
                      <svg
                        width="30"
                        height="23"
                        viewBox="0 0 30 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.6663 12.6335L12.4663 13.8002C12.2219 14.0446 11.9163 14.1668 11.5497 14.1668C11.183 14.1668 10.8663 14.0335 10.5997 13.7668C10.3552 13.5224 10.233 13.2113 10.233 12.8335C10.233 12.4557 10.3552 12.1446 10.5997 11.9002L14.0663 8.4335C14.333 8.16683 14.6441 8.0335 14.9997 8.0335C15.3552 8.0335 15.6663 8.16683 15.933 8.4335L19.3997 11.9002C19.6441 12.1446 19.7719 12.4502 19.783 12.8168C19.7941 13.1835 19.6663 13.5002 19.3997 13.7668C19.1552 14.0113 18.8497 14.1391 18.483 14.1502C18.1163 14.1613 17.7997 14.0446 17.533 13.8002L16.333 12.6335V19.5002H23.6663C24.5997 19.5002 25.3886 19.1779 26.033 18.5335C26.6775 17.8891 26.9997 17.1002 26.9997 16.1668C26.9997 15.2335 26.6775 14.4446 26.033 13.8002C25.3886 13.1557 24.5997 12.8335 23.6663 12.8335H21.6663V10.1668C21.6663 8.32238 21.0163 6.75016 19.7163 5.45016C18.4163 4.15016 16.8441 3.50016 14.9997 3.50016C13.1552 3.50016 11.583 4.15016 10.283 5.45016C8.98301 6.75016 8.33301 8.32238 8.33301 10.1668H7.66634C6.37745 10.1668 5.27745 10.6224 4.36634 11.5335C3.45523 12.4446 2.99967 13.5446 2.99967 14.8335C2.99967 16.1224 3.45523 17.2224 4.36634 18.1335C5.27745 19.0446 6.37745 19.5002 7.66634 19.5002H9.66634C10.0441 19.5002 10.3608 19.6279 10.6163 19.8835C10.8719 20.1391 10.9997 20.4557 10.9997 20.8335C10.9997 21.2113 10.8719 21.5279 10.6163 21.7835C10.3608 22.0391 10.0441 22.1668 9.66634 22.1668H7.66634C5.64412 22.1668 3.91634 21.4668 2.48301 20.0668C1.04967 18.6668 0.333008 16.9557 0.333008 14.9335C0.333008 13.2002 0.85523 11.6557 1.89967 10.3002C2.94412 8.94461 4.31079 8.07794 5.99967 7.70016C6.55523 5.65572 7.66634 4.00016 9.33301 2.7335C10.9997 1.46683 12.8886 0.833496 14.9997 0.833496C17.5997 0.833496 19.8052 1.73905 21.6163 3.55016C23.4275 5.36127 24.333 7.56683 24.333 10.1668C25.8663 10.3446 27.1386 11.0057 28.1497 12.1502C29.1608 13.2946 29.6663 14.6335 29.6663 16.1668C29.6663 17.8335 29.083 19.2502 27.9163 20.4168C26.7497 21.5835 25.333 22.1668 23.6663 22.1668H16.333C15.5997 22.1668 14.9719 21.9057 14.4497 21.3835C13.9275 20.8613 13.6663 20.2335 13.6663 19.5002V12.6335Z"
                          fill="#B1B1B1"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="30"
                        height="23"
                        viewBox="0 0 30 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.7663 14.3335L10.8997 12.4668C10.633 12.2002 10.3219 12.0668 9.96634 12.0668C9.61078 12.0668 9.29967 12.2002 9.03301 12.4668C8.76634 12.7335 8.63301 13.0502 8.63301 13.4168C8.63301 13.7835 8.76634 14.1002 9.03301 14.3668L11.8663 17.2335C12.133 17.5002 12.4441 17.6335 12.7997 17.6335C13.1552 17.6335 13.4663 17.5002 13.733 17.2335L19.3663 11.6002C19.633 11.3335 19.7663 11.0113 19.7663 10.6335C19.7663 10.2557 19.633 9.9335 19.3663 9.66683C19.0997 9.40016 18.7775 9.26683 18.3997 9.26683C18.0219 9.26683 17.6997 9.40016 17.433 9.66683L12.7663 14.3335ZM7.66634 22.1668C5.64412 22.1668 3.91634 21.4668 2.48301 20.0668C1.04967 18.6668 0.333008 16.9557 0.333008 14.9335C0.333008 13.2002 0.85523 11.6557 1.89967 10.3002C2.94412 8.94461 4.31079 8.07794 5.99967 7.70016C6.55523 5.65572 7.66634 4.00016 9.33301 2.7335C10.9997 1.46683 12.8886 0.833496 14.9997 0.833496C17.5997 0.833496 19.8052 1.73905 21.6163 3.55016C23.4275 5.36127 24.333 7.56683 24.333 10.1668C25.8663 10.3446 27.1386 11.0057 28.1497 12.1502C29.1608 13.2946 29.6663 14.6335 29.6663 16.1668C29.6663 17.8335 29.083 19.2502 27.9163 20.4168C26.7497 21.5835 25.333 22.1668 23.6663 22.1668H7.66634ZM7.66634 19.5002H23.6663C24.5997 19.5002 25.3886 19.1779 26.033 18.5335C26.6775 17.8891 26.9997 17.1002 26.9997 16.1668C26.9997 15.2335 26.6775 14.4446 26.033 13.8002C25.3886 13.1557 24.5997 12.8335 23.6663 12.8335H21.6663V10.1668C21.6663 8.32238 21.0163 6.75016 19.7163 5.45016C18.4163 4.15016 16.8441 3.50016 14.9997 3.50016C13.1552 3.50016 11.583 4.15016 10.283 5.45016C8.98301 6.75016 8.33301 8.32238 8.33301 10.1668H7.66634C6.37745 10.1668 5.27745 10.6224 4.36634 11.5335C3.45523 12.4446 2.99967 13.5446 2.99967 14.8335C2.99967 16.1224 3.45523 17.2224 4.36634 18.1335C5.27745 19.0446 6.37745 19.5002 7.66634 19.5002Z"
                          fill="#222222"
                        />
                      </svg>
                    )}
                  </div>
                  {file ? <p>{file?.name}</p> : <p>No File Selected</p>}
                </div>
                <div className="before:absolute before:content-[''] before:!z-0 before:left-0 before:top-[45%] before:w-full before:h-[1px] before:bg-gray-300 relative w-[160px]   text-center ">
                  <div className="px-1 bg-neutral text-gray-300 relative !z-50 inline-block">
                    or
                  </div>
                </div>

                <button type="button" className="btn btn-outline">
                  <i className="mdi mdi-file"></i>
                  {file?.name ? "Replace File" : "Browse Files"}
                </button>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {accepedFormats && (
        <p className=" text-xs mt-1">
          Accepted file types:
          <span>:{accepedFormats.map((f) => f.toUpperCase()).join(",")}</span>
        </p>
      )}
    </>
  );
}
