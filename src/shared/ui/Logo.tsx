import CloudIcon from '@/shared/asset/cloud.svg';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <CloudIcon className="w-14 h-14 lg:w-12 lg:h-12" />
      <p className="text-2xl font-medium lg:text-4xl">Weather</p>
    </div>
  );
};
