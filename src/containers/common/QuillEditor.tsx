"use client";

import "@/css/quillEditor.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import QuillEditorSkeleton from "./QuillEditorSkeleton";

interface Props {
  content: string;
  onChange: (value: string, length: number) => void;
}

// react-quill은 서버 사이드 렌더링을 지원하지 않기 때문에
// 클라이언트 사이드에서 모듈을 불러오도록 설정한다.
// 이를 통해 "document is not found" 에러를 방지할 수 있다.
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <QuillEditorSkeleton />,
});

const QuillEditor = ({ content, onChange }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
      onChange={(value, delta, source, editor) => {
        if (editor.getLength() - 1 >= 500) {
          onChange(content, 500);
        } else {
          onChange(value, editor.getLength() - 1);
        }
      }}
      value={content}
      modules={{
        toolbar: [
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
        ],
      }}
    />
  );
};

export default QuillEditor;
