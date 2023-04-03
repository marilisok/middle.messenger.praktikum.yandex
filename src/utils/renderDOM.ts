import Block from '../services/Block';

export const renderDOM = (query: string, block: Block<object>) => {
  const root = document.querySelector(query);
  root!.innerHTML = '';
  root!.append(block.getContent()!);
  block.dispatchComponentDidMount();
  return root;
};
