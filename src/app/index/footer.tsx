import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-center text-gray-800">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-[]">
          CÔNG TY TNHH ĐẦU TƯ PHÁT TRIỂN WINNER
        </h2>
        <div className="mt-2 text-sm">
          <p className="block">
            Trụ sở chính: Tầng 23 Toà nhà Lim, 9-11 Tôn Đức Thắng, Phường Bến
            Nghé, Quận 1, TPHCM.
          </p>
          <p className="mt-2 flex flex-col flex-wrap justify-center gap-x-8 gap-y-2 md:flex-row">
            <span>Mã số doanh nghiệp: 0318516212</span>
            <span>Điện thoại: 0866 763 661</span>
            <span>Email: contact@wfs.vn</span>
          </p>
        </div>
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
