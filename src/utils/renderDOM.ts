import Block from '../services/Block';

export const renderDOM = (query: string, block: Block<object>) => {
  const root = document.querySelector(query);
  root!.append(block.getContent()!);
  return root;
};
