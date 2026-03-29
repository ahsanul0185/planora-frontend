import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export const KpiCard = ({ title, value, subtitle }: KpiCardProps) => {
  return (
    <div className="bg-card rounded-lg p-5 border flex flex-col justify-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
};
