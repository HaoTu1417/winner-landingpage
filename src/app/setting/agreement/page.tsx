"use client";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full">
      <section>
        <div className="relative m-auto flex h-[44] w-full items-center justify-center p-2 font-bold text-black">
          <div
            className="absolute left-4 flex cursor-pointer items-center gap-2"
            onClick={handleBack}
          >
            <FaAngleLeft /> Quay lại
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-[9px] p-[12px]">
          <h1 className="mb-6 text-xl font-bold">Chi tiết thoả thuận</h1>

          <p>Về Chúng Tôi</p>
          <p>
            Flyer Finance Ltd là một tập đoàn doanh nghiệp quốc tế đa dạng dựa
            trên lĩnh vực đầu tư, tài chính vững mạnh và năng lực chuyên môn
            xuất sắc. Công ty của tập đoàn đã thành lập hơn 30 chi nhánh và hàng
            trăm liên doanh và doanh nghiệp 100% vốn trên khắp thế giới, đồng
            thời hợp tác với Công ty Charles Schwab, Deutsche Commerzbank. Chúng
            tôi có mối quan hệ hợp tác sâu rộng với các công ty Fortune 500 và
            cung cấp các dịch vụ đổi mới chuyên nghiệp và chất lượng cao cho
            khách hàng địa phương và toàn cầu.
          </p>
          <p>Flyer Finance Ltd</p>
          <p>Có trụ sở tại Colorado, Hoa Kỳ</p>
          <p>Flyer là ai?</p>
          <p>
            Flyer được thành lập vào năm 2022 bởi một đội ngũ chuyên môn cao có
            nền tảng về tài chính, ngoại hối và công nghệ. Chúng tôi mong muốn
            giúp khách hàng đạt được mục tiêu tài chính của mình và tự hào cung
            cấp quyền truy cập minh bạch vào thị trường ngoại hối, nền tảng giao
            dịch mạnh mẽ, tốc độ khớp lệnh vượt trội và dịch vụ khách hàng từng
            đoạt giải thưởng. Với nền tảng vững chắc của mình, chúng tôi luôn có
            thể cung cấp khả năng tiếp cận tốt hơn vào thị trường chứng khoán
            toàn cầu. Đó là lý do tại sao các nhà giao dịch chuyên nghiệp và bán
            lẻ có thể nhận thấy sự khác biệt đáng kể giữa Flyer và các nhà môi
            giới khác. Chúng tôi liên tục cố gắng phát triển các sản phẩm của
            mình để đảm bảo rằng dịch vụ chúng tôi cung cấp vượt trội hơn nhiều
            so với bất kỳ dịch vụ nào khác trên thị trường. Những nhà giao dịch
            thông minh sẽ đưa ra những quyết định sáng suốt, và việc lựa chọn
            Flyer sẽ mang đến cho bạn trải nghiệm dịch vụ tài chính thoải mái và
            suôn sẻ.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
