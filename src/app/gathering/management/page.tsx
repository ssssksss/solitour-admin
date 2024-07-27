import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InformationContainer from "@/containers/information/InformationContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "정보 관리",
  description: "정보 관리",
};

export default function Home() {
  return (
    <DefaultLayout>
      <InformationContainer/>
    </DefaultLayout>
  );
}
