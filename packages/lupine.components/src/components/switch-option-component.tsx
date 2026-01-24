import { bindGlobalStyle, CssProps, RefProps } from 'lupine.components';

export type SwitchOptionHookComponentProps = {
    setValue?: (value: string) => void;
    getValue?: () => string;
};
export type SwitchOptionComponentProps = {
    option1: string;
    option2: string;
    defaultOption: string;
    onChange?: (value: string) => void;
    hook?: SwitchOptionHookComponentProps;
    fontSize?: string;
};
export const SwitchOptionComponent = (props: SwitchOptionComponentProps) => {
    const css: CssProps = {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '9999px',
        padding: '2px 4px',
        fontSize: '0.7rem',
        backgroundColor: '#e7e7e7',
        width: 'fit-content',
        '.switch-btn': {
            padding: '4px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },
        '.switch-btn:first-child': {
            marginRight: '4px',
        },
        '.switch-btn.active': {
            backgroundColor: '#fff',
            color: '#000000',
            boxShadow: '2px 1px 2px 1px rgb(189 189 189)',
        },
    };
    bindGlobalStyle('switch-option-box', css);

    const onNotationChange = (value: string) => {
        props.defaultOption = value;
        const btns = ref.$all('.switch-btn') as NodeListOf<Element>;
        btns[0].classList.toggle('active', value === props.option1);
        btns[1].classList.toggle('active', value === props.option2);
        props.onChange?.(value);
    };
    if (props.hook) {
        props.hook.setValue = (value: string) => {
            onNotationChange(value);
        };
        props.hook.getValue = () => props.defaultOption;
    }
    const ref: RefProps = {};
    return (
        <div style={{ fontSize: props.fontSize }} ref={ref} class='switch-option-box'>
            <button
                onClick={() => onNotationChange(props.option1)}
                className={`switch-btn ${props.defaultOption === props.option1 ? 'active' : ''}`}
            >
                {props.option1}
            </button>
            <button
                onClick={() => onNotationChange(props.option2)}
                className={`switch-btn ${props.defaultOption === props.option2 ? 'active' : ''}`}
            >
                {props.option2}
            </button>
        </div>
    );
};
