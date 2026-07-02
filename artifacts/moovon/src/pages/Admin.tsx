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
  X,
  Download,
  Menu,
  ArrowLeft,
  Home,
  Star,
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

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  initials: string;
  active: boolean;
  orderIndex: number;
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
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/logo-bseguros.png" alt="BSeguros" className="h-14 w-auto mx-auto mb-6 brightness-0 invert" />
          <p className="text-xs text-gray-500 tracking-widest uppercase">Área Administrativa</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4 shadow-2xl">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400 font-medium">Senha de Acesso</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary h-11"
              data-testid="input-admin-password"
              required
            />
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white mt-2 h-11 text-base font-semibold" data-testid="button-admin-login">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </span>
            ) : "Entrar"}
          </Button>
        </form>
        <p className="text-center mt-6">
          <a href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center justify-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Voltar ao site
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
      if (res.ok) { toast({ title: "Imagem adicionada com sucesso!" }); setLabel(""); load(); }
    } catch { toast({ title: "Erro ao adicionar imagem", variant: "destructive" }); }
    e.target.value = "";
  }

  async function toggleActive(img: HeroImage) {
    const res = await apiFetch(`/admin/hero-images/${img.id}`, { method: "PUT", body: JSON.stringify({ active: !img.active }) });
    if (res.ok) load();
  }

  async function deleteImage(id: number) {
    if (!confirm("Remover esta imagem?")) return;
    const res = await apiFetch(`/admin/hero-images/${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Imagem removida" }); load(); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-xl font-semibold">Fotos da Hero Section</h2>
        <p className="text-gray-500 text-sm mt-1">Gerencie as imagens de fundo da seção principal do site.</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 space-y-1.5">
          <label className="text-sm text-gray-400 font-medium">Legenda (opcional)</label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Família no escritório" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-10" />
        </div>
        <label className="cursor-pointer w-full sm:w-auto">
          <Button asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <span><Plus className="w-4 h-4 mr-2" />Adicionar Imagem</span>
          </Button>
          <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} data-testid="input-hero-image-upload" />
        </label>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-36 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
          <Image className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma imagem adicionada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src={img.data} alt={img.label ?? ""} className="w-full h-40 object-cover" />
              <div className="p-3 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400 truncate flex-1">{img.label ?? `Imagem #${img.id}`}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(img)} className="h-7 w-7 text-gray-400 hover:text-white" title={img.active ? "Desativar" : "Ativar"}>
                    {img.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteImage(img.id)} className="h-7 w-7 text-gray-400 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              {!img.active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-300 font-medium bg-black/70 px-3 py-1 rounded-full">Inativo</span>
                </div>
              )}
              {img.active && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs text-emerald-300 font-medium bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">Ativo</span>
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

  function openNew() { setEditAlbum(null); setForm({ name: "", description: "", coverImage: "", orderIndex: albums.length }); setShowForm(true); }
  function openEdit(album: Album) { setEditAlbum(album); setForm({ name: album.name, description: album.description ?? "", coverImage: album.coverImage ?? "", orderIndex: album.orderIndex }); setShowForm(true); }

  async function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await fileToBase64(file);
    setForm((f) => ({ ...f, coverImage: data }));
  }

  async function handleSave() {
    const body = { name: form.name, description: form.description || undefined, coverImage: form.coverImage || undefined, orderIndex: form.orderIndex };
    const res = editAlbum
      ? await apiFetch(`/admin/albums/${editAlbum.id}`, { method: "PUT", body: JSON.stringify(body) })
      : await apiFetch("/admin/albums", { method: "POST", body: JSON.stringify(body) });
    if (res.ok) { toast({ title: editAlbum ? "Álbum atualizado!" : "Álbum criado com sucesso!" }); setShowForm(false); loadAlbums(); }
    else { toast({ title: "Erro ao salvar", variant: "destructive" }); }
  }

  async function deleteAlbum(id: number) {
    if (!confirm("Remover este álbum e toda sua mídia?")) return;
    const res = await apiFetch(`/admin/albums/${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Álbum removido" }); loadAlbums(); }
  }

  if (manageAlbum) return <AlbumMediaManager album={manageAlbum} onBack={() => { setManageAlbum(null); loadAlbums(); }} />;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-semibold">Realizações / Álbuns</h2>
          <p className="text-gray-500 text-sm mt-1">Crie álbuns com fotos e vídeos das suas conquistas.</p>
        </div>
        <Button onClick={openNew} className="bg-primary hover:bg-primary/90 shrink-0"><Plus className="w-4 h-4 mr-2" /> Novo Álbum</Button>
      </div>
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">{editAlbum ? "Editar Álbum" : "Novo Álbum"}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white p-1"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-gray-400 font-medium">Nome *</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ex: MDRT Vancouver 2024" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" data-testid="input-album-name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-gray-400 font-medium">Ordem de Exibição</label>
              <Input type="number" value={form.orderIndex} onChange={(e) => setForm((f) => ({ ...f, orderIndex: Number(e.target.value) }))} className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400 font-medium">Descrição</label>
            <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Breve descrição do evento ou conquista..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 resize-none" rows={2} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400 font-medium">Imagem de Capa</label>
            <div className="flex items-center gap-3">
              {form.coverImage && <img src={form.coverImage} alt="Capa" className="h-16 w-24 object-cover rounded-lg border border-white/10" />}
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10">
                  <span><Image className="w-4 h-4 mr-2" />{form.coverImage ? "Trocar Capa" : "Selecionar Capa"}</span>
                </Button>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverFile} />
              </label>
              {form.coverImage && <button onClick={() => setForm((f) => ({ ...f, coverImage: "" }))} className="text-gray-500 hover:text-red-400 p-1"><X className="w-4 h-4" /></button>}
            </div>
          </div>
          <div className="flex gap-3 pt-2 border-t border-white/5">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" data-testid="button-album-save">Salvar Álbum</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">Cancelar</Button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : albums.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
          <FolderOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum álbum criado ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {albums.map((album) => (
            <div key={album.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors">
              {album.coverImage ? (
                <img src={album.coverImage} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"><FolderOpen className="w-6 h-6 text-gray-500" /></div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{album.name}</p>
                {album.description && <p className="text-gray-500 text-sm truncate mt-0.5">{album.description}</p>}
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <Button size="sm" variant="ghost" onClick={() => setManageAlbum(album)} className="text-gray-400 hover:text-white text-xs gap-1.5 hidden sm:flex"><FolderOpen className="w-3.5 h-3.5" /> Mídia</Button>
                <Button size="icon" variant="ghost" onClick={() => setManageAlbum(album)} className="h-8 w-8 text-gray-400 hover:text-white sm:hidden"><FolderOpen className="w-3.5 h-3.5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => openEdit(album)} className="h-8 w-8 text-gray-400 hover:text-white"><Pencil className="w-3.5 h-3.5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteAlbum(album.id)} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></Button>
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
    const res = await apiFetch(`/admin/albums/${album.id}/media`, { method: "POST", body: JSON.stringify({ type: "image", data, caption: caption || undefined, orderIndex: media.length }) });
    if (res.ok) { toast({ title: "Imagem adicionada!" }); setCaption(""); loadMedia(); }
    e.target.value = "";
  }

  async function handleAddVideo() {
    if (!videoUrl.trim()) return;
    const res = await apiFetch(`/admin/albums/${album.id}/media`, { method: "POST", body: JSON.stringify({ type: "video", data: videoUrl.trim(), caption: caption || undefined, orderIndex: media.length }) });
    if (res.ok) { toast({ title: "Vídeo adicionado!" }); setVideoUrl(""); setCaption(""); loadMedia(); }
  }

  async function deleteMedia(mediaId: number) {
    if (!confirm("Remover esta mídia?")) return;
    const res = await apiFetch(`/admin/albums/${album.id}/media/${mediaId}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Mídia removida" }); loadMedia(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /> Voltar</button>
        <div className="w-px h-4 bg-white/10" />
        <h2 className="text-white text-xl font-semibold">{album.name}</h2>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-semibold">Adicionar Mídia</h3>
        <div className="flex gap-4">
          {(["image", "video"] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={mediaType === type} onChange={() => setMediaType(type)} className="accent-primary" />
              <span className="text-sm text-gray-300">{type === "image" ? "Imagem" : "Vídeo (URL)"}</span>
            </label>
          ))}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-gray-400 font-medium">Legenda (opcional)</label>
          <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Descrição da mídia..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
        </div>
        {mediaType === "image" ? (
          <label className="cursor-pointer block">
            <Button asChild className="bg-primary hover:bg-primary/90"><span><Plus className="w-4 h-4 mr-2" />Selecionar Imagem</span></Button>
            <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
          </label>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
            <Button onClick={handleAddVideo} className="bg-primary hover:bg-primary/90 shrink-0"><Plus className="w-4 h-4 mr-2" /> Adicionar</Button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : media.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl"><Image className="w-8 h-8 text-gray-600 mx-auto mb-2" /><p className="text-gray-500 text-sm">Nenhuma mídia adicionada.</p></div>
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
              {item.caption && <p className="text-xs text-gray-500 px-2 py-1 truncate">{item.caption}</p>}
              <button onClick={() => deleteMedia(item.id)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                <Trash2 className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Testimonials Manager ─────────────────────────────────────────────────────

function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ text: "", author: "", role: "", initials: "" });
  const { toast } = useToast();

  async function load() {
    const res = await apiFetch("/admin/testimonials");
    if (res.ok) setTestimonials(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() { setEditItem(null); setForm({ text: "", author: "", role: "", initials: "" }); setShowForm(true); }
  function openEdit(t: Testimonial) { setEditItem(t); setForm({ text: t.text, author: t.author, role: t.role, initials: t.initials }); setShowForm(true); }

  function autoInitials(author: string) {
    return author.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("").slice(0, 2);
  }

  function handleAuthorChange(val: string) {
    setForm(f => ({ ...f, author: val, initials: autoInitials(val) }));
  }

  async function handleSave() {
    if (!form.text || !form.author || !form.role) { toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" }); return; }
    const body = { text: form.text, author: form.author, role: form.role, initials: form.initials || autoInitials(form.author) };
    const res = editItem
      ? await apiFetch(`/admin/testimonials/${editItem.id}`, { method: "PUT", body: JSON.stringify(body) })
      : await apiFetch("/admin/testimonials", { method: "POST", body: JSON.stringify(body) });
    if (res.ok) { toast({ title: editItem ? "Depoimento atualizado!" : "Depoimento adicionado!" }); setShowForm(false); load(); }
    else { toast({ title: "Erro ao salvar", variant: "destructive" }); }
  }

  async function toggleActive(t: Testimonial) {
    const res = await apiFetch(`/admin/testimonials/${t.id}`, { method: "PUT", body: JSON.stringify({ active: !t.active }) });
    if (res.ok) load();
  }

  async function deleteItem(id: number) {
    if (!confirm("Remover este depoimento?")) return;
    const res = await apiFetch(`/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Depoimento removido" }); load(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-semibold">Depoimentos</h2>
          <p className="text-gray-500 text-sm mt-1">Gerencie os depoimentos exibidos no site.</p>
        </div>
        <Button onClick={openNew} className="bg-primary hover:bg-primary/90 shrink-0"><Plus className="w-4 h-4 mr-2" /> Novo Depoimento</Button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">{editItem ? "Editar Depoimento" : "Novo Depoimento"}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white p-1"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400 font-medium">Depoimento *</label>
            <Textarea
              value={form.text}
              onChange={(e) => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="O que o cliente disse..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 resize-none"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm text-gray-400 font-medium">Nome *</label>
              <Input value={form.author} onChange={(e) => handleAuthorChange(e.target.value)} placeholder="Ex: Carlos Eduardo M." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-gray-400 font-medium">Iniciais</label>
              <Input value={form.initials} onChange={(e) => setForm(f => ({ ...f, initials: e.target.value.toUpperCase().slice(0, 2) }))} placeholder="CE" maxLength={2} className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 uppercase" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400 font-medium">Profissão / Cargo *</label>
            <Input value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Ex: Empresário, Médico, Advogado..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
          </div>
          <div className="flex gap-3 pt-2 border-t border-white/5">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Salvar Depoimento</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">Cancelar</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
          <Star className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum depoimento adicionado ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className={`flex items-start gap-4 bg-white/5 border rounded-xl p-4 transition-colors ${t.active ? "border-white/10 hover:bg-white/[0.07]" : "border-white/5 opacity-50"}`}>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">{t.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium">{t.author}</p>
                  <span className="text-gray-600 text-xs">·</span>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                  {!t.active && <span className="text-xs text-gray-500 bg-white/10 px-2 py-0.5 rounded-full">Inativo</span>}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">"{t.text}"</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button size="icon" variant="ghost" onClick={() => toggleActive(t)} className="h-8 w-8 text-gray-400 hover:text-white" title={t.active ? "Desativar" : "Ativar"}>
                  {t.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => openEdit(t)} className="h-8 w-8 text-gray-400 hover:text-white"><Pencil className="w-3.5 h-3.5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteItem(t.id)} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
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
    const rows = leads.map(l => `"${l.name}","${l.email}","${l.whatsapp}","${new Date(l.createdAt).toLocaleString("pt-BR")}"`);
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "leads-bseguros.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-semibold">Leads Captados</h2>
          <p className="text-gray-500 text-sm mt-1">{leads.length} lead{leads.length !== 1 ? "s" : ""} registrado{leads.length !== 1 ? "s" : ""}.</p>
        </div>
        {leads.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCsv} className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 gap-1.5 shrink-0">
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </Button>
        )}
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum lead captado ainda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>{["Nome", "E-mail", "WhatsApp", "Data"].map(h => <th key={h} className="text-left text-gray-400 font-semibold px-4 py-3 text-xs uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-300">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-300">{lead.whatsapp}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Contacts Viewer ──────────────────────────────────────────────────────────

function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/admin/contacts").then(r => r.json()).then(setContacts).finally(() => setLoading(false));
  }, []);

  function exportCsv() {
    const header = "Nome,Telefone,Email,Mensagem,Data";
    const rows = contacts.map(c => `"${c.name}","${c.phone}","${c.email}","${c.message.replace(/"/g, '""')}","${new Date(c.createdAt).toLocaleString("pt-BR")}"`);
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "contatos-bseguros.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-semibold">Contatos</h2>
          <p className="text-gray-500 text-sm mt-1">{contacts.length} mensagen{contacts.length !== 1 ? "s" : ""} recebida{contacts.length !== 1 ? "s" : ""}.</p>
        </div>
        {contacts.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCsv} className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 gap-1.5 shrink-0">
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </Button>
        )}
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
          <Mail className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum contato recebido ainda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>{["Nome", "Telefone", "E-mail", "Mensagem", "Data"].map(h => <th key={h} className="text-left text-gray-400 font-semibold px-4 py-3 text-xs uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-300">{c.email}</td>
                  <td className="px-4 py-3 text-gray-400 max-w-[200px] truncate">{c.message}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString("pt-BR")}</td>
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

type Section = "albums" | "hero" | "testimonials" | "leads" | "contacts";

const navItems: { id: Section; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "albums", label: "Realizações", icon: <FolderOpen className="w-4 h-4" />, desc: "Álbuns e fotos" },
  { id: "hero", label: "Fotos da Hero", icon: <Image className="w-4 h-4" />, desc: "Imagens de fundo" },
  { id: "testimonials", label: "Depoimentos", icon: <Star className="w-4 h-4" />, desc: "Avaliações de clientes" },
  { id: "leads", label: "Leads", icon: <Users className="w-4 h-4" />, desc: "Contatos captados" },
  { id: "contacts", label: "Contatos", icon: <Mail className="w-4 h-4" />, desc: "Mensagens recebidas" },
];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("albums");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const currentItem = navItems.find(i => i.id === section);

  async function handleLogout() {
    await apiFetch("/admin/logout", { method: "POST" });
    toast({ title: "Sessão encerrada" });
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1a1d24] border-b border-white/10">
        <img src="/logo-bseguros.png" alt="BSeguros" className="h-8 w-auto brightness-0 invert" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setSidebarOpen(false)} />}
      <div className="flex flex-1 overflow-hidden">
        <aside className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-64 bg-[#1a1d24] border-r border-white/10 flex flex-col transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="p-5 border-b border-white/10">
            <img src="/logo-bseguros.png" alt="BSeguros" className="h-10 w-auto mb-3 hidden lg:block brightness-0 invert" />
            <div className="flex items-center justify-between lg:justify-start">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Painel Administrativo</p>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white p-1"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all text-left ${section === item.id ? "bg-primary/15 text-primary border border-primary/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}
                data-testid={`nav-admin-${item.id}`}
              >
                <span className={`p-1.5 rounded-lg ${section === item.id ? "bg-primary/20" : "bg-white/5"}`}>{item.icon}</span>
                <div className="text-left">
                  <div className="font-medium leading-tight">{item.label}</div>
                  <div className="text-[0.7rem] opacity-60 leading-tight mt-0.5">{item.desc}</div>
                </div>
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-white/10 space-y-1">
            <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all"><Home className="w-4 h-4" />Ver site</a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all" data-testid="button-admin-logout"><LogOut className="w-4 h-4" />Sair</button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="border-b border-white/10 px-6 py-4 bg-[#12141a] hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">Painel</span>
              <span className="text-gray-600">/</span>
              <span className="text-white text-sm font-medium">{currentItem?.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Ver site</a>
              <div className="w-px h-4 bg-white/10" />
              <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5"><LogOut className="w-3.5 h-3.5" /> Sair</button>
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {section === "albums" && <AlbumsManager />}
              {section === "hero" && <HeroImagesManager />}
              {section === "testimonials" && <TestimonialsManager />}
              {section === "leads" && <LeadsViewer />}
              {section === "contacts" && <ContactsViewer />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Admin Root ───────────────────────────────────────────────────────────────

export function Admin() {
  const [authState, setAuthState] = useState<"loading" | "login" | "dashboard">("loading");

  useEffect(() => {
    apiFetch("/admin/me")
      .then((r) => { if (r.ok) setAuthState("dashboard"); else setAuthState("login"); })
      .catch(() => setAuthState("login"));
  }, []);

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo-bseguros.png" alt="BSeguros" className="h-12 w-auto opacity-50 brightness-0 invert" />
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (authState === "login") return <AdminLogin onSuccess={() => setAuthState("dashboard")} />;
  return <AdminDashboard onLogout={() => setAuthState("login")} />;
}
