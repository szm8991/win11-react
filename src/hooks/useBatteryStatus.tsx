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
import { useEffect, useRef } from 'react';
export function useBatteryStatus() {
  const battery = useRef<BatteryManager | null>(null);
  const updateBatteryStatus = () => {
    void (async () => {
      battery.current = await navigator.getBattery();
    })();
  };
  useEffect(() => {
    void (async () => {
      battery.current = await navigator.getBattery();
      if (!(battery.current instanceof BatteryManager)) return;
      battery.current.addEventListener('chargingchange', updateBatteryStatus);
      battery.current.addEventListener('levelchange', updateBatteryStatus);
    })();

    return () => {
      if (!(battery.current instanceof BatteryManager)) return;
      battery.current.removeEventListener('chargingchange', updateBatteryStatus);
      battery.current.removeEventListener('levelchange', updateBatteryStatus);
    };
  }, []);
  return battery;
}
