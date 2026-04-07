'use client';

interface TechBadgeProps {
  name: string;
  icon?: string | null;
  size?: 'sm' | 'md';
}

export default function TechBadge({ name, icon, size = 'sm' }: TechBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-0.5 text-xs'
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 ${sizeClasses} rounded-full font-medium
        bg-primary-50 text-primary-700
        dark:bg-primary-900/30 dark:text-primary-300
        border border-primary-200 dark:border-primary-800
        transition-all duration-300 ease-out
        hover:bg-primary-600 hover:text-white hover:border-primary-600
        hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30
        hover:-translate-y-0.5
        cursor-default
      `}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-3.5 h-3.5 object-contain"
        />
      )}
      {name}
    </span>
  );
}