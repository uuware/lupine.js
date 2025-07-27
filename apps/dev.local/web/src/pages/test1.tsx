import { ComponentFactory, CssProps, PageProps, RefProps } from 'lupine.components';

export const Test1Component = (props: {}) => {
  const ref: RefProps = {};
  const session = ComponentFactory.getSession(Test1Component);
  const onClick = async () => {
    session.test = 'time:' + new Date().toLocaleString();
    ComponentFactory.refresh(Test1Component, props, ref);
  };
  return (
    <div ref={ref}>
      <div>Test1Component: {session.test}</div>
      <button onClick={onClick}>Change</button>
    </div>
  );
};

export const Test1Page = async (props: PageProps) => {
  const css: CssProps = {
    color: 'red',
  };

  const ref: RefProps = {};
  const session = ComponentFactory.getSession(Test1Page);
  const onClick = async () => {
    session.test = 'time:' + new Date().toLocaleString();
    ComponentFactory.refresh(Test1Page, props, ref);
  };
  return (
    <div css={css} ref={ref}>
      <div>Test1Page: {session.test}</div>
      <button onClick={onClick}>Change</button>
      <Test1Component />
    </div>
  );
};
