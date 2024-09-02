
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SupportQnAListContainer from "@/containers/support/qna/SupportQnAListContainer";

interface PageProps {
}

export default async function Page() {


  return (
    <DefaultLayout>
      <SupportQnAListContainer />
    </DefaultLayout>
  );
}
