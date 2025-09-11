import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface DynamicRemoteComponentProps {
  scope: string;
  module: string;
}
// Dynamic Component Loader
const DynamicRemoteComponent:React.FC<DynamicRemoteComponentProps>  = ({ scope, module }) => {
    console.log("-----",scope,module,`${scope}/${module}`)
  const Component = React.lazy(() => import(`${scope}/${module}`));
  return (
    <Suspense fallback={<div>Loading {scope}...</div>}>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
};

export default DynamicRemoteComponent;