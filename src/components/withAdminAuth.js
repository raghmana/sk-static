import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/auth';

const withAdminAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/admin');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Add display name for debugging
  Wrapper.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default withAdminAuth;