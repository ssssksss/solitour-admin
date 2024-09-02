import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SupportNoticeContainer from "@/containers/support/SupportNoticeContainer";

interface PageProps {
}

export default async function Page() {

  return (
    <DefaultLayout>
      <SupportNoticeContainer />
    </DefaultLayout>
  );
}
