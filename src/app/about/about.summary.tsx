function Summary() {
  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_2fr_3fr] grid-rows-2 gap-4 px-8 py-8">
        {/* First column with 2 rows (smaller width) */}
        <div className="col-start-1 row-start-1 border-b border-gray-300 p-4">
          <p className="text-lg font-semibold text-black">Thành lập</p>
        </div>
        <div className="col-start-1 row-start-2 p-4">
          <h3 className="text-lg font-semibold text-black">
            Tổng tài sản quản lý
          </h3>
        </div>

        {/* Second column with 2 rows */}
        <div className="col-start-2 row-start-1 border-b border-gray-300 p-4">
          <p className="font-bold text-black">
            Tháng <span className="text-2xl text-red-600">08/2007</span>
          </p>
        </div>
        <div className="col-start-2 row-start-2 p-4">
          <p className="text-2xl font-bold text-red-600">
            &gt; 15.000 tỷ đồng
            <br />
            <span className="text-sm text-gray-500">
              (tính đến Tháng 12/2024)
            </span>
          </p>
        </div>

        {/* Third column spanning 2 rows */}
        <div className="col-start-3 row-span-2 p-4 text-black">
          <p>
            Đầu tư với tầm nhìn dài hạn, dựa trên sự am hiểu chuyên sâu về thị
            trường và nhà đầu tư để mang đến sản phẩm bám sát với nhu cầu và mục
            tiêu đầu tư của từng tệp khách hàng. SSIAM cam kết sự chuyên nghiệp,
            minh bạch, và thuận tiện trong mọi sản phẩm và dịch vụ. Am hiểu thị
            trường nội địa, chất lượng quốc tế - sự cộng hưởng tạo nên sự khác
            biệt của SSIAM sau nhiều năm phát triển cùng thị trường Việt Nam.
            Chúng tôi mang đến những ý tưởng và cơ hội đầu tư tốt nhất cho các
            nhà đầu tư trong và ngoài nước để nắm bắt tiềm năng của một thị
            trường năng động thông qua chiến lược đầu tư, năng lực nghiên cứu và
            quản lý rủi ro hiệu quả.
          </p>
        </div>
      </div>
    </>
  );
}

export default Summary;
