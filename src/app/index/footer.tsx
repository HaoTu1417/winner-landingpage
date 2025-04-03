import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-center text-gray-800">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-[]">
          Công ty Winner Finance Service
        </h2>
        <p className="mt-2 text-sm">
          <span className="block">
            <i className="fas fa-map-marker-alt text-green-600"></i> Trụ sở
            chính: Tầng 23 Toà nhà Lim, 9-11 Tôn Đức Thắng, Phường Bến Nghé,
            Quận 1, TPHCM.
          </span>
          <span className="mt-2 block">
            <i className="fas fa-phone-alt text-green-600"></i> Tel: 0866 763
            661 &nbsp;&nbsp;&nbsp;
            {/* <i className="fas fa-fax text-green-600 hidden"></i> Fax: 024 62765666 &nbsp;&nbsp;&nbsp; */}
            <i className="fas fa-envelope text-green-600"></i> Email:
            contact@wfs.vn
          </span>
        </p>
      </div>
      <div className="fixed bottom-4 right-4">
        <a
          href="#top"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
          aria-label="Lên đầu trang"
        >
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
