'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode
} from 'react';

type CartStep = 'menu' | 'customize' | 'review' | 'payment' | 'tracking';
export type OrderStatus = 'idle' | 'processing' | 'preparing' | 'en-route' | 'delivered';

export type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  tags?: string[];
  calories?: number;
  isArReady?: boolean;
  options?: { label: string; value: string }[];
};

type CartState = {
  items: CartItem[];
  step: CartStep;
  status: OrderStatus;
  lastUpdated: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_STEP'; payload: { step: CartStep } }
  | { type: 'SET_STATUS'; payload: { status: OrderStatus } }
  | { type: 'CLEAR' };

const initialState: CartState = {
  items: [],
  step: 'menu',
  status: 'idle',
  lastUpdated: Date.now()
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      const items = existing
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        : [...state.items, action.payload];
      return { ...state, items, lastUpdated: Date.now() };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        lastUpdated: Date.now()
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
          )
          .filter((item) => item.quantity > 0),
        lastUpdated: Date.now()
      };
    }
    case 'SET_STEP': {
      return { ...state, step: action.payload.step };
    }
    case 'SET_STATUS': {
      return { ...state, status: action.payload.status };
    }
    case 'CLEAR': {
      return { ...initialState, lastUpdated: Date.now() };
    }
    default:
      return state;
  }
}

const CartContext = createContext<{ state: CartState; dispatch: Dispatch<CartAction> } | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { state, dispatch } = context;

  const subtotal = useMemo(
    () => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items]
  );

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }),
    [dispatch]
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
    [dispatch]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    [dispatch]
  );

  const setStep = useCallback((step: CartStep) => dispatch({ type: 'SET_STEP', payload: { step } }), [dispatch]);

  const setStatus = useCallback(
    (status: OrderStatus) => dispatch({ type: 'SET_STATUS', payload: { status } }),
    [dispatch]
  );

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch]);

  return {
    state,
    subtotal,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    setStep,
    setStatus,
    clear
  };
}
