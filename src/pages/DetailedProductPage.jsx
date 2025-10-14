import { useParams } from "react-router-dom";

const DetailedProductPage = () => {
  const { id } = useParams();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {id}
    </div>
  );
};

export default DetailedProductPage;
