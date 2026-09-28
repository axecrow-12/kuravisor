import { Icon } from "./ui";

export default function AuthLayout({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col topo-pattern">
      <div className="flex flex-col items-center justify-center px-6 pt-14 pb-8">
        <div className="size-18 rounded-full bg-primary/20 flex items-center justify-center mb-5 border-2 border-primary/40 glow">
          <Icon name={icon} className="text-brand text-4xl" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
        <p className="text-sm text-slate-500 text-center max-w-xs">{subtitle}</p>
      </div>
      <div className="flex-1 bg-white dark:bg-white/5 rounded-t-3xl px-6 pt-8 pb-10 border-t border-primary/10 card">
        {children}
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-sm rounded-xl p-3"
    >
      <Icon name="error" className="text-lg mt-px" />
      <span>{message}</span>
    </div>
  );
}
