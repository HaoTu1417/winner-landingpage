"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { z } from "zod";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/features/authSlice";
import { useSearchParams } from "next/navigation";
import { setLocalStorage, STORAGE_KEYS } from "@/utils/localStorageHelper";
import { MemberService } from "@/services/member.service";
import { MdOutlineVerifiedUser, MdOutlinePhoneIphone } from "react-icons/md";
import Button from "@/components/common/Button";
import { FaAngleLeft } from "react-icons/fa";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().min(1, { message: "Vui lòng nhập email" }),
  // .email({ message: 'Please enter a valid email address' }),
  passwd: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu" })
    .min(6, { message: "Mật khẩu có ít nhất 6 ký tự" }),
});

const getPhoneOtpSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .regex(/^(0)(3|5|7|8|9)[0-9]{8}$/, {
      message: "Số điện thoại không hợp lệ",
    }),
});

const Index: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    passwd: string;
  }>({
    email: "",
    passwd: "",
  });
  const [isPreLoginSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [getOtp, setGetOtp] = useState<string>("");

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(credentials);
    if (!result.success) {
      return toast.error(result.error.errors[0].message);
    }

    dispatch(
      login({
        ...credentials,
        time_stamp: Math.floor(Date.now() / 1000),
        lang: "VN",
      }),
    )
      .unwrap()
      .then((res) => {
        setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, res?.token);
        toast.success("Đăng nhập thành công");
        router.replace(searchParams.get("redirect") || "/");
      })
      .catch((error) => {
        toast.error(error || "Đăng nhập thất bại");
      });
  };

  return (
    <div className="relative min-h-[100vh] w-full bg-[#E1EEFE]">
      <div className="relative m-auto flex h-[44] w-full items-center justify-center p-2 font-bold text-black">
        <div
          className="absolute left-4 flex cursor-pointer items-center gap-2"
          onClick={handleBack}
        >
          <FaAngleLeft /> Quay lại
        </div>
      </div>

      <div className="relative mx-auto flex max-w-md justify-center px-8">
        <div className="mt-[20%] w-full">
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
          {isPreLoginSuccess === false ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <h1 className="text-xl font-bold">Đăng nhập</h1>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Nhập tài khoản hoặc email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3e4cfa]"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwd"
                  placeholder="Nhập mật khẩu"
                  value={credentials.passwd}
                  onChange={handleChange}
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3e4cfa]"
                  required
                  autoComplete="new-password"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-[#3e4cfa]"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Lưu mật khẩu
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="/auth/forgotpwd"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div>
                <Button type="submit">Đăng nhập</Button>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/auth/agreement"
                  className="text-sm text-[#3e4cfa] hover:text-blue-300"
                >
                  Tạo tài khoản mới
                </Link>
              </div>
            </form>
          ) : (
            <div>
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
                  className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-red-500 ${isCounting ? "" : "cursor-pointer"}`}
                  onClick={handleGetOtpSMS}
                >
                  {isCounting ? `Gửi lại sau ${countdown}s` : "Lấy mã xác nhận"}
                </div>
              </div>

              <div className="mt-6">
                <Button type="submit">Xác nhận</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
