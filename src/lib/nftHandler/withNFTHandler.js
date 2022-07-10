import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { NFTHandlerContext } from './nftHandlerContext';

export const withNFTHandler = (Component) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <NFTHandlerContext.Consumer>
      {(nftHandlerContext) => <Component {...props} ref={ref} nftHandlerContext={nftHandlerContext} />}
    </NFTHandlerContext.Consumer>
  ))

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
}