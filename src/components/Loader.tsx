import { InfinitySpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <InfinitySpin width="200" color="#4fa94d" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loader;
