'use client';
import { useRef, useState } from "react";
import Header from "@/components/header";
import TinyMCEEditor, { TinyMCEEditorRef } from "@/components/TinyMCEEditor";

function Index() {
    const editorRef = useRef<TinyMCEEditorRef | null>(null);
    const [content, setContent] = useState<string>("");

    // Function to get the current content
    const handleGetContent = () => {
        if (editorRef.current) {
            const editorContent = editorRef.current.getContent();
            setContent(editorContent);
        } else {
            console.error("Editor is not ready yet!");
        }
    };

    return (
        <div>
            <Header />
            <TinyMCEEditor ref={editorRef} />
            
            <button onClick={handleGetContent} style={{ marginTop: "10px" }}>
                Get Content from Editor
            </button>

            {/* Display Content Below */}
            {content && (
                <div 
                    style={{ 
                        marginTop: "20px", 
                        padding: "10px", 
                        border: "1px solid #ddd", 
                        minHeight: "200px",
                        backgroundColor: "#fff",
                        fontFamily: "Arial, sans-serif"
                    }}
                    className="tinymce-content"
                    dangerouslySetInnerHTML={{ __html: content }} 
                />
            )}
        </div>
    );
}

export default Index;
