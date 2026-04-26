import { isFrontEnd } from 'lupine.components';
import { AdminDesignControl } from './design/admin-design-control';

export const AdminPageEditPage = (pageId: string) => {
  if (!isFrontEnd()) {
    return <div>No SSR.</div>;
  }

  return (
    <div style={{ height: '100%' }}>
       <AdminDesignControl pageId={pageId} />
    </div>
  );
};
