import dynamic from 'next/dynamic';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditorType } from 'tinymce';

const Editor = dynamic(() =>
  import('@tinymce/tinymce-react').then(
    (mod) => mod.Editor as unknown as React.ComponentType<React.ComponentProps<typeof TinyMCEEditor>>
  ),
  { ssr: false }
);

export interface TinyMCEEditorRef {
  getContent: () => string;
}

const TinyMCEEditorComponent = forwardRef<TinyMCEEditorRef, unknown>((_, ref) => {
  const editorRef = useRef<TinyMCEEditorType | null>(null);

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.getContent() ?? "",
  }));

  return (
    <Editor
      apiKey="3li80k0hl8g5uwo9xju9iqfyj7wooft2oemc0uw5y82obugq"
      onInit={(_, editor) => (editorRef.current = editor)}
      init={{
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        content_style: `
          body { font-family: Arial, sans-serif; font-size: 14px; }
          h1 { font-size: 2em; font-weight: bold; }
          h2 { font-size: 1.75em; font-weight: bold; }
          h3 { font-size: 1.5em; font-weight: bold; }
          h4 { font-size: 1.25em; font-weight: bold; }
          h5 { font-size: 1em; font-weight: bold; }
          h6 { font-size: 0.875em; font-weight: bold; }
          p { font-size: 1em; line-height: 1.5; }
          strong, b { font-weight: bold; }
          em, i { font-style: italic; }
        `,
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
});

TinyMCEEditorComponent.displayName = "TinyMCEEditorComponent";

export default TinyMCEEditorComponent;
