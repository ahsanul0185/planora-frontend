import React from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard = ({ title, description, children, className = "" }: ChartCardProps) => {
  return (
    <div className={`bg-card rounded-lg p-6 border flex flex-col ${className}`}>
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex-1 flex flex-col w-full">
         {children}
      </div>
    </div>
  );
};
