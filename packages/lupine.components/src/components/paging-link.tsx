import { CssProps, RefProps, bindGlobalStyles, getRenderPageProps } from 'lupine.web';

let _DEFAULT_PAGE_LIMIT = 10;
export const getDefaultPageLimit = () => {
  return _DEFAULT_PAGE_LIMIT;
};
export const setDefaultPageLimit = (limit: number) => {
  _DEFAULT_PAGE_LIMIT = limit;
};
const pageLinkOptions = [10, 20, 50, 100, 200, 500];
export type PagingLinkProps = {
  itemsCount: number;
  pageLimit?: number;
  pageIndex?: number;
  baseLink: string;
  onClick?: (index: number) => void; // if onClick is set then use it instead of href
  textPerpage?: string;
  textOk?: string;
  textTo?: string;
  textPage?: string;
  showControl?: boolean;
};

export const PagingLink = ({
  itemsCount,
  pageLimit = getDefaultPageLimit(),
  pageIndex = 0,
  baseLink,
  onClick,
  textPerpage = '/Page',
  textOk = 'Go',
  textTo = 'To',
  textPage = 'Page',
  showControl,
}: PagingLinkProps) => {
  const css: CssProps = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    textAlign: 'right',
    padding: '6px 16px 6px 0',
    fontSize: '14px',
    '.paging-link-index a, .paging-link-index.current': {
      padding: '2px 6px',
      textDecoration: 'none',
    },
    '.paging-link-index.current': {
      fontWeight: 'bold',
    },
    'span.paging-link-index a:hover, span.paging-link-go a:hover': {
      textDecoration: 'underline',
    },
    '.paging-link-ctl-box': {
      display: 'flex',
      alignItems: 'center',
    },
    '.paging-link-ctl-box .paging-link-jump': {
      width: '50px',
      padding: '1px 3px',
      margin: '0 3px',
      textAlign: 'right',
    },
    '.paging-link-ctl-box .paging-link-limit': {
      width: '90px',
      padding: '1px 3px',
      margin: '0 3px',
    },
    '.paging-link-ok': {
      margin: '0 3px',
    },
  };

  bindGlobalStyles('paging-link-box', css);
  pageIndex = pageIndex ?? (Number.parseInt(getRenderPageProps().query['pg_i'] || '') || 0);
  pageLimit = pageLimit || _DEFAULT_PAGE_LIMIT;
  let maxPages = Math.floor(itemsCount / pageLimit);
  if (itemsCount > 0 && pageLimit > 0) {
    if (itemsCount % pageLimit !== 0) {
      maxPages++;
    }
    if (pageIndex > maxPages) {
      pageIndex = maxPages - 1;
    }
  }

  const onPageLimitChange = (e: Event) => {
    const limit = Number((e.target as HTMLSelectElement).value || '0');
    if (limit > 0) {
      setDefaultPageLimit(limit);
      onClick && onClick(pageIndex);
    }
  };

  const onOkClick = () => {
    let index = Number((ref.$('.paging-link-jump') as HTMLInputElement).value || '0');
    if (index < 1) {
      index = 1;
    }
    if (index > maxPages) {
      index = maxPages;
    }
    onClick && onClick(index - 1);
  };

  const ref: RefProps = {};
  return (
    <div ref={ref} class='paging-link-box'>
      {pageIndex > 0 ? (
        <span class='paging-link-go'>
          <a
            href={onClick ? 'javascript:void(0)' : baseLink + '?pg_i=' + (pageIndex - 1)}
            onClick={() => onClick && onClick(pageIndex - 1)}
          >
            &lt;
          </a>
        </span>
      ) : (
        <span class='paging-link-go disabled'>&lt;</span>
      )}

      {Array.from({ length: maxPages }, (_, i) => i).map((i) => (
        <>
          {i < 2 || i >= maxPages - 2 || (i > pageIndex - 3 && i < pageIndex + 3) ? (
            i == pageIndex ? (
              <span class='paging-link-index current'>{i + 1}</span>
            ) : (
              <span class='paging-link-index'>
                <a
                  href={onClick ? 'javascript:void(0)' : baseLink + '?pg_i=' + i}
                  onClick={() => onClick && onClick(i)}
                >
                  {i + 1}
                </a>
              </span>
            )
          ) : (
            (i == pageIndex - 4 || i == pageIndex + 4) && <span class='paging-link-skip'>...</span>
          )}
        </>
      ))}

      {pageIndex < maxPages - 1 ? (
        <span class='paging-link-go'>
          <a
            href={onClick ? 'javascript:void(0)' : baseLink + '?pg_i=' + (pageIndex + 1)}
            onClick={() => onClick && onClick(pageIndex + 1)}
          >
            &gt;
          </a>
        </span>
      ) : (
        <span class='paging-link-go disabled'>&gt;</span>
      )}
      {showControl && (
        <div class='paging-link-ctl-box'>
          {textTo}
          <input class='input-base paging-link-jump input-s' type='number' value={pageIndex + 1} /> / {maxPages}{' '}
          {textPage}
          <button class='button-base button-s paging-link-ok' onClick={onOkClick}>
            {textOk}
          </button>
          <select class='input-base paging-link-limit input-s' onChange={onPageLimitChange}>
            <option value=''> - </option>
            {pageLinkOptions.map((page) => (
              <option value={page}>
                {page}
                {textPerpage}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
