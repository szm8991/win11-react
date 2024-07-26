import { useState } from 'react';
type InputOptions = {
  content: string;
  pointAt: number;
};

export const useCommandInput = () => {
  const [input, setInput] = useState<InputOptions>({
    content: '',
    pointAt: 0,
  });

  const clearInput = () => {
    setInput(() => ({
      content: '',
      pointAt: 0,
    }));
  };
  const arrowLeft = () =>
    setInput((input) => ({
      ...input,
      pointAt: input.pointAt - 1 >= 0 ? input.pointAt - 1 : 0,
    }));

  const arrowRight = () =>
    setInput((input) => ({
      ...input,
      pointAt: input.pointAt + 1 <= input.content.length ? input.pointAt + 1 : input.content.length,
    }));

  const backspace = () => {
    if (input.pointAt === 0) return;
    setInput((input) => ({
      ...input,
      content: input.content.slice(0, input.pointAt - 1) + input.content.slice(input.pointAt),
    }));
    arrowLeft();
  };

  const del = () => {
    setInput((input) => ({
      ...input,
      content: input.content.slice(0, input.pointAt) + input.content.slice(input.pointAt + 1),
    }));
  };

  return { input, setInput, arrowLeft, arrowRight, backspace, del, clearInput };
};
