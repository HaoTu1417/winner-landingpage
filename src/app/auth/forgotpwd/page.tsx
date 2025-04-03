"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdOutlineEmail, MdOutlineVerifiedUser } from "react-icons/md";
import toast from "react-hot-toast";
import { z } from "zod";
import { MemberService } from "@/services/member.service";
import Link from "next/link";
import { ForgotPwdReq } from "@/types/member";
import Button from "@/components/common/Button";
import Image from "next/image";

const getOtpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không hợp lệ" }),
});

const forgotPwdSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Vui lòng nhập email" })
      .email({ message: "Email không hợp lệ" }),
    newPwd: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Mật khẩu phải gốm ít nhất 6 ký tự" }),
    verifyNewPwd: z.string(),
  })
  .refine((data) => data.newPwd === data.verifyNewPwd, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["verifyNewPwd"],
  });

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [getOtp, setGetOtp] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [verifyNewPwd, setVerifyNewPwd] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  const handleGetOtp = async () => {
    if (isCounting) return;
    const result = getOtpSchema.safeParse({ email });
    if (!result.success) {
      return toast.error(result.error.errors[0].message);
    }
    await MemberService.resetPwdVerifyMailCode({ email, lang: "VN" }).then(
      (res) => {
        if (res.status === 200) {
          setCountdown(60);
          setIsCounting(true);
          return toast.success("Mã xác minh đã gửi");
        }
      },
    );
  };

  const handleSubmit = async () => {
    const result = forgotPwdSchema.safeParse({ email, newPwd, verifyNewPwd });
    if (!result.success) {
      return result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    }

    const dataSubmit: ForgotPwdReq = {
      email,
      email_verifyCode: getOtp,
      newpasswd: newPwd,
      lang: "VN",
      time_stamp: Math.floor(Date.now() / 1000),
    };

    MemberService.passwordApply(dataSubmit).then((res) => {
      if (res.status === 200) {
        toast.success("Đổi mật khẩu thành công");
        router.push("/auth/login");
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="relative min-h-[100vh] w-full">
      <section>
        <div className="relative m-auto flex h-[44] w-full items-center justify-center p-2 font-bold text-black">
          <div
            className="absolute left-4 flex cursor-pointer items-center gap-2"
            onClick={handleBack}
          >
            <FaAngleLeft /> Quay lại
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[450px] rounded-[9px] p-[12px]">
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

          <h1 className="mb-6 text-xl font-bold">Quên mật khẩu</h1>

          <div className="relative rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={email}
              placeholder="Nhập email"
              className="w-full bg-gray-100 pl-10 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={getOtp}
              placeholder="Nhập mã xác nhận email"
              className="w-full bg-gray-100 pl-10 outline-none"
              onChange={(e) => setGetOtp(e.target.value)}
            />
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-blue-500 ${isCounting ? "" : "cursor-pointer"}`}
              onClick={handleGetOtp}
            >
              {isCounting ? `Gửi lại sau ${countdown}s` : "Lấy mã xác nhận"}
            </div>
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={newPwd}
              placeholder="Nhập mật khẩu mới"
              className="w-full bg-gray-100 pl-10 outline-none"
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={verifyNewPwd}
              placeholder="Xác nhận mật khẩu mới"
              className="w-full bg-gray-100 pl-10 outline-none"
              onChange={(e) => setVerifyNewPwd(e.target.value)}
            />
          </div>

          <div className="mt-14 flex items-center justify-center pb-20">
            <Button onClick={handleSubmit}>Xác nhận</Button>
          </div>
        </div>
      </section>
      <div className="fixed bottom-3 left-[50%] right-0 z-10 w-fit max-w-[450px] -translate-x-1/2 rounded-md bg-white px-2 py-1">
        <Link
          className="w-full text-center text-lg font-medium text-[#3e4cfa] hover:text-blue-300"
          href={"/setting/customerservice"}
        >
          Dịch vụ CSKH
        </Link>
      </div>
    </div>
  );
};

export default Index;
