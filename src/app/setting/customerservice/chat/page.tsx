"use client";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = decodeURIComponent(searchParams.get("url") || "");

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-[100vh] w-full">
      <div className="relative m-auto flex h-[44] w-full items-center justify-center bg-[#414CEB] p-2 text-white">
        <div
          className="absolute left-4 -translate-x-1/2 cursor-pointer"
          onClick={handleBack}
        >
          <FaAngleLeft />
        </div>
        <p className="text-center">Dịch vụ CSKH</p>
        <div
          className="absolute right-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Trang chủ
        </div>
      </div>

      <div className="max-w-100vw min-h-100vh overflow-auto">
        <iframe src={url} style={{ width: "100%", height: "100vh" }} />
      </div>
    </div>
  );
};

export default Index;
