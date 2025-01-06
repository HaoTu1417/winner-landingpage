import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-center text-gray-800 border-t border-gray-200">
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-green-600 font-semibold text-lg">
          Công ty Tài Chính Winner Finance Service
        </h2>
        <p className="mt-2 text-sm">
          <span className="block">
            <i className="fas fa-map-marker-alt text-green-600"></i> Trụ sở chính: Tầng 23 Toà nhà Lim, 9-11 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TPHCM.
          </span>
          <span className="block mt-2">
            <i className="fas fa-phone-alt text-green-600"></i> Tel: 0866 763 661 &nbsp;&nbsp;&nbsp;
            {/* <i className="fas fa-fax text-green-600 hidden"></i> Fax: 024 62765666 &nbsp;&nbsp;&nbsp; */}
            <i className="fas fa-envelope text-green-600"></i> Email: 
          </span>
        </p>
        
      </div>
      <div className="fixed bottom-4 right-4">
        <a
          href="#top"
          className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
          aria-label="Lên đầu trang"
        >
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
