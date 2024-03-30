"use client";
import { getMoviesByKeyword } from "@/lib/apis/movie/api";
import { Movie } from "@/lib/apis/movie/types";
import useModalSearch from "@/lib/hooks/useModalSearch";
import { debounce } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ModalSearch = () => {
  const searchModal = useModalSearch();
  const modalRef = useRef<any>();
  const [datas, setDatas] = useState<Partial<Movie[]>>();

  const getSuggestion = async (query: string) => {
    const result = await getMoviesByKeyword(query);
    setDatas(result.results);
  };

  const onInputChange = debounce(getSuggestion, 500);

  const closeModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      searchModal.onClose();
    }
  };
  // Menambahkan event listener ketika modal terbuka
  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      // Bersihkan event listener ketika komponen di-unmount
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center relative bg-[#151f30] shadow-lg px-10 py-2 rounded-2xl">
        <input
          type="text"
          className="bg-[#151f30] outline-none"
          placeholder="I'm looking for..."
          onClick={() => searchModal.onOpen()}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
        />
        <SearchIcon className="text-font absolute right-2 cursor-pointer  w-5 h-5" />
      </div>
      {searchModal.isOpen ? (
        <div
          className="absolute top-12 max-h-[600px] overflow-y-scroll -right-[20px] w-[320px] rounded-md shadow border-slate-700 bg-slate-800 z-[60] searchBar"
          ref={modalRef}
        >
          {datas?.length! > 0 ? (
            datas!.map((value) => (
              <Link
                className="p-3 hover:bg-slate-800 flex items-center gap-3"
                href={`/movies/${value?.id}`}
                onClick={() => searchModal.onClose()}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${value?.poster_path}`}
                  alt="thumbnail"
                  width={80}
                  height={80}
                />
                <span className="">{value?.title}</span>
              </Link>
            ))
          ) : (
            <div className="p-3 hover:bg-slate-800 text-center ">No Result.</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ModalSearch;
