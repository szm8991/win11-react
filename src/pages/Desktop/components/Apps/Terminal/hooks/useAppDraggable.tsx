import { useRef, useState } from 'react';
import { useDraggable } from '@neodrag/react';
import type { DragOptions } from '@neodrag/react';

export const useAppDraggable = (handle: string) => {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const options: DragOptions = {
    position,
    onDragStart: () => {
      const size = draggableRef.current?.dataset.size;
      if (size === 'full') {
        setPosition({ x: 0, y: 0 });
        return;
      }
      draggableRef.current?.classList.add('neodrag-dragging');
    },
    onDrag: ({ offsetX, offsetY }) => {
      const size = draggableRef.current?.dataset.size;
      if (size === 'full') {
        setPosition({ x: 0, y: 0 });
        return;
      }
      setPosition({ x: offsetX, y: offsetY });
    },
    onDragEnd: () => {
      const size = draggableRef.current?.dataset.size;
      if (size === 'full') {
        setPosition({ x: 0, y: 0 });
        return;
      }
      draggableRef.current?.classList.remove('neodrag-dragging');
    },
    bounds: 'parent',
    handle: handle,
  };
  useDraggable(draggableRef, options);

  return { draggableRef };
};
