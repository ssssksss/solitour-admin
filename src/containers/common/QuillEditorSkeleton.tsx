const QuillEditorSkeleton = () => {
  return (
    <div className="mt-[1.125rem] flex h-[24.625rem] w-full animate-pulse flex-col rounded-2xl border-[0.0625rem] border-gray3">
      <div className="flex h-[2.65625rem] items-center rounded-t-2xl border-b-[0.0625rem] border-gray3 bg-gray-100" />
      <div className="w-full p-4">
        <div className="h-6 max-w-[28.5rem] bg-gray-100" />
      </div>
    </div>
  );
};

export default QuillEditorSkeleton;
