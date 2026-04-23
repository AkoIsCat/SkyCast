import type { SetStateAction } from 'react';

export type SearchSuggestionListType = {
  data: string[];
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
};
