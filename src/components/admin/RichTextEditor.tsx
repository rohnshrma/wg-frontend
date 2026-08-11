"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link2, Undo2, Redo2
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { HTMLAttributes: { class: "list-disc list-inside" } },
        orderedList: { HTMLAttributes: { class: "list-decimal list-inside" } },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline cursor-pointer" },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none p-4 text-sm text-text-primary min-h-80 bg-white border border-border rounded-lg",
      },
    },
  });

  if (!editor) return null;

  const toolbarButton = "p-2 hover:bg-gray-100 rounded text-text-secondary hover:text-text-primary transition-colors text-sm";
  const activeButton = "bg-primary/20 text-primary";

  const toggleLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-border rounded-lg bg-white overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-border items-center">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${toolbarButton} ${editor.isActive("bold") ? activeButton : ""}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${toolbarButton} ${editor.isActive("italic") ? activeButton : ""}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${toolbarButton} ${editor.isActive("heading", { level: 2 }) ? activeButton : ""}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${toolbarButton} ${editor.isActive("heading", { level: 3 }) ? activeButton : ""}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${toolbarButton} ${editor.isActive("bulletList") ? activeButton : ""}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${toolbarButton} ${editor.isActive("orderedList") ? activeButton : ""}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${toolbarButton} ${editor.isActive("blockquote") ? activeButton : ""}`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={toggleLink}
          className={`${toolbarButton} ${editor.isActive("link") ? activeButton : ""}`}
          title="Add Link"
        >
          <Link2 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${toolbarButton} disabled:opacity-50`}
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${toolbarButton} disabled:opacity-50`}
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
