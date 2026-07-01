import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  id: number;
  type: "image" | "video";
  data: string;
  caption?: string;
  orderIndex: number;
}

interface Album {
  id: number;
  name: string;
  description?: string;
  coverImage?: string;
  orderIndex: number;
  media: MediaItem[];
}

function LightboxModal({ album, onClose }: { album: Album; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const allMedia = album.media;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIdx((p) => (p + 1) % allMedia.length);
      if (e.key === "ArrowLeft") setCurrentIdx((p) => (p - 1 + allMedia.length) % allMedia.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [allMedia.length, onClose]);

  const current = allMedia[currentIdx];

  function isYouTube(url: string) {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

  function getYouTubeId(url: string) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : "";
  }

  function renderMedia(item: MediaItem) {
    if (item.type === "video") {
      if (isYouTube(item.data)) {
        return (
          <iframe
            className="w-full max-w-3xl aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${getYouTubeId(item.data)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video
          className="max-h-[70vh] max-w-full rounded-xl"
          controls
          src={item.data}
        />
      );
    }
    return (
      <img
        src={item.data}
        alt={item.caption ?? album.name}
        className="max-h-[70vh] max-w-full object-contain rounded-xl"
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <h3 className="font-serif text-white text-xl font-bold">{album.name}</h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-2"
              data-testid="button-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {allMedia.length === 0 ? (
            <p className="text-white/50 py-16">Nenhuma mídia neste álbum ainda.</p>
          ) : (
            <>
              <div className="relative flex items-center justify-center w-full">
                {allMedia.length > 1 && (
                  <button
                    onClick={() => setCurrentIdx((p) => (p - 1 + allMedia.length) % allMedia.length)}
                    className="absolute left-0 z-10 p-3 text-white/70 hover:text-white bg-black/40 rounded-full transition-all"
                    data-testid="button-lightbox-prev"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <div className="flex flex-col items-center gap-3">
                  {current && renderMedia(current)}
                  {current?.caption && (
                    <p className="text-white/60 text-sm text-center">{current.caption}</p>
                  )}
                </div>

                {allMedia.length > 1 && (
                  <button
                    onClick={() => setCurrentIdx((p) => (p + 1) % allMedia.length)}
                    className="absolute right-0 z-10 p-3 text-white/70 hover:text-white bg-black/40 rounded-full transition-all"
                    data-testid="button-lightbox-next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {allMedia.length > 1 && (
                <div className="flex gap-2 mt-6 flex-wrap justify-center">
                  {allMedia.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIdx(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.type === "image" ? (
                        <img src={item.data} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Realizacoes() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    fetch("/api/albums", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAlbums(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="realizacoes" className="py-24 bg-secondary dark:bg-[#1a1d24]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Trajetória de Excelência
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Realizações
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premiações, eventos e conquistas que marcam a trajetória de dedicação e excelência da BSeguros.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : albums.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">Em breve — realizações e premiações em destaque.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {albums.map((album) => (
              <motion.div
                key={album.id}
                variants={itemVariants}
                onClick={() => setSelectedAlbum(album)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] bg-white/5"
                data-testid={`card-album-${album.id}`}
              >
                {album.coverImage ? (
                  <img
                    src={album.coverImage}
                    alt={album.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary" />
                )}

                {/* Base film — always visible, ensures text is readable on light images */}
                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />
                {/* Bottom gradient — deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/95 group-hover:via-black/40" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-white text-xl font-bold mb-1 drop-shadow-md">{album.name}</h3>
                  {album.description && (
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                      {album.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      Ver álbum →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {selectedAlbum && (
        <LightboxModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
      )}
    </section>
  );
}
