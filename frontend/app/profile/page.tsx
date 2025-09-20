'use client';

import { useState } from 'react';
import HologramCard from '@/components/ui/HologramCard';
import Button3D from '@/components/ui/Button3D';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';

const initialPreferences = [
  { label: 'Alertas biométricas', description: 'Sincroniza ritmo cardíaco y niveles de energía', enabled: true },
  { label: 'Recordar alergias', description: 'Resalta ingredientes sensibles en cada pedido', enabled: true },
  { label: 'Compartir mood', description: 'Ajusta sabores según tu música y clima', enabled: false }
];

export default function ProfilePage() {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleToggle = (label: string, enabled: boolean) => {
    setPreferences((prev) => prev.map((preference) => (preference.label === label ? { ...preference, enabled } : preference)));
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-neon">Perfil sensorial</p>
        <h1 className="text-4xl font-display leading-tight">Personaliza tu identidad gastronómica</h1>
        <p className="max-w-xl text-white/70">
          Ajusta notificaciones, preferencias nutricionales y tu identidad visual para cada experiencia gastronómica.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          {preferences.map((preference) => (
            <HologramCard
              key={preference.label}
              title={preference.label}
              description={preference.description}
              icon={<span aria-hidden className="text-3xl">✨</span>}
            >
              <ToggleSwitch
                label="Activar"
                description="Configura en tiempo real"
                checked={preference.enabled}
                onChange={(value) => handleToggle(preference.label, value)}
              />
            </HologramCard>
          ))}
        </div>
        <aside className="space-y-6">
          <HologramCard
            title="Modo visual"
            description="Alterna entre temas para tus dispositivos"
            icon={<span aria-hidden className="text-3xl">🎛️</span>}
          >
            <ThemeToggle />
          </HologramCard>
          <HologramCard
            title="Sincronizar dispositivos"
            description="Vincula tu app móvil y pantallas holográficas"
            icon={<span aria-hidden className="text-3xl">🔗</span>}
            action={<Button3D variant="ghost" as="link" href="/">Ver tutorial</Button3D>}
          >
            Te enviaremos un código QR único para conectar tu cuenta con experiencias AR compartidas.
          </HologramCard>
        </aside>
      </section>
    </div>
  );
}
