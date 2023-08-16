export { };
declare global {
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
    addEventListener<K extends keyof BatteryManagerEventTargetEventMap>(type: K, listener: (this: BatteryManager, ev: BatteryManagerEventTargetEventMap[K]) => unknown, useCapture?: boolean): void;
  }

  interface Navigator {
    getBattery(): Promise<BatteryManager>;
  }

  const BatteryManager: ()=>BatteryManager;
}