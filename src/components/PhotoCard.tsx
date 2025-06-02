import React, { useState } from "react";

import { ImageIcon, Loader2 } from "lucide-react";
import type { Photo } from "../types";
import { Card, CardContent } from "./ui/card";

interface PhotoCardProps {
  photo: Photo;
  style?: React.CSSProperties;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, style }) => {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  const handleImageLoad = () => {
    setImageState("loaded");
  };
  const handleImageError = () => {
    setImageState("error");
  };

  const renderImageContent = () => {
    switch (imageState) {
      case "loading":
        return (
          <div className="flex h-full w-full items-center justify-center bg-slate-50">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        );

      case "error":
        return (
          <div className="flex h-28 w-full items-center justify-center border-2 border-dashed border-slate-200 bg-slate-100">
            <div className="flex flex-col items-center gap-1">
              <ImageIcon className="h-8 w-8 text-slate-400" />
              <span className="text-xs text-slate-500">
                Image not available
              </span>
            </div>
          </div>
        );

      case "loaded":
        return (
          <img
            src={photo.url || "/placeholder.svg"}
            alt={photo.title}
            className="h-28 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className="h-64 w-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md"
      style={style}
    >
      <div className="relative flex h-full flex-col">
        <div className="relative flex-1 overflow-hidden p-2">
          <img
            src={photo.url || "/placeholder.svg"}
            alt={photo.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="pointer-events-none absolute h-14 w-14 opacity-0"
            aria-hidden="true"
          />
          {renderImageContent()}
        </div>

        <CardContent className="p-3">
          <p
            className="line-clamp-2 text-center text-xs leading-relaxed text-slate-700"
            title={photo.title}
          >
            {photo.title}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default PhotoCard;