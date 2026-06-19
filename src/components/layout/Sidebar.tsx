'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Administração',
    href: '/admin',
    roles: ['coordenador'],
  },
  {
    label: 'Professores',
    href: '/professores',
    roles: ['coordenador'],
  },
  {
    label: 'Alunos',
    href: '/alunos',
    roles: ['coordenador'],
  },
  {
    label: 'Temas',
    href: '/temas',
    roles: ['coordenador', 'professor'],
  },
  {
    label: 'Proposta',
    href: '/proposta',
    roles: ['aluno'],
  },
];

export default function Sidebar({ isOpen = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);
  const roleLabel =
    typeof role === 'string'
      ? role
      : role && typeof (role as { role?: string }).role === 'string'
      ? (role as { role: string }).role
      : null;

  const normalizedRole =
    typeof roleLabel === 'string' ? roleLabel.toLowerCase() : null;

  const visibleNavItems = navItems.filter((item) => {
    if (!item.roles) {
      return true;
    }

    return normalizedRole !== null && item.roles.includes(normalizedRole);
  });

  function handleLogout() {
    sessionStorage.removeItem('usuarioAtivo');
    setRole(null);
    onNavigate?.();
  }

  return (
    <aside
      className={[
        'fixed top-0 z-50 flex h-screen w-[280px] flex-col border-r border-[#c9a063]/20 bg-[#1a2c41] px-5 py-[15px] text-white shadow-[5px_0_15px_rgba(0,0,0,0.5)] transition-[left] duration-300 ease-in-out md:left-0 md:shadow-none',
        isOpen ? 'left-0' : '-left-[280px]',
      ].join(' ')}
    >
      <div className="mb-10 w-full border-b border-[#c9a063]/10 pb-5 text-center">
        <Image
          src="/img/logo_capacete.png"
          alt="Logo"
          width={80}
          height={80}
          className="mx-auto mb-2.5 h-auto w-20 max-w-full"
          preload
        />

        <h2 className="font-heading m-0 text-[22px] font-bold uppercase tracking-[1px] text-[#c9a063]">
          Aptus Defensio
        </h2>
      </div>

      <nav aria-label="Menu principal" className="flex flex-1 flex-col">
        <ul className="flex flex-1 list-none flex-col p-0">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'mb-2 flex items-center rounded-xl px-5 py-[15px] font-medium text-white/70 transition duration-300',
                    isActive
                      ? 'bg-[#8b2521] text-white shadow-[0_4px_10px_rgba(139,37,33,0.3)]'
                      : 'hover:bg-[#2c3e50] hover:text-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)]',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/"
          onClick={handleLogout}
          className="mb-2 flex items-center rounded-xl px-5 py-[15px] font-medium text-white/70 transition duration-300 hover:bg-[#2c3e50] hover:text-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
        >
          <span>Sair</span>
        </Link>
      </nav>
    </aside>
  );
}
