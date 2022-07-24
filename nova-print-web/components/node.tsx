import { NodeProfile, Profile } from '@nova-print/nova-print-libs';
import { FC } from 'react';

import Printer from './printer';

interface NodeProps {
  node: NodeProfile;
  printers: Profile[];
}

const Node: FC<NodeProps> = ({ node, printers }) => {
  return (
    <div>
      <h1>{node.name}</h1>
      {printers.map((printer) => (
        <Printer key={printer.id} printer={printer} />
      ))}
    </div>
  );
};

export default Node;
