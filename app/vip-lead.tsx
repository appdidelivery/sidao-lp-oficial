"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VipLeadDialog = dynamic(() => import("./vip-lead-dialog"), {
  ssr: false,
  loading: () => null,
});

export default function VipLeadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    const delegatedClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-s12-vip-open]")) setOpen(true);
    };
    window.addEventListener("s12:vip-open", openModal);
    document.addEventListener("click", delegatedClick);
    return () => {
      window.removeEventListener("s12:vip-open", openModal);
      document.removeEventListener("click", delegatedClick);
    };
  }, []);

  return open ? <VipLeadDialog onClose={() => setOpen(false)} /> : null;
}
