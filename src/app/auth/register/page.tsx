"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  MdOutlineEmail,
  MdOutlineVerifiedUser,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MemberService } from "@/services/member.service";
import { z } from "zod";
import { GiThreeFriends } from "react-icons/gi";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Button from "@/components/common/Button";
import Link from "next/link";
import Image from "next/image";

const registerSchema = z
  .object({
    getOtpEmail: z
      .string()
      .min(1, { message: "Vui lòng nhập Otp email" })
      .length(4, { message: "Otp email phải có 4 ký tự" }),
    getOtp: z
      .string()
      .min(1, { message: "Vui lòng nhập Otp điện thoại" })
      .length(4, { message: "Otp điện thoại phải có 4 ký tự" }),
    newPwd: z
      .string()
      .min(1, { message: "Vui lòng nhập mật khẩu" })
      .min(6, { message: "Mật khẩu phải gồm ít nhất 6 ký tự" }),
    verifyNewPwd: z.string(),
  })
  .refine((data) => data.newPwd === data.verifyNewPwd, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["verifyNewPwd"],
  });

const getPhoneOtpSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .regex(/^(0)(3|5|7|8|9)[0-9]{8}$/, {
      message: "Số điện thoại không hợp lệ",
    }),
});

const getMailOtpSchema = z.object({
  email: z.string().min(1, { message: "Vui lòng nhập email" }),
});

const Index = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [getOtpEmail, setGetOtpEmail] = useState<string>("");
  const [getOtp, setGetOtp] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verifyNewPwd, setVerifyNewPwd] = useState<string>("");
  const [showPasswordVerify, setShowPasswordVerify] = useState<boolean>(false);
  const [referral, setReferral] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [countdownEmail, setCountdownEmail] = useState<number>(0);
  const [isCountingEmail, setIsCountingEmail] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingEmail && countdownEmail > 0) {
      timer = setTimeout(() => {
        setCountdownEmail((prev) => prev - 1);
      }, 1000);
    } else if (countdownEmail === 0) {
      setIsCountingEmail(false);
    }

    return () => clearTimeout(timer);
  }, [countdownEmail, isCountingEmail]);

  const handleGetOtpEmail = async () => {
    if (isCountingEmail) return;

    const result = getMailOtpSchema.safeParse({ email });
    if (!result.success) {
      return toast.error(result.error.errors[0].message);
    }

    await MemberService.verifyMailCode({ email, lang: "VN" }).then((res) => {
      if (res.status === 200) {
        setCountdownEmail(60);
        setIsCountingEmail(true);
        return toast.success("Mã xác minh email đã gửi");
      }
    });
  };

  const handleGetOtpSMS = async () => {
    if (isCounting) return;

    const result = getPhoneOtpSchema.safeParse({ phone });
    if (!result.success) {
      return toast.error(result.error.errors[0].message);
    }

    await MemberService.sendSMSVerify({
      countryCode: "+84",
      phoneNumber: phone,
      lang: "VN",
    }).then((res) => {
      if (res.status === 200) {
        setCountdown(60);
        setIsCounting(true);
        return toast.success("Mã xác minh điện thoại đã gửi");
      }
    });
  };

  const handleSubmitSMS = () => {
    if (agreed === false) {
      return toast.error("Vui lòng đánh dấu vào mục chấp thuận");
    }
    const result = registerSchema.safeParse({
      getOtpEmail,
      getOtp,
      newPwd,
      verifyNewPwd,
    });
    if (!result.success) {
      return result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    }

    MemberService.registerPhone({
      time_stamp: Math.floor(Date.now() / 1000),
      lang: "VN",
      account: userName,
      country_pk: "VIETNAM",
      email,
      mobile_country: "+84",
      mobile: phone,
      passwd: newPwd,
      verity_mail: getOtpEmail,
      verify_phone: getOtp,
      invitation_code: referral,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Đăng ký thành công");
        router.push("/auth/login");
      } else {
        toast.error(res.error);
      }
    });
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

        <div className="mx-auto mb-6 max-w-[450px] rounded-[9px] p-[12px]">
          <h1 className="mb-6 text-xl font-bold">Đăng ký</h1>

          <div className="relative rounded-md bg-gray-100 px-2 py-3">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={userName}
              autoComplete="off"
              placeholder="Nhập 4-16 ký tự chữ cái hoặc số"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={email}
              autoComplete="off"
              placeholder="Nhập email"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={getOtpEmail}
              autoComplete="off"
              placeholder="Nhập mã otp email"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setGetOtpEmail(e.target.value)}
            />
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-blue-500 ${isCountingEmail ? "" : "cursor-pointer"}`}
              onClick={handleGetOtpEmail}
            >
              {isCountingEmail
                ? `Gửi lại sau ${countdownEmail}s`
                : "Lấy mã xác nhận"}
            </div>
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlinePhoneIphone className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={phone}
              placeholder="Nhập số điện thoại"
              autoComplete="off"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={getOtp}
              placeholder="Nhập mã otp điện thoại"
              autoComplete="off"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setGetOtp(e.target.value)}
            />
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-blue-500 ${isCounting ? "" : "cursor-pointer"}`}
              onClick={handleGetOtpSMS}
            >
              {isCounting ? `Gửi lại sau ${countdown}s` : "Lấy mã xác nhận"}
            </div>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Gợi ý: Không nhận được mã xác minh, vui lòng thử lại sau 60s
          </p>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={newPwd}
              placeholder="Nhập mật khẩu"
              autoComplete="off"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setNewPwd(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            >
              {showPassword ? (
                <IoIosEye size={20} />
              ) : (
                <IoIosEyeOff size={20} />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Gợi ý: Độ dài mật khẩu không được ít hơn 6 ký tự, phải chứa các ký
            tự số và chữ cái
          </p>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <MdOutlineVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type={showPasswordVerify ? "text" : "password"}
              value={verifyNewPwd}
              placeholder="Nhập lại mật khẩu"
              autoComplete="off"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setVerifyNewPwd(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPasswordVerify((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            >
              {showPasswordVerify ? (
                <IoIosEye size={20} />
              ) : (
                <IoIosEyeOff size={20} />
              )}
            </button>
          </div>

          <div className="relative mt-5 rounded-md bg-gray-100 px-2 py-3">
            <GiThreeFriends className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
            <input
              type="text"
              value={referral}
              placeholder="Nhập mã giới thiệu (nếu cần)"
              autoComplete="off"
              className="w-full bg-gray-100 pl-10 outline-none placeholder:text-gray-400"
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <div className="flex cursor-pointer select-none items-center space-x-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded text-blue-600 accent-blue-600 focus:ring-0"
              />
              <p className="cursor-default text-sm text-gray-700">
                Đăng ký ngay! Bạn đã đồng ý Thoả thuận đăng ký người dùng{" "}
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={() => router.push("/setting/agreement")}
                >{`《 Chính sách bảo mật 》`}</span>
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={() => router.push("/setting/agreement")}
                >{`《 Nhắc nhở rủi ro 》`}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <Button onClick={handleSubmitSMS} disabled={!agreed}>
              Đăng ký
            </Button>

            <button
              className="text-gl mt-6 font-bold text-[#3e4cfa] hover:text-blue-300"
              onClick={() => router.push("/auth/login")}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
