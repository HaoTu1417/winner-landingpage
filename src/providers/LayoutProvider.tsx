"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { checkAuth } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import eventBus, { EventType } from "@/utils/eventBus";
import { removeLocalStorage, STORAGE_KEYS } from "@/utils/localStorageHelper";

const NEED_AUTH_PATHS = ["/news"];

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleUnauthorized = () => {
      removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
      if (NEED_AUTH_PATHS.some((path) => pathname.startsWith(path))) {
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    eventBus.subscribe(EventType.UNAUTHORIZED, handleUnauthorized);

    return () => {
      eventBus.unsubscribe(EventType.UNAUTHORIZED, handleUnauthorized);
    };
  }, [router, pathname]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [pathname]);

  return <>{children}</>;
}
