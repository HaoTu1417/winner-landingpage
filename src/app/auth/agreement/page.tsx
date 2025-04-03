"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { docByCidRes } from "@/types/info";
import { InfoService } from "@/services/info.service";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import Button from "@/components/common/Button";
import Link from "next/link";

const optionsParseHTML: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;
    if (typedDomNode.name === "p") {
      return (
        <div className="mb-4 text-gray-700">
          {domToReact(typedDomNode.children as DOMNode[])}
        </div>
      );
    }

    if (typedDomNode.name === "br") {
      return <br />;
    }

    if (typedDomNode.name === "script") {
      return <></>;
    }
  },
};

const Index = () => {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const [data, setData] = useState<docByCidRes>({
    title: "",
    content: "",
    view: 0,
    trash: 0,
    status: 1,
  });

  useEffect(() => {
    InfoService.getArticleContentByCid({
      lang: "VN",
      cid: "ayjy6",
    }).then((res) => {
      if (res.status === 200) {
        const resData = res.data as docByCidRes;
        const cleanedHtml = resData.content
          .replace(/<bạnh,?/g, "")
          .replace(/bạnh,?/g, "bạn");
        setData({ ...resData, content: cleanedHtml });
      }
    });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleJoin = () => {
    if (agreed === false) {
      return toast.error("Vui lòng đánh dấu vào mục chấp thuận");
    }
    router.push("/auth/register");
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

        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Image
              className="h-[216px] w-[294px]"
              src="/assets/LogoWFS_2x.png"
              width={216}
              height={294}
              alt="logo"
            />
          </Link>
        </div>

        <div className="mx-auto mt-6 max-w-[450px] rounded-[9px] p-[12px]">
          <p className="text-xl font-bold">Mở tài khoản hợp đòng</p>
          <div className="mt-4 w-full rounded-lg bg-gray-100 p-2">
            <div className="text-justify">
              {parse(data.content, optionsParseHTML)}
            </div>
            {/* <p className="text-justify">
              Giao dịch đòn bẩy là một phương thức &nbsp;đầu tư có rủi ro cao,
              tuy mang lại nhiều lợi nhuận tiềm năng hơn nhưng cũng ẩn chứa
              những rủi ro rất lớn. Dịch vụ giao dịch chứng khoán do FLYER cung
              cấp. Chúng tôi không cung cấp các giao dịch chứng khoán cụ thể có
              khối lượng thấp và rủi ro cao và khi tài khoản của bạn đạt đến mức
              thua lỗ cao, chúng tôi sẽ chủ động bán số cổ phiếu nắm giữ của bạn
              để ngăn khoản lỗ của bạn tiếp tục gia tăng.Đầu tư có rủi ro, FLYER
              không chịu bất kỳ sự đảm bảo hay trách nhiệm nào đối với các giao
              dịch của bạn.
            </p> */}
          </div>

          <div className="mt-10">
            <label className="flex cursor-pointer select-none items-center space-x-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded text-blue-600 accent-blue-600 focus:ring-0"
              />
              <span className="text-sm text-gray-700">
                Tôi đã đọc và đồng ý
              </span>
            </label>
          </div>

          <div className="mt-10 w-full">
            <Button onClick={handleJoin}>Tham gia ngay</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
