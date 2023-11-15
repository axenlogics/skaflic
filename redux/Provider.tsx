import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import { startUpAfterProviderReady } from '../startup';
import { store } from './Store';

const GlobalProvider: any = ({children}: any) => {
  // startUpAfterProviderReady();
  return (
    <Provider
      store={store}>
      {children}
    </Provider>
  );
};

export default GlobalProvider;

// export const GlobalContext = createContext({});

// const GlobalProvider: any = ({children}: any) => {
//   const [authState, authDispatch]: any = useReducer(auth, authInitialState);
//   const [pairState, pairDispatch]: any = useReducer(pair, pairInitialState);

//   return (
//     <GlobalContext.Provider
//       value={{authState, authDispatch, pairState, pairDispatch}}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;
