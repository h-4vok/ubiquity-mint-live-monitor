import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { MonitorContext } from './monitorContext';

export const withMonitor = (Component) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <MonitorContext.Consumer>
      {(monitorContext) => <Component {...props} ref={ref} monitorContext={monitorContext} />}
    </MonitorContext.Consumer>
  ))

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
}