import { useEffect, useState } from "react";
import { apiFetch, fileToBase64 } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Image,
  FolderOpen,
  Users,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  X,
  Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Album {
  id: number;
  name: string;
  description?: string;
  coverImage?: string;
  orderIndex: number;
}

interface MediaItem {
  id: number;
  albumId: number;
  type: "image" | "video";
  data: string;
  caption?: string;
  orderIndex: number;
}

interface HeroImage {
  id: number;
  data: string;
  label?: string;
  orderIndex: number;
  active: boolean;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

// ─── Login ────────────────────────────────────────────────────────────────────

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Senha incorreta. Tente novamente.");
      }
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1d24] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold text-white mb-1">MOOVON</h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase">Área Administrativa</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400 font-medium">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
              data-testid="input-admin-password"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
            data-testid="button-admin-login"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <p className="text-center mt-6">
          <a href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── Hero Images Manager ──────────────────────────────────────────────────────

function HeroImagesManager() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const { toast } = useToast();

  async function load() {
    const res = await apiFetch("/admin/hero-images");
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await fileToBase64(file);
      const res = await apiFetch("/admin/hero-images", {
        method: "POST",
        body: JSON.stringify({ data, label: label || undefined, orderIndex: images.length }),
      });
      if (res.ok) {
        toast({ title: "Imagem adicionada!" });
        setLabel("");
        load();
      }
    } catch {
      toast({ title: "Erro ao adicionar imagem", variant: "destructive" });
    }
    e.target.value = "";
  }

  async function toggleActive(img: HeroImage) {
    const res = await apiFetch(`/admin/hero-images/${img.id}`, {
      method: "PUT",
      body: JSON.stringify({ active: !img.active }),
    });
    if (res.ok) load();
  }

  async function deleteImage(id: number) {
    if (!confirm("Remover esta imagem?")) return;
    const res = await apiFetch(`/admin/hero-images/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Imagem removida" });
      load();
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl font-semibold">Fotos da Hero Section</h2>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm text-gray-400">Legenda (opcional)</label>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex: Família no escritório"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
          />
        </div>
        <label className="cursor-pointer">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <span>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Imagem
            </span>
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
            data-testid="input-hero-image-upload"
          />
        </label>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      ) : images.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhuma imagem adicionada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src={img.data} alt={img.label ?? ""} className="w-full h-40 object-cover" />
              <div className="p-3 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400 truncate flex-1">{img.label ?? `Imagem #${img.id}`}</span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleActive(img)}
                    className="h-7 w-7 text-gray-400 hover:text-white"
                    title={img.active ? "Desativar" : "Ativar"}
                  >
                    {img.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteImage(img.id)}
                    className="h-7 w-7 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              {!img.active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-medium bg-black/60 px-2 py-1 rounded">Inativo</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Albums Manager ───────────────────────────────────────────────────────────

function AlbumsManager() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editAlbum, setEditAlbum] = useState<Album | null>(null);
  const [manageAlbum, setManageAlbum] = useState<Album | null>(null);
  const [form, setForm] = useState({ name: "", description: "", coverImage: "", orderIndex: 0 });
  const { toast } = useToast();

  async function loadAlbums() {
    const res = await apiFetch("/admin/albums");
    if (res.ok) setAlbums(await res.json());
    setLoading(false);
  }
  useEffect(() => { loadAlbums(); }, []);

  function openNew() {
    setEditAlbum(null);
    setForm({ name: "", description: "", coverImage: "", orderIndex: albums.length });
    setShowForm(true);
  }

  function openEdit(album: Album) {
    setEditAlbum(album);
    setForm({
      name: album.name,
      description: album.description ?? "",
      coverImage: album.coverImage ?? "",
      orderIndex: album.orderIndex,
    });
    setShowForm(true);
  }

  async function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await fileToBase64(file);
    setForm((f) => ({ ...f, coverImage: data }));
  }

  async function handleSave() {
    const body = {
      name: form.name,
      description: form.description || undefined,
      coverImage: form.coverImage || undefined,
      orderIndex: form.orderIndex,
    };
    const res = editAlbum
      ? await apiFetch(`/admin/albums/${editAlbum.id}`, { method: "PUT", body: JSON.stringify(body) })
      : await apiFetch("/admin/albums", { method: "POST", body: JSON.stringify(body) });

    if (res.ok) {
      toast({ title: editAlbum ? "Álbum atualizado!" : "Álbum criado!" });
      setShowForm(false);
      loadAlbums();
    } else {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
  }

  async function deleteAlbum(id: number) {
    if (!confirm("Remover este álbum e toda sua mídia?")) return;
    const res = await apiFetch(`/admin/albums/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Álbum removido" });
      loadAlbums();
    }
  }

  if (manageAlbum) {
    return <AlbumMediaManager album={manageAlbum} onBack={() => { setManageAlbum(null); loadAlbums(); }} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Realizações / Álbuns</h2>
        <Button onClick={openNew} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Novo Álbum
        </Button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">{editAlbum ? "Editar Álbum" : "Novo Álbum"}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-gray-400">Nome *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ex: MDRT Vancouver 2024"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                data-testid="input-album-name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-gray-400">Ordem</label>
              <Input
                type="number"
                value={form.orderIndex}
                onChange={(e) => setForm((f) => ({ ...f, orderIndex: Number(e.target.value) }))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Descrição</label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Breve descrição do evento ou conquista..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 resize-none"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Imagem de Capa</label>
            <div className="flex items-center gap-3">
              {form.coverImage && (
                <img src={form.coverImage} alt="Capa" className="h-16 w-24 object-cover rounded-lg border border-white/10" />
              )}
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild className="border-white/20 text-gray-300 hover:text-white">
                  <span>
                    <Image className="w-4 h-4 mr-2" />
                    {form.coverImage ? "Trocar" : "Selecionar"}
                  </span>
                </Button>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverFile} />
              </label>
              {form.coverImage && (
                <button onClick={() => setForm((f) => ({ ...f, coverImage: "" }))} className="text-gray-500 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" data-testid="button-album-save">
              Salvar
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      ) : albums.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum álbum criado ainda.</p>
      ) : (
        <div className="space-y-3">
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
            >
              {album.coverImage ? (
                <img src={album.coverImage} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{album.name}</p>
                {album.description && (
                  <p className="text-gray-500 text-sm truncate">{album.description}</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setManageAlbum(album)}
                  className="text-gray-400 hover:text-white text-xs gap-1.5"
                >
                  <FolderOpen className="w-3.5 h-3.5" /> Mídia
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEdit(album)}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteAlbum(album.id)}
                  className="h-8 w-8 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Album Media Manager ──────────────────────────────────────────────────────

function AlbumMediaManager({ album, onBack }: { album: Album; onBack: () => void }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const { toast } = useToast();

  async function loadMedia() {
    const res = await apiFetch(`/admin/albums/${album.id}/media`);
    if (res.ok) setMedia(await res.json());
    setLoading(false);
  }
  useEffect(() => { loadMedia(); }, []);

  async function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await fileToBase64(file);
    const res = await apiFetch(`/admin/albums/${album.id}/media`, {
      method: "POST",
      body: JSON.stringify({ type: "image", data, caption: caption || undefined, orderIndex: media.length }),
    });
    if (res.ok) {
      toast({ title: "Imagem adicionada!" });
      setCaption("");
      loadMedia();
    }
    e.target.value = "";
  }

  async function handleAddVideo() {
    if (!videoUrl.trim()) return;
    const res = await apiFetch(`/admin/albums/${album.id}/media`, {
      method: "POST",
      body: JSON.stringify({ type: "video", data: videoUrl.trim(), caption: caption || undefined, orderIndex: media.length }),
    });
    if (res.ok) {
      toast({ title: "Vídeo adicionado!" });
      setVideoUrl("");
      setCaption("");
      loadMedia();
    }
  }

  async function deleteMedia(mediaId: number) {
    if (!confirm("Remover esta mídia?")) return;
    const res = await apiFetch(`/admin/albums/${album.id}/media/${mediaId}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Mídia removida" });
      loadMedia();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          ← Voltar
        </button>
        <h2 className="text-white text-xl font-semibold">Mídia: {album.name}</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-medium">Adicionar Mídia</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={mediaType === "image"}
              onChange={() => setMediaType("image")}
              className="accent-primary"
            />
            <span className="text-sm text-gray-300">Imagem</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={mediaType === "video"}
              onChange={() => setMediaType("video")}
              className="accent-primary"
            />
            <span className="text-sm text-gray-300">Vídeo (URL)</span>
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">Legenda (opcional)</label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Descrição da foto ou vídeo"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
          />
        </div>

        {mediaType === "image" ? (
          <label className="cursor-pointer block">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <span>
                <Plus className="w-4 h-4 mr-2" />
                Selecionar Imagem
              </span>
            </Button>
            <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
          </label>
        ) : (
          <div className="flex gap-3">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <Button onClick={handleAddVideo} className="bg-primary hover:bg-primary/90 flex-shrink-0">
              <Plus className="w-4 h-4 mr-2" /> Adicionar
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      ) : media.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhuma mídia adicionada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10">
              {item.type === "image" ? (
                <img src={item.data} alt={item.caption ?? ""} className="w-full h-28 object-cover" />
              ) : (
                <div className="w-full h-28 bg-gray-800 flex flex-col items-center justify-center gap-2 p-2">
                  <div className="text-primary text-xs font-medium text-center truncate w-full px-1">{item.data}</div>
                </div>
              )}
              {item.caption && (
                <p className="text-xs text-gray-500 px-2 py-1 truncate">{item.caption}</p>
              )}
              <button
                onClick={() => deleteMedia(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Leads Viewer ─────────────────────────────────────────────────────────────

function LeadsViewer() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/admin/leads").then(r => r.json()).then(setLeads).finally(() => setLoading(false));
  }, []);

  function exportCsv() {
    const header = "Nome,Email,WhatsApp,Data";
    const rows = leads.map(l =>
      `"${l.name}","${l.email}","${l.whatsapp}","${new Date(l.createdAt).toLocaleString("pt-BR")}"`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-moovon.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Leads Captados ({leads.length})</h2>
        <Button variant="outline" size="sm" onClick={exportCsv} className="border-white/20 text-gray-300 hover:text-white gap-1.5">
          <Download className="w-3.5 h-3.5" /> Exportar CSV
        </Button>
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 rounded bg-white/5 animate-pulse" />)}</div>
      ) : leads.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum lead ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                {["Nome", "E-mail", "WhatsApp", "Data"].map(h => (
                  <th key={h} className="text-left text-gray-400 font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-300">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-300">{lead.whatsapp}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/admin/contacts").then(r => r.json()).then(setContacts).finally(() => setLoading(false));
  }, []);

  function exportCsv() {
    const header = "Nome,Telefone,Email,Mensagem,Data";
    const rows = contacts.map(c =>
      `"${c.name}","${c.phone}","${c.email}","${c.message.replace(/"/g, '""')}","${new Date(c.createdAt).toLocaleString("pt-BR")}"`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contatos-moovon.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Contatos ({contacts.length})</h2>
        <Button variant="outline" size="sm" onClick={exportCsv} className="border-white/20 text-gray-300 hover:text-white gap-1.5">
          <Download className="w-3.5 h-3.5" /> Exportar CSV
        </Button>
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 rounded bg-white/5 animate-pulse" />)}</div>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum contato ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                {["Nome", "Telefone", "E-mail", "Mensagem", "Data"].map(h => (
                  <th key={h} className="text-left text-gray-400 font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{c.name}</td>
                  <td className="px-4 py-3 text-gray-300">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-300">{c.email}</td>
                  <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{c.message}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.createdAt).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

type Section = "albums" | "hero" | "leads" | "contacts";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "albums", label: "Realizações", icon: <FolderOpen className="w-4 h-4" /> },
  { id: "hero", label: "Fotos da Hero", icon: <Image className="w-4 h-4" /> },
  { id: "leads", label: "Leads", icon: <Users className="w-4 h-4" /> },
  { id: "contacts", label: "Contatos", icon: <Mail className="w-4 h-4" /> },
];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("albums");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toast } = useToast();

  async function handleLogout() {
    await apiFetch("/admin/logout", { method: "POST" });
    toast({ title: "Sessão encerrada" });
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-[#1a1d24] border-b md:border-b-0 md:border-r border-white/10 flex-shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-white font-bold">MOOVON</h1>
            <p className="text-xs text-gray-500">Painel Administrativo</p>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        <nav className={`${mobileOpen ? "block" : "hidden"} md:block p-3 space-y-1`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                section === item.id
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`nav-admin-${item.id}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 mt-auto border-t border-white/10 hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
          <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all mt-1">
            ← Ver site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {section === "albums" && <AlbumsManager />}
          {section === "hero" && <HeroImagesManager />}
          {section === "leads" && <LeadsViewer />}
          {section === "contacts" && <ContactsViewer />}
        </div>

        {/* Mobile logout */}
        <div className="md:hidden mt-8 flex gap-4">
          <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Ver site
          </a>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-400 transition-colors">
            Sair
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── Admin Root ───────────────────────────────────────────────────────────────

export function Admin() {
  const [authState, setAuthState] = useState<"loading" | "login" | "dashboard">("loading");

  useEffect(() => {
    apiFetch("/admin/me")
      .then((r) => {
        if (r.ok) setAuthState("dashboard");
        else setAuthState("login");
      })
      .catch(() => setAuthState("login"));
  }, []);

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#1a1d24] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === "login") {
    return <AdminLogin onSuccess={() => setAuthState("dashboard")} />;
  }

  return <AdminDashboard onLogout={() => setAuthState("login")} />;
}
