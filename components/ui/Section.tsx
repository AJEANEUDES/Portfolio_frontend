'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import clsx from 'clsx';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  alternate?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  icon,
  children,
  className,
  alternate = false,
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={id}
      className={clsx(
        'py-16 sm:py-24',
        alternate && 'bg-gray-50 dark:bg-gray-900/50',
        className
      )}
    >
      <div className="section-container" ref={ref}>
        <div
          className={clsx(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="section-title flex items-center justify-center gap-3">
            {icon && <span className="text-primary-600 dark:text-primary-400">{icon}</span>}
            {title}
          </h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <div
          className={clsx(
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}