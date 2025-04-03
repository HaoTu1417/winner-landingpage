"use client";

import { useTranslation } from "react-i18next";

export default function TranslatedHeader() {
  const { t } = useTranslation();

  return <h1 className="text-3xl font-bold sm:text-5xl">{t("companyName")}</h1>;
}
