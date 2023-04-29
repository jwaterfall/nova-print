'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { HiRocketLaunch, HiSquares2X2, HiFolder, HiCog6Tooth } from 'react-icons/hi2';
import numbro from 'numbro';

import useController from '@/utils/Controller';

interface SidebarLinkProps {
  Icon: IconType;
  href: string;
  exact?: boolean;
}

const SidebarLink: FC<PropsWithChildren<SidebarLinkProps>> = ({ Icon, href, exact = true, children }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${isActive ? 'bg-blue-500 text-neutral-50' : 'hover:bg-neutral-950/5'}`}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );
};

const Sidebar: FC = () => {
  const { connected, connect, disconnect, useModel } = useController();
  const { data } = useModel('boards', true);

  return (
    <aside className="p-4 w-80 bg-neutral-100 border-r border-neutral-200 flex flex-col gap-4">
      <div className="p-8 flex flex-col gap-4 items-center">
        <div className="flex items-center justify-center gap-2">
          <HiRocketLaunch size={48} className="text-blue-500" />
          <h2 className="text-neutral-950 text-2xl font-semibold">Nova Print</h2>
        </div>
        <h6 className="text-xs font-medium text-center text-neutral-500">A lightweight 3D printer interface</h6>
      </div>
      <div className="bg-neutral-50 rounded-xl border border-neutral-200">
        <div className="p-4">
          {connected && (
            <>
              <h4 className="text-lg font-medium">Ender 3 Pro</h4>
              <h6 className="text-sm text-neutral-500">Firmware: v{data?.[0]?.firmwareVersion}</h6>
              <h6 className="text-sm text-neutral-500 mb-4">MCU Temp: {numbro(data?.[0]?.mcuTemp?.current).format('0.0')}°C</h6>
            </>
          )}
          {connected ? (
            <button className="bg-red-500 text-neutral-50 text-sm rounded-xl px-4 py-2 w-full" onClick={disconnect}>
              Disconnect
            </button>
          ) : (
            <button className="bg-blue-500 text-neutral-50 text-sm rounded-xl px-4 py-2 w-full" onClick={connect}>
              Connect
            </button>
          )}
        </div>
        {connected && (
          <div className="p-4 border-t border-neutral-200">
            <h6 className="text-xs font-medium text-neutral-500">Printing...</h6>
            <h5 className="text-sm font-medium truncate mt-1">Ender3-cooling-duct.gcode</h5>
          </div>
        )}
      </div>
      <nav className="flex flex-col gap-2">
        <SidebarLink href="/" Icon={HiSquares2X2}>
          Overview
        </SidebarLink>
        <SidebarLink href="/files" Icon={HiFolder}>
          Files
        </SidebarLink>
        <SidebarLink href="/settings" Icon={HiCog6Tooth}>
          Settings
        </SidebarLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
