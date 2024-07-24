export type FolderItem = {
  id: number;
  name: string;
  content?: string | JSX.Element;
  childIds?: number[];
  parentId: number;
};

export const FolderSystem: Record<number, FolderItem> = {
  0: {
    id: 0,
    name: '/home/szm8991',
    childIds: [1, 2, 3],
    parentId: 0,
  },
  1: {
    id: 1,
    name: 'Desktop',
    childIds: [4, 5],
    parentId: 0,
  },
  2: {
    id: 2,
    name: 'Documents',
    childIds: [],
    parentId: 0,
  },
  3: {
    id: 3,
    name: 'about.md',
    content: (
      <ul>
        <li>👋 Hi, I'm @szm8991</li>
        <li>📫 Contact me: https://github.com/szm8991</li>
      </ul>
    ),
    parentId: 0,
  },
  4: {
    id: 4,
    name: 'Reactdemo',
    childIds: [6],
    parentId: 1,
  },
  5: {
    id: 5,
    name: 'Nextdemo',
    childIds: [],
    parentId: 1,
  },
  6: {
    id: 6,
    name: 'useState.txt',
    content: <div>const [loading,setLoading]=useState(false)</div>,
    parentId: 4,
  },
};
