"use client";

import "../../i18n";
import { Provider } from "react-redux";
import Index from "./index/page";
import { store } from "../../redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <Index></Index>
    </Provider>
  );
}
