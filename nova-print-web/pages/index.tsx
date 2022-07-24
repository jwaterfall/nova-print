import { PrinterVolumeFormFactor, PrinterVolumeOrigin, Profile } from '@nova-print/nova-print-libs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Node from '../components/node';

const Home: NextPage = () => {
  const [printers, setPrinters] = useState<Profile[]>([
    {
      id: '1',
      name: 'MK3 White',
      model: 'MK3S',
      manufacturer: 'Prusa Research',
      volume: {
        width: 250,
        depth: 210,
        height: 210,
        formFactor: PrinterVolumeFormFactor.Rectangular,
        origin: PrinterVolumeOrigin.LowerLeft,
      },
      hasHeatedBed: true,
      hasHeatedChamber: false,
      extruders: {
        count: 1,
        nozzleDiameter: 0.4,
        sharedNozzle: false,
        defaultExtrusionLength: 25,
        defaultExtrusionFeedrate: 300,
      },
      axes: {
        x: {
          defauaultSpeed: 1000,
        },
        y: {
          defauaultSpeed: 1000,
        },
        z: {
          defauaultSpeed: 1000,
        },
      },
      nodeId: '1',
      serialPort: 'COM5',
      baudRate: 115200,
    },
  ]);

  return (
    <div>
      <Head>
        <title>nova-print</title>
      </Head>

      <Node
        printers={printers}
        node={{
          id: 'node1',
          name: 'Node 1',
          address: 'http://localhost:3001',
        }}
      />
    </div>
  );
};

export default Home;
