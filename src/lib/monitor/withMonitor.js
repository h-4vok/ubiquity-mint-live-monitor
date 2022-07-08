import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { NFTHandlerContext } from './nftHandlerContext';

export const withNFTHandler = (Component) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <NFTHandlerContext.Consumer>
      {(context) => <Component {...props} ref={ref} context={context} />}
    </NFTHandlerContext.Consumer>
  ))

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
}