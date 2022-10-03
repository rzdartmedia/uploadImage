import { useState } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";

function UploadFileImgMultiple() {
  // const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [image, setImage] = useState(null);
  const [saveImage, setSaveImage] = useState([]);
  const [imageServer, setImageServer] = useState([]);
  const [processUpload, setProcessUpload] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [presentation, setPresentation] = useState(null);

  function handleUploadChange(e) {
    const uploaded = e.target.files;
    setImage(uploaded);
    setSaveImage(uploaded);
  }

  function uploadImage(e) {
    e.preventDefault();

    if (!saveImage) {
      alert("Upload gambar terlebih dahulu");
    } else {
      setProcessUpload(true);
      const formdata = new FormData();
      for (const key of Object.keys(saveImage)) {
        formdata.append("photos", saveImage[key]);
      }

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setPresentation(`${loaded} Bytes of ${total} Bytes`);

          if (percent <= 100) {
            setUploadPercentage(percent);
          }
        },
      };

      axios
        .post("http://localhost:4000/upload/multiple", formdata, options)
        .then(({ data }) => {
          if (data.status === "success") {
            setSaveImage(null);
            setImage(null);
            document.querySelector("#formFileMultiple").value = null;
            setProcessUpload(false);
            setUploadPercentage(0);
            setImageServer(data.images);
          }
        });
    }
  }

  function cancelUpload(e) {
    e.preventDefault();
    setImage(null);
    setSaveImage(null);
    document.querySelector("#formFileMultiple").value = null;
  }

  return (
    <div className="max-w-[350px] w-full mt-5 mx-auto">
      <div className="my-3 flex flex-col justify-center">
        <label
          htmlFor="formFileMultiple"
          className={`form-label ${image && "hidden"}`}
        >
          <svg
            className="mx-auto cursor-pointer flex justify-center bi bi-plus-square"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <label className="flex justify-center my-4">
            Upload Image Multiple In Here
          </label>
        </label>
        <input
          type="file"
          className="border border-gray-500 rounded-md hidden invisible"
          id="formFileMultiple"
          multiple
          onChange={handleUploadChange}
          accept="image/*"
        />
        <button
          onClick={uploadImage}
          className={`bg-blue-500 text-white py-2 rounded-lg my-2`}
          disabled={processUpload}
        >
          Save My Photo
        </button>
        <button
          onClick={cancelUpload}
          className={`bg-gray-50 border border-gray-400 text-blue-500 py-2 rounded-lg font-bold ${
            (!image || processUpload) && "hidden"
          }`}
          disabled={processUpload}
        >
          Cancel
        </button>

        {uploadPercentage > 0 && (
          <ProgressBar
            presentation={presentation}
            uploadPercentage={uploadPercentage}
          />
        )}
      </div>
      <div className="flex justify-center flex-col space-y-2">
        {imageServer.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Image Multiple"
            className="block"
          />
        ))}
      </div>
    </div>
  );
}

export default UploadFileImgMultiple;
