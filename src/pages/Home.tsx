import React from "react";
import Navbar from "../components/Navbar";
import PhotoList from "@/components/PhotoList";
import PaginationsComponent from "@/components/Pagination";
import { usePhotos } from "@/hook/usePhotos";
import { Loader2 } from "lucide-react";

const Home: React.FC = () => {
  const { photos, loading } = usePhotos();

  return (
    <div className="container mx-auto min-h-screen bg-gradient-to-br">
      <Navbar />
      <div className="mx-auto max-w-6xl p-4">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Galería de Fotos
        </h1>
        {loading ? (
            <div className="flex h-[calc(100vh-300px)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
            </div>
      ) : (
            <>
              <PhotoList items={photos?.content || []} loading={loading} />
              <PaginationsComponent totalPages={photos?.total_pages || 0}/>
            </>
        )}
      </div>
    </div>
  );
};
export default Home;