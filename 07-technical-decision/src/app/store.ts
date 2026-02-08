// Simple store for wizard data
export interface WizardData {
  projectName: string;
  teamSize: string;
  userLoad: string;
  criticalFeatures: string;
  scalability: number;
  performance: number;
  expertiseLevel: number;
  timeToMarket: number;
  cost: number;
  flexibility: number;
}

const defaultData: WizardData = {
  projectName: "",
  teamSize: "",
  userLoad: "",
  criticalFeatures: "",
  scalability: 50,
  performance: 50,
  expertiseLevel: 50,
  timeToMarket: 33,
  cost: 33,
  flexibility: 34,
};

let data: WizardData = { ...defaultData };
const listeners: Array<() => void> = [];

export const wizardStore = {
  getData: () => data,
  setData: (updates: Partial<WizardData>) => {
    data = { ...data, ...updates };
    listeners.forEach((listener) => listener());
  },
  reset: () => {
    data = { ...defaultData };
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },
};
