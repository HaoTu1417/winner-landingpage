"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InfoService } from "@/services/info.service";
import { serviceRes } from "@/types/info";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const [serviceInfo, setServiceInfo] = useState<serviceRes | null>(null);

  const handleBack = () => {
    router.back();
  };

  const fetchPromotions = async () => {
    const res = await InfoService.getCustomerServiceInfo({
      time_stamp: Date.now(),
      lang: "VN",
    });
    if (res.status === 200) {
      setServiceInfo(res.data);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div className="mb-20 w-full">
      <section className="min-h-[100vh]">
        <div className="relative m-auto flex h-[44] w-full items-center justify-center bg-[#181D69] p-2 text-white">
          <div
            className="absolute left-4 flex cursor-pointer items-center gap-2"
            onClick={handleBack}
          >
            <FaAngleLeft /> Quay lại
          </div>
          <p className="text-center">Chăm sóc khách hàng</p>
        </div>
        <div className="mx-auto max-w-[450px] bg-white">
          <Image
            src="/assets/cusser.png"
            width={450}
            height={314}
            alt="customer service"
          />
          <div className="flex -translate-y-4 flex-col rounded-tl-3xl rounded-tr-3xl bg-white p-[36px]">
            <div className="w-full rounded-[600px] p-[12px] shadow-[0px_0px_7.75px_0px_rgba(0,0,0,0.1)]">
              <p className="text-center">
                Thời gian làm việc: {serviceInfo?.svc_workday}
              </p>
            </div>
            <div className="mt-4 w-full rounded-[600px] p-[12px] shadow-[0px_0px_7.75px_0px_rgba(0,0,0,0.1)]">
              <p className="text-center">
                Ngày nghỉ: {serviceInfo?.svc_nonworkday}
              </p>
            </div>
            <div className="mx-auto mt-4 flex w-full items-center justify-center rounded-[600px] bg-[#181D69] p-[12px]">
              <Link
                href={`/setting/customerservice/chat?url=${encodeURIComponent(serviceInfo?.svc_link || "")}`}
              >
                <button className="text-white">Dịch vụ CSKH</button>
              </Link>
            </div>
            <div className="mt-4 w-full">
              <p className="text-center">Email: {serviceInfo?.svc_email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
