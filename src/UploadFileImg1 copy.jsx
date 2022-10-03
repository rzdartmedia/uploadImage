import { useState } from "react";

function UploadFileImg1() {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

  function handleUploadChange(e) {
    const uploaded = e.target.files[0];
    const uploadImage = URL.createObjectURL(uploaded);
    setImage(uploadImage);
    setSaveImage(uploaded);
  }

  function uploadImage(e) {
    e.preventDefault();
    if (!saveImage) {
      alert("Upload gambar terlebih dahulu");
    }

    const formdata = new FormData();
    formdata.append("photo", saveImage);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSaveImage(null);
          document.querySelector("#formFile").value = null;
          alert(`Success Upload File
          ${data.image}`);
        }
      });
  }

  return (
    <div className="max-w-[350px] w-full mt-5 mx-auto">
      <div className="flex justify-center">
        <img src={image} alt="" className="" />
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="formFile" className="form-label">
          Upload Image Here
        </label>
        <input
          type="file"
          className="border border-gray-500 rounded-md"
          id="formFile"
          // value={saveImage}
          onChange={handleUploadChange}
          accept="image/*"
        />
        <button
          onClick={uploadImage}
          className="bg-blue-500 text-white py-2 rounded-lg my-4"
        >
          Save My Photo
        </button>
      </div>
    </div>
  );
}

export default UploadFileImg1;
