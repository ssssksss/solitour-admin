import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SupportNoticeCreateContainer from "@/containers/support/SupportNoticeCreateUpdateContainer";

interface PageProps {
}

export default async function Page() {

  return (
    <DefaultLayout>
      <SupportNoticeCreateContainer />
    </DefaultLayout>
  );
}
