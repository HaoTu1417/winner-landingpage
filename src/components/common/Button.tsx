import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md border border-transparent bg-[#0e15a2] px-4 py-3 text-white shadow-sm hover:bg-[#0e15a2]/90 focus:outline-none ${className} disabled:bg-[#0e15a2]/60`}
      {...props}
    >
      {children}
    </button>
  );
}
