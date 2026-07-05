"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

export function FileDropzone({
  id,
  name,
  label,
  accept,
  required,
}: {
  id: string;
  name: string;
  label: string;
  accept: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function assignFile(file: File | null) {
    if (!inputRef.current) return;
    const transfer = new DataTransfer();
    if (file) transfer.items.add(file);
    inputRef.current.files = transfer.files;
    setFileName(file?.name ?? null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) assignFile(file);
  }

  return (
    <div>
      <label className="text-sm text-[#1A1A1A] font-medium mb-2 block font-body" htmlFor={id}>
        {label} {required && "*"}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-sm font-body cursor-pointer transition-colors ${
          isDragging ? "border-[#1A1A1A] bg-[#F5F5F5]" : "border-[#E5E5E5] hover:border-[#1A1A1A]/40"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          required={required}
          className="sr-only"
          onChange={(e) => assignFile(e.target.files?.[0] ?? null)}
        />
        {fileName ? (
          <>
            <FileText className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="text-[#1A1A1A] truncate flex-1">{fileName}</span>
            <button
              type="button"
              aria-label="Remove file"
              onClick={(e) => {
                e.stopPropagation();
                assignFile(null);
              }}
              className="text-[#737373] hover:text-[#1A1A1A] shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4 text-[#737373] shrink-0" />
            <span className="text-[#737373]">Drag &amp; drop or click to upload</span>
          </>
        )}
      </div>
    </div>
  );
}
