"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import {
  Bold,
  Italic,
  Quote,
  UnderlineIcon,
  LinkIcon,
  ImageIcon,
  CodeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  UploadCloud,
} from "lucide-react";

import HardBreak from '@tiptap/extension-hard-break';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Digite aqui...",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak.configure({
        HTMLAttributes: {
          class: 'hard-break',
        },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({ openOnClick: true, autolink: true }),
      Image.configure({ allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HorizontalRule,
      CodeBlockLowlight.configure({ lowlight: lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] border border-gray-300 rounded-md p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 prose",
      },
    },
  });

  if (!editor) return null;

  // ✅ Upload de imagem do dispositivo
  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "btn-active" : "btn"}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "btn-active" : "btn"}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "btn-active" : "btn"}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "btn-active" : "btn"}
        >
          <Quote size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="btn"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "btn-active" : "btn"}
        >
          <CodeIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Digite a URL do link:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive("link") ? "btn-active" : "btn"}
        >
          <LinkIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL da imagem:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="btn"
        >
          <ImageIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handleUploadImage}
          className="btn"
        >
          <UploadCloud size={16} />
        </button>

        {/* Alinhamento */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "btn-active" : "btn"
          }
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "btn-active" : "btn"
          }
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "btn-active" : "btn"
          }
        >
          <AlignRight size={16} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
