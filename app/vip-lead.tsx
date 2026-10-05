"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VipLeadDialog = dynamic(() => import("./vip-lead-dialog"), {
  ssr: false,
  loading: () => null,
});

export function VipOpenButton({
  text = "Entrar no Grupo VIP",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("s12:vip-open"))} className={className}>
      {text}
    </button>
  );
}

export default function VipLeadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("s12:vip-open", openModal);
    return () => window.removeEventListener("s12:vip-open", openModal);
  }, []);

  return open ? <VipLeadDialog onClose={() => setOpen(false)} /> : null;
}
