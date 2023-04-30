import { useReducer } from 'react';

export interface AutocompleteState {
  inputValue: string;
  filteredOptions: string[];
  showOptions: boolean;
  loading: boolean;
  typing: boolean;
  selectedValue?: string;
}

type AutocompleteAction =
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'SET_FILTERED_OPTIONS'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'HANDLE_ON_BLUR' }
  | { type: 'SELECT_OPTION'; payload: string };

const initialState: AutocompleteState = {
  inputValue: '',
  selectedValue: '',
  filteredOptions: [],
  showOptions: false,
  loading: false,
  typing: false,
};

function autocompleteReducer(state: AutocompleteState, action: AutocompleteAction): AutocompleteState {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.payload,
        showOptions: Boolean(action.payload),
        filteredOptions: [],
        typing: true,
      };
    case 'HANDLE_ON_BLUR':
      return { ...state, filteredOptions: [], inputValue: '', showOptions: false };
    case 'SET_FILTERED_OPTIONS':
      return { ...state, filteredOptions: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload, typing: false };
    case 'SELECT_OPTION':
      return { ...state, inputValue: '', filteredOptions: [], showOptions: false, selectedValue: action.payload };
    default:
      return state;
  }
}

export const useAutocomplete = () => {
  return useReducer(
    autocompleteReducer,
    initialState
  );
};
