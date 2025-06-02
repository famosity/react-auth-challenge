import React from "react";
import type { PhotoListProps } from "../types";
import PhotoCard from "./PhotoCard";

const PhotoList: React.FC<PhotoListProps> = ({ items }) => {
  return (
    <div className="flex w-full justify-center p-4 rounded-xl shadow-xl bg-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center p-2">
        {items.map(item => (
          <PhotoCard photo={item} key={item.id}/>
        ))}
      </div> 
    </div>
  );
};

export default PhotoList;
