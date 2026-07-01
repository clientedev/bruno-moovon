import { Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/logo-bruno-saraiva.png"
                alt="Bruno Saraiva"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-6 text-sm">
              Protegendo famílias, empresários e patrimônios com excelência e exclusividade há mais de 7 anos.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/5511966088872" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white">
                <Phone className="w-4 h-4" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a href="https://instagram.com/moovonconsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:moovon.consulting@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white">
                <Mail className="w-4 h-4" />
                <span className="sr-only">E-mail</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors text-sm">Início</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors text-sm">Conheça o Fundador</a></li>
              <li><a href="#solucoes" className="text-gray-400 hover:text-white transition-colors text-sm">Nossas Soluções</a></li>
              <li><a href="#mentoria" className="text-gray-400 hover:text-white transition-colors text-sm">Mentoria Financeira</a></li>
              <li><a href="#depoimentos" className="text-gray-400 hover:text-white transition-colors text-sm">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Soluções</h4>
            <ul className="space-y-3">
              <li><a href="#solucoes" className="text-gray-400 hover:text-white transition-colors text-sm">Seguro de Vida Individual</a></li>
              <li><a href="#solucoes" className="text-gray-400 hover:text-white transition-colors text-sm">Proteção para Empresários</a></li>
              <li><a href="#solucoes" className="text-gray-400 hover:text-white transition-colors text-sm">Planejamento Sucessório</a></li>
              <li><a href="#solucoes" className="text-gray-400 hover:text-white transition-colors text-sm">Blindagem Financeira</a></li>
              <li><a href="#ebook" className="text-gray-400 hover:text-white transition-colors text-sm">E-book Gratuito</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">(11) 96608-8872</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">moovon.consulting@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Atendimento em todo o Brasil (Online e Presencial)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} MOOVON Consulting Corretora de Seguros de Vida. Todos os direitos reservados.<br className="hidden md:block" />
            CNPJ: 27.757.003/0001-20
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">Política de Privacidade</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
