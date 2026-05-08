import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';

const parseOptions = (options: any): { label: string; value: string }[] => {
  if (Array.isArray(options)) {
    return options.map((item) => {
      if (typeof item === 'string') return { label: item, value: item };
      return {
        label: String(item?.label ?? item?.value ?? ''),
        value: String(item?.value ?? item?.label ?? ''),
      };
    }).filter((item) => item.label || item.value);
  }

  if (typeof options !== 'string') return [];

  return options
    .split(/\r?\n|,/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const separatorIndex = raw.indexOf('|');
      if (separatorIndex >= 0) {
        return {
          label: raw.slice(0, separatorIndex).trim(),
          value: raw.slice(separatorIndex + 1).trim(),
        };
      }
      return { label: raw, value: raw };
    });
};

const inputTypes = ['text', 'email', 'tel', 'number', 'password', 'date', 'time', 'file', 'hidden'];

const toInputDomId = (fieldName: string) => {
  const safeName = String(fieldName || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `blocki_${safeName || 'field'}`;
};

export const BlockInput = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props || {};
  const type = p.type || 'text';
  const inputSizeClass = p.size ? ` input-${p.size}` : '';
  const labelSizeClass = p.size ? ` label-${p.size}` : '';
  const fieldName = p.fieldName || props.node.id;
  const inputClass = toInputDomId(fieldName);
  const inputId = `${inputClass}_${props.node.id}`;
  const options = parseOptions(p.options);
  const showLabel = type !== 'hidden' && p.showLabel !== false && !!p.label;
  const showHint = type !== 'hidden' && !!p.hint;
  const isChoiceType = type === 'radio' || type === 'checkbox';
  const requiredText = p.required === true ? <span class='required-mark'>*</span> : null;

  const commonControlProps: any = {
    id: inputId,
    name: fieldName,
    disabled: isPreview && p.disabled === true,
    readonly: p.readonly === true || (!isPreview && p.disableInDesign !== false),
    required: p.required === true,
    placeholder: p.placeholder || '',
    min: p.min || undefined,
    max: p.max || undefined,
    pattern: p.pattern || undefined,
  };

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1 0 auto' : '0 0 auto',
    width: p.width || '100%',
    boxSizing: 'border-box',
    ...(p._sys_css || {}),
    '.field-row': {
      display: type === 'hidden' ? 'none' : 'flex',
      flexDirection: p.layout === 'horizontal' ? 'row' : 'column',
      alignItems: p.layout === 'horizontal' ? (p.labelAlignItems || 'flex-start') : 'stretch',
      gap: p.layout === 'horizontal' ? (p.columnGap || '12px') : (p.rowGap || '6px'),
      width: '100%',
    },
    '.field-label': {
      width: p.layout === 'horizontal' ? (p.labelWidth || '120px') : 'auto',
      minWidth: p.layout === 'horizontal' ? (p.labelWidth || '120px') : '0',
      flex: p.layout === 'horizontal' ? '0 0 auto' : '0 0 auto',
      paddingTop: p.layout === 'horizontal' && !isChoiceType ? '8px' : '0',
      fontWeight: p.labelWeight || '600',
      color: p.labelColor || '',
      fontSize: p.labelFontSize || '',
      lineHeight: '1.4',
    },
    '.required-mark': {
      color: 'var(--error-color, #ff4d4f)',
      marginLeft: '4px',
    },
    '.field-control-wrap': {
      flex: p.layout === 'horizontal' ? `0 1 ${p.inputWidth || '100%'}` : '1 1 auto',
      width: p.layout === 'horizontal' ? (p.inputWidth || '100%') : (p.inputWidth || '100%'),
      minWidth: '0',
    },
    '.field-control': {
      width: '100%',
    //   boxSizing: 'border-box',
      padding: p.controlPadding || '',
      border: p.controlBorder || '',
      borderRadius: p.borderRadius || '',
      backgroundColor: p.controlBackgroundColor || '',
      color: p.controlColor || '',
      fontSize: p.controlFontSize || '',
    //   outline: 'none',
    },
    '.field-control:focus': {
      borderColor: p.focusBorderColor || 'var(--primary-color, #1890ff)',
      boxShadow: p.focusShadow || '0 0 0 2px rgba(24, 144, 255, 0.12)',
    },
    '.field-textarea': {
      minHeight: p.textareaHeight || '96px',
      resize: p.resize || 'vertical',
    },
    '.choice-list': {
      display: 'flex',
      flexDirection: p.optionsLayout === 'horizontal' ? 'row' : 'column',
      flexWrap: 'wrap',
      gap: p.optionsGap || (p.optionsLayout === 'horizontal' ? '16px' : '8px'),
      alignItems: p.optionsLayout === 'horizontal' ? 'center' : 'flex-start',
      paddingTop: p.layout === 'horizontal' ? '6px' : '0',
    },
    '.choice-item': {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      cursor: commonControlProps.disabled ? 'not-allowed' : 'pointer',
      opacity: commonControlProps.disabled ? 0.6 : 1,
      lineHeight: '1.4',
      userSelect: 'none',
    },
    '.field-hint': {
      marginTop: '6px',
      fontSize: p.hintFontSize || '12px',
      color: p.hintColor || 'var(--primary-color-dim, #666)',
      lineHeight: '1.4',
    },
    '.field-error': {
      display: p.errorMessage ? 'block' : 'none',
      marginTop: '6px',
      fontSize: p.errorFontSize || '12px',
      color: p.errorColor || 'var(--error-color, #ff4d4f)',
      lineHeight: '1.4',
    },
  };

  const renderControl = () => {
    if (type === 'hidden') {
      return <input id={inputId} class={inputClass} type='hidden' name={fieldName} value={p.defaultValue || ''} data-design-id={props.node.id} />;
    }

    if (type === 'textarea') {
      return (
        <textarea
          class={`field-control field-textarea input-base${inputSizeClass}`}
          {...commonControlProps}
        >{p.defaultValue || ''}</textarea>
      );
    }

    if (type === 'select') {
      return (
        <select class={`field-control input-base${inputSizeClass}`} {...commonControlProps}>
          {p.placeholder && <option value=''>{p.placeholder}</option>}
          {options.map((option) => (
            <option value={option.value} selected={String(p.defaultValue ?? '') === option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'radio' || type === 'checkbox') {
      const choiceOptions = options.length > 0 ? options : [{ label: p.label || fieldName, value: p.defaultValue || 'on' }];
      const defaultValues = String(p.defaultValue ?? '').split(',').map((item) => item.trim()).filter(Boolean);
      return (
        <div class='choice-list' role={type === 'radio' ? 'radiogroup' : 'group'}>
          {choiceOptions.map((option, index) => {
            const choiceId = type === 'radio' ? `${inputId}-${index}` : inputId;
            const checked = defaultValues.includes(option.value) || (type === 'checkbox' && p.checked === true && index === 0);
            return (
              <label class={`choice-item input-label${labelSizeClass}`} for={choiceId}>
                <input
                  class={inputSizeClass.trim()}
                  id={choiceId}
                  type={type}
                  name={type === 'radio' ? fieldName : (p.checkboxAsArray === true ? `${fieldName}[]` : fieldName)}
                  value={option.value}
                  checked={checked}
                  disabled={commonControlProps.disabled}
                  readonly={commonControlProps.readonly}
                  required={p.required === true && index === 0}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      );
    }

    const safeType = inputTypes.includes(type) ? type : 'text';
    return <input class={`field-control input-base${inputSizeClass}`} type={safeType} value={safeType === 'file' ? undefined : (p.defaultValue || '')} {...commonControlProps} />;
  };

  if (type === 'hidden') {
    return <>{renderControl()}</>;
  }

  return (
    <div css={css} class={`block-input ${inputClass}`} data-design-id={props.node.id}>
      <div class='field-row'>
        {showLabel && (
          <label class={`field-label input-label${labelSizeClass}`} for={isChoiceType ? undefined : inputId}>
            {p.label}{requiredText}
          </label>
        )}
        <div class='field-control-wrap'>
          {renderControl()}
          {showHint && <div class='field-hint'>{p.hint}</div>}
          <div class='field-error'>{p.errorMessage}</div>
        </div>
      </div>
    </div>
  );
};
