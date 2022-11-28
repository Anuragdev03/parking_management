import { KeyboardTypeOptions } from "react-native";
// TextField component type
export interface TextField {
  onChange?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onPressIn?: () => void;
  value?: string;
  maxLength?: number;
  error?: string;
  testId?: string;
}

export interface ButtonType {
  onPress: () => void;
  text: string;
  type?: string;
  isLoading?: boolean;
  disable?: boolean;
  testId?: string;
}

export interface ParkingSlot {
  index: number;
  selected?: boolean;
  occupied?: boolean;
  small?: boolean;
  name?: string;
  disable?: boolean;
}

export interface OccupiedSpace {
  token: string | number;
  parkingTime: string;
  carRegNo: string;
  selectedSpace: []
}

// Redux store initial state
export interface ReduxStoreInitialState {
  parkingSpace: number;
  availableSpace: number;
  occupiedSpace: OccupiedSpace[];
  selectedSpace: string[];
  parkingSlotData: ParkingSlotType[];
  carRegNo: string;
  parkingTime: string;
  occupiedIds?: number[]
}

export interface ReducerObj {
  parkingReducer: {
    parkingSpace: number;
    availableSpace: number;
    occupiedSpace: [];
    selectedSpace: string[];
    parkingSlotData: [];
    carRegNo: string;
    parkingTime: string;
    occupiedIds?: number[]
  };
}

export interface ParkingSlotType {
  id: number;
  name: string;
}

export interface PropType {
  navigation: {
    push: Function;
  };
  route: {
    params: {
      message?: string
    }
  };
}