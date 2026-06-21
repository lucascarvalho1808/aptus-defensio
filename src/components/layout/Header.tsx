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
  const user = useAuthStore((state) => state.user);

  const normalizedRole = (user?.user_metadata?.role as string | undefined)?.toLowerCase() ?? "";
  const roleLabel = roleLabels[normalizedRole] ?? 'Sem perfil';

  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        {showMenuButton && (
          <Button
            type="button"
            size="icon"
            aria-label="Abrir menu lateral"
            onClick={onMenuClick}
            className="bg-accent text-accent-foreground shadow-md shadow-accent/30 hover:bg-[#7a201d] md:hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        )}

        <Image
          src="/img/logo_capacete.png"
          alt="Logo Aptus Defensio"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 object-contain drop-shadow-sm"
        />

        <div className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wider text-primary/80">
            Aptus Defensio
          </span>
          <h1 className="font-heading truncate text-2xl font-bold tracking-wide text-primary md:text-3xl">
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
          className="h-auto gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
            <UserRound className="size-4" aria-hidden="true" />
          </span>

          <span className="min-w-0 text-left">
            <span className="block max-w-40 truncate text-sm font-semibold text-foreground">
              Olá, {user?.user_metadata?.nome ?? userName}!
            </span>
            <span className="block text-xs text-foreground/60">{roleLabel}</span>
          </span>

          <ChevronDown
            className={`size-4 text-primary transition-transform duration-200 ${
              isProfileOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </Button>

        {isProfileOpen && (
          <div
            role="menu"
            className="absolute right-0 z-40 mt-2 w-56 animate-in fade-in zoom-in-95 rounded-xl border border-primary/20 bg-sidebar p-4 shadow-xl"
          >
            <p className="font-semibold text-primary truncate">
              {user?.user_metadata?.nome ?? userName}
            </p>
            <p className="mt-1 text-sm text-foreground/70">Perfil: {roleLabel}</p>
          </div>
        )}
      </div>
    </header>
  );
}