"use client";

import BackButton from "@/components/common/Loader/BackButton";
import { useRouter } from "next/navigation";

const BackButtonContainer = () => {
  const router = useRouter();

  return <BackButton router={router} />;
};

export default BackButtonContainer;
