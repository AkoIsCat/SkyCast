import  CloudIcon from '@/shared/asset/cloud.svg';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <CloudIcon />
      <p className="text-2xl font-semibold lg:text-4xl">Weather</p>
    </div>
  );
};
