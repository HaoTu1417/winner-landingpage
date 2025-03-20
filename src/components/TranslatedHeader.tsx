"use client";

import { useTranslation } from "react-i18next";

export default function TranslatedHeader() {
  const { t } = useTranslation();

  return (
    <h1 className="text-3xl sm:text-5xl font-bold">
      {t("companyName")}
    </h1>
  );
}
