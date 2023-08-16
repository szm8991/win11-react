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
import { useEffect, useState } from 'react';
export function useBatteryStatus() {
  const [battery, setBattery] = useState<BatteryManager>();
  const [level, setLevel] = useState<number>();
  const [charging, setCharging] = useState<boolean>();
  const updateBatteryStatus = () => {
    void (async () => {
      const batteryStatus = await navigator.getBattery();
      setBattery(batteryStatus);
      setLevel(batteryStatus.level);
      setCharging(batteryStatus.charging);
    })();
  };
  useEffect(() => {
    updateBatteryStatus();
    if (!(battery instanceof BatteryManager)) return;
    battery.addEventListener('chargingchange', updateBatteryStatus);
    battery.addEventListener('levelchange', updateBatteryStatus);

    return () => {
      if (!(battery instanceof BatteryManager)) return;
      battery.removeEventListener('chargingchange', updateBatteryStatus);
      battery.removeEventListener('levelchange', updateBatteryStatus);
    };
  }, [battery]);
  return {
    level,
    charging,
  };
}
