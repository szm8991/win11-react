/// <reference types="./type.d.ts" />
interface BatteryManager extends BatteryManagerEventTarget {
  readonly charging: boolean;
  readonly chargingTime: number;
  readonly dischargingTime: number;
  readonly level: number;
}

interface BatteryManagerEventTargetEventMap {
  chargingchange: Event;
  chargingtimechange: Event;
  dischargingtimechange: Event;
  levelchange: Event;
}

interface BatteryManagerEventTarget extends EventTarget {
  onchargingchange: (this: BatteryManager, ev: Event) => unknown;
  onlevelchange: (this: BatteryManager, ev: Event) => unknown;
  onchargingtimechange: (this: BatteryManager, ev: Event) => unknown;
  ondischargingtimechange: (this: BatteryManager, ev: Event) => unknown;
  addEventListener<K extends keyof BatteryManagerEventTargetEventMap>(
    type: K,
    listener: (this: BatteryManager, ev: BatteryManagerEventTargetEventMap[K]) => unknown,
    useCapture?: boolean
  ): void;
}
import { useEffect, useRef, useState } from 'react';
export function useBatteryStatus() {
  const battery = useRef<BatteryManager>();
  const [level, setLevel] = useState<number>();
  const [charging, setCharging] = useState<boolean>();

  void (async () => {
    battery.current = await navigator.getBattery();
  })();

  const updateBatteryStatus = () => {
    if (battery.current) {
      setLevel(battery.current.level);
      setCharging(battery.current.charging);
    }
  };
  useEffect(() => {
    updateBatteryStatus();
    if (!(battery.current instanceof BatteryManager)) return;
    battery.current.addEventListener('chargingchange', updateBatteryStatus);
    battery.current.addEventListener('levelchange', updateBatteryStatus);

    return () => {
      if (!(battery.current instanceof BatteryManager)) return;
      battery.current.removeEventListener('chargingchange', updateBatteryStatus);
      battery.current.removeEventListener('levelchange', updateBatteryStatus);
    };
  }, [battery]);
  return {
    level,
    charging,
  };
}
