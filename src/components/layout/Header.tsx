'use client';

import { ChevronDown, LogOut, Menu, Moon, Sun, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { clearStoredAuth } from '@/lib/auth-storage';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';

interface HeaderProps {
  userName?: string;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

const roleLabels: Record<string, string> = {
  aluno: 'Aluno',
  coordenador: 'Coordenador',
  professor: 'Professor',
};

function subscribeToClientMount() {
  return () => undefined;
}

export default function Header({
  userName = 'Usuário',
  showMenuButton = true,
  onMenuClick,
}: HeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const roleLabel = role ? roleLabels[role] : 'Sem perfil';
  const isDarkTheme = resolvedTheme === 'dark';
  const displayName = user?.user_metadata?.nome ?? user?.email ?? userName;

  function toggleTheme() {
    setTheme(isDarkTheme ? 'light' : 'dark');
  }

  async function handleLogout() {
    await authService.signOut();
    clearStoredAuth();
    clearAuth();
    setIsProfileOpen(false);
    router.replace('/login');
    router.refresh();
  }

  return (
    <header className="mb-8 flex items-center justify-between border-b border-border pb-5">
      <div className="flex min-w-0 items-center">
        {showMenuButton && (
          <Button
            type="button"
            size="icon"
            aria-label="Abrir menu lateral"
            onClick={onMenuClick}
            className="bg-accent text-accent-foreground shadow-md shadow-accent/30 hover:bg-[var(--accent-hover)] md:hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            mounted && isDarkTheme
              ? 'Alternar para tema claro'
              : 'Alternar para tema escuro'
          }
          disabled={!mounted}
          onClick={toggleTheme}
          className="rounded-xl border border-border bg-card text-primary hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
        >
          {mounted && isDarkTheme ? (
            <Sun className="size-4" aria-hidden="true" />
          ) : (
            <Moon className="size-4" aria-hidden="true" />
          )}
        </Button>

        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((current) => !current)}
            className="h-auto gap-3 rounded-xl border border-border bg-card px-4 py-2 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
              <UserRound className="size-4" aria-hidden="true" />
            </span>

            <span className="min-w-0 text-left">
              <span className="block max-w-40 truncate text-sm font-semibold text-foreground">
                Olá, {displayName}!
              </span>
              <span className="block text-xs text-muted-foreground">
                {roleLabel}
              </span>
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
              className="absolute right-0 z-40 mt-2 w-56 animate-in fade-in zoom-in-95 rounded-xl border border-border bg-popover p-4 shadow-xl"
            >
              <p className="font-semibold text-primary truncate">
                {displayName}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Perfil: {roleLabel}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={handleLogout}
                className="mt-4 w-full justify-start gap-2 border border-border text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
