import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";

<script src="/node_modules/quill-image-resize-module/image-resize.min.js"></script>;

function App() {
  const [value, setValue] = useState("");
  const quillRef = useRef(null);
  // Window.Quill = Quill;

  Quill.register("modules/imageResize", ImageResize);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: () => {
          const url = prompt("Enter the URL of the image:");
          if (url) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", url, "user");
          }
        },
      },
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      //modules: ["Resize", "DisplaySize"],
    },
  };

  const data = (e) => {
    //setValue(e);
    console.log(e);
  };

  return (
    <div>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={(e) => {
          data(e);
        }}
        ref={quillRef}
      />

      <button
        onClick={() => {
          console.log("values are=");
        }}
      >
        save
      </button>
    </div>
  );
}

export default App;
