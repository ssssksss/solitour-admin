
export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => (submitHandler: (_: string)=>void, keyword: string, condition: boolean = true) => {
    if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        if (condition) {
            submitHandler(keyword);
        }
    }
};