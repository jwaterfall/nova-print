interface Volume {
  capacity: number | bigint | null;
  freeSpace: number | bigint | null;
  mounted: boolean;
  name: string | null;
  openFiles: number | null;
  path: string | null;
  speed: number | null;
}

export default Volume;
