'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from "@/services/auth.service";
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
  isOpen?: boolean;
  onNavigate?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Administração', href: '/admin', roles: ['coordenador'] },
  { label: 'Professores', href: '/professores', roles: ['coordenador'] },
  { label: 'Alunos', href: '/alunos', roles: ['coordenador'] },
  { label: 'Temas', href: '/temas', roles: ['coordenador', 'professor'] },
  { label: 'Proposta', href: '/proposta', roles: ['aluno'] },
];

export default function Sidebar({ isOpen = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  const normalizedRole = (user?.user_metadata?.role as string | undefined)?.toLowerCase();

  // BUG CORRIGIDO: Lógica de filtro simplificada e correta
  const visibleNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return normalizedRole && item.roles.includes(normalizedRole);
  });

  async function handleLogout() {
    await authService.signOut();
    logout();
    onNavigate?.();
  }

  return (
    <aside
      className={`fixed top-0 z-50 flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar px-5 py-4 shadow-xl transition-all duration-300 ease-in-out md:left-0 md:shadow-none ${
        isOpen ? 'left-0' : '-left-[280px]'
      }`}
    >
      <div className="mb-8 w-full border-b border-white/10 pb-6 text-center">
        <Image
          src="/img/logo_capacete.png"
          alt="Logo"
          width={80}
          height={80}
          className="mx-auto mb-3 h-auto w-20 max-w-full drop-shadow-md"
          priority
        />
        <h2 className="font-heading m-0 text-xl font-bold uppercase tracking-wider text-primary">
          Aptus Defensio
        </h2>
      </div>

      <nav aria-label="Menu principal" className="flex flex-1 flex-col">
        <ul className="flex flex-1 list-none flex-col gap-2 p-0">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center rounded-xl px-4 py-3 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isActive
                      ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                      : 'text-white/70 hover:bg-white/5 hover:text-white hover:shadow-sm'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleLogout}
          className="mb-4 mt-auto flex w-full items-center rounded-xl px-4 py-3 font-medium text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}