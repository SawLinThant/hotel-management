import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingButton = ({size}) => {
  return (
    <div>
      <AiOutlineLoading3Quarters size={size} className="animate-spin"/>
    </div>
  );
};
export default LoadingButton;