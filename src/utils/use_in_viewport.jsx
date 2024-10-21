import React from 'react';
import PropTypes from 'prop-types';

export const UseInViewport = ({ cb, children }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const wrappedCb = (entries) => {
      cb(entries.some((e) => e.isIntersecting));
    };

    const observer = new IntersectionObserver(wrappedCb, options);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [cb]);

  return <div ref={ref}>{children}</div>;
};

UseInViewport.propTypes = {
  cb: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
