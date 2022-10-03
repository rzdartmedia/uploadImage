import DropUploadFile from "./DropUploadFile";
import UploadFileImg2 from "./UploadFileImg2";
import UploadFileImgMultiple from "./UploadFileImgMultiple";

function App() {
  return (
    <div className="flex justify-center items-center mx-4">
      {/* <UploadFileImg2 />
      <UploadFileImgMultiple /> */}
      <DropUploadFile />
    </div>
  );
}

export default App;
