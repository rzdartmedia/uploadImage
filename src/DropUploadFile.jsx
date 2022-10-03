import { useState } from "react";
import { ImageConfig } from "./assets/index";

const DropUploadFile = () => {
  const [fileList, setFileList] = useState([]);

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };

  function fileRemove(file) {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  }

  return (
    <div className="bg-white p-[30px] rounded-lg shadow-lg mt-[100px]">
      <h2 className="mb-[30px] text-center">Drop Files Input</h2>
      <div className="relative w-[400px] h-[200px] border border-dashed border-blue-500 rounded-lg flex items-center justify-center hover:opacity-[0.6]">
        <div className="text-center font-600 p-[10px] flex items-center flex-col">
          <img
            className="w-[100px]"
            src={ImageConfig.default}
            alt="image default"
          />
          <p>Drag & Drop your files here</p>
        </div>
        <input
          className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
          type="file"
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 && (
        <div className="mt-[30px]">
          <p className="font-500">Ready To Upload</p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className="relative flex mb-[10px] bg-gray-50 p-[15px] rounded-lg"
            >
              <img
                src={
                  ImageConfig[item.name.split(".").pop()] ||
                  ImageConfig["default"]
                }
                alt="image type"
                className="w-[50px] mr-[20px]"
              />
              <div className="flex flex-col justify-between">
                <p>{item.name}</p>
                <p>{item.size} Bytes</p>
              </div>
              <span
                className="w-[30px] h-[30px] bg-white shadow-lg rounded-[50%] flex justify-center items-center absolute right-[10px] top-2 font-bold cursor-pointer"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropUploadFile;
