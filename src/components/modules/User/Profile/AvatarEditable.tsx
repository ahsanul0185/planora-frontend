"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface AvatarEditableProps {
  currentImage?: string | null;
  name: string;
  onImageSelect: (file: File) => void;
  onRemove?: () => void;
}

export function AvatarEditable({
  currentImage,
  name,
  onImageSelect,
  onRemove,
}: AvatarEditableProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group w-32 h-32 shrink-0">
      <Avatar className="w-full h-full border-2 border-muted transition-all duration-300 group-hover:border-primary/50">
        <AvatarImage src={preview || ""} alt={name} className="object-cover" />
        <AvatarFallback className="text-4xl bg-primary/5 text-primary font-semibold">
          {name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>

      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-[2px]"
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center gap-1 text-white scale-90 group-hover:scale-100 transition-transform">
          <Camera className="w-7 h-7" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Update</span>
        </div>
      </div>

      <input
        type="file"
        id="avatar-upload-input"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
