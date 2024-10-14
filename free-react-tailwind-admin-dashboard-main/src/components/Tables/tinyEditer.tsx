import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const App = () => {
    const [content, setContent] = useState("");
    const editorRef = useRef(null);

    // Function to handle button click and fetch editor content
    const getContent = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getContent()); // Get editor content when button is clicked
            console.log(
                "Editor content on button click:",
                editorRef.current.getContent()
            ); // Log content
        }
    };
    return (
        <div style={{ width: "50%" }}>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                init={{
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    tinycomments_mode: "embedded",
                }}
            />
            {/* Button to get content */}
            <button onClick={getContent}>Get Content</button>

            {/* Displaying the content below */}
            <div>
                <h3>Editor Content:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default App;