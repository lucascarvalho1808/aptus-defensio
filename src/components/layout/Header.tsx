'use client';

import { ChevronDown, Menu, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

interface HeaderProps {
  title?: string;
  userName?: string;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

const roleLabels: Record<string, string> = {
  aluno: 'Aluno',
  coordenador: 'Coordenador',
  professor: 'Professor',
};

export default function Header({
  title = 'Dashboard',
  userName = 'Usuário',
  showMenuButton = true,
  onMenuClick,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const role = useAuthStore((state) => state.role);
  const normalizedRole = role?.toLowerCase() ?? '';
  const roleLabel = roleLabels[normalizedRole] ?? 'Sem perfil';

  return (
    <header className="mb-10 flex flex-col gap-5 border-b border-white/5 pb-5 text-white md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {showMenuButton ? (
          <Button
            type="button"
            size="icon-lg"
            aria-label="Abrir menu lateral"
            onClick={onMenuClick}
            className="bg-[#8b2521] text-white shadow-[0_4px_10px_rgba(139,37,33,0.3)] hover:bg-[#7a201d] md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        ) : null}

        <Image
          src="/img/logo_capacete.png"
          alt="Logo Aptus Defensio"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 object-contain"
        />

        <div className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-[1px] text-[#c9a063]/80">
            Aptus Defensio
          </span>
          <h1 className="truncate font-serif text-2xl font-bold tracking-[1px] text-[#c9a063] md:text-[32px]">
            {title}
          </h1>
        </div>
      </div>

      <div className="relative self-start md:self-auto">
        <Button
          type="button"
          variant="ghost"
          aria-expanded={isProfileOpen}
          aria-haspopup="menu"
          onClick={() => setIsProfileOpen((current) => !current)}
          className="h-auto gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/80 hover:bg-[#2c3e50] hover:text-white"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[#c9a063]/30 bg-[#0b121e] text-[#c9a063]">
            <UserRound className="size-4" aria-hidden="true" />
          </span>

          <span className="min-w-0 text-left">
            <span className="block max-w-40 truncate text-sm font-semibold">
              Olá, {userName}!
            </span>
            <span className="block text-xs text-white/55">{roleLabel}</span>
          </span>

          <ChevronDown
            className={[
              'size-4 text-[#c9a063] transition-transform',
              isProfileOpen ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden="true"
          />
        </Button>

        {isProfileOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-40 mt-2 w-56 rounded-xl border border-[#c9a063]/20 bg-[#1a2c41] p-3 text-sm text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            <p className="font-semibold text-[#c9a063]">{userName}</p>
            <p className="mt-1 text-white/60">Perfil: {roleLabel}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
