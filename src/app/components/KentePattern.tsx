interface KentePatternProps {
  className?: string;
}

export function KentePattern({ className = "" }: KentePatternProps) {
  return (
    <div className={`flex h-[6px] ${className}`}>
      <div className="flex-1 bg-[#0F7B6C]" />
      <div className="flex-1 bg-[#FFC300]" />
      <div className="flex-1 bg-[#1E3A8A]" />
      <div className="flex-1 bg-[#C1121F]" />
      <div className="flex-1 bg-[#0F7B6C]" />
      <div className="flex-1 bg-[#FFC300]" />
      <div className="flex-1 bg-[#1E3A8A]" />
      <div className="flex-1 bg-[#C1121F]" />
    </div>
  );
}
