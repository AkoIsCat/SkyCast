import CloudIcon from '@/shared/asset/cloud.svg';

export const Header = () => {
  return (
    <header className="flex items-center gap-3">
      <CloudIcon />
      <p className="text-2xl font-semibold">Weather</p>
    </header>
  );
};
