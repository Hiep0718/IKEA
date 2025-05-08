import { Link } from "react-router-dom";
import { Button } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="bg-blue-600 h-16 w-24 rounded flex items-center justify-center mx-auto mb-6">
          <div className="bg-yellow-400 h-10 w-18 rounded flex items-center justify-center border-2 border-blue-600">
            <span className="text-blue-600 font-bold text-xl">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Trang không tìm thấy</h1>
        <p className="text-gray-600 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            type="primary" 
            size="large" 
            icon={<HomeOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Link to="/">Về trang chủ</Link>
          </Button>
          <Button 
            size="large" 
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
          >
            Quay lại trang trước
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
