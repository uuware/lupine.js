import { isFrontEnd } from 'lupine.components';
import { AdminDesignControl } from './design/admin-design-control';

export const SavePage = (props: {
  menuIdReadonly?: boolean;
  menuId: string;
  title: string;
  note: string;
  package: string;
}) => {
  return (
    <div className='save-menu'>
      <div class='row-box mb-s'>
        <div class='w-7'>Menu Id:</div>
        <input type='text' id='s_menuId' value={props.menuId} class='input-base w-20' readonly={props.menuIdReadonly} />
      </div>
      <div class='row-box mb-s'>
        <div class='w-7'>Menu Title:</div>
        <input type='text' id='s_menuTitle' value={props.title} class='input-base w-20' />
      </div>
      <div class='row-box mb-s'>
        <div class='w-7'>Menu Description:</div>
        <input type='text' id='s_menuNote' value={props.note} class='input-base w-20' />
      </div>
      <div class='row-box mb-s'>
        <div class='w-7'>Package id:</div>
        <input type='text' id='s_menuPackage' value={props.package} class='input-base w-20' />
      </div>
    </div>
  );
};

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
