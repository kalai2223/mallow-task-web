/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from 'react';

import { Input, Form } from 'antd';

const { TextArea, Password } = Input;

type InputType = 'text' | 'password' | 'textarea' | 'number';

interface ReusableInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?: InputType;
    rules?: any[]; // AntD form rules
    disabled?: boolean;
    onChange?: (value: any) => void;
    value?: any;
    rows?: number; // for TextArea
    prefix?: React.ReactNode
    className?: string
    size?: 'small' | 'middle' | 'large'
    iconRender?: boolean
}

const InputComponent: React.FC<ReusableInputProps> = ({
    name,
    label,
    placeholder,
    type = 'text',
    rules,
    disabled = false,
    onChange,
    value,
    rows = 4,
    prefix,
    className,
    size,
}) => {
    const renderInput = () => {
        switch (type) {
            case 'password':
                return (
                    <Password
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        prefix={prefix}
                        className={className}
                        size={size}
                        iconRender={() => null}
                    />
                );
            case 'textarea':
                return (
                    <TextArea
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        rows={rows}
                        className={className}
                        size={size}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        prefix={prefix}
                        className={className}
                        size={size}
                    />
                );
            default:
                return (
                    <Input
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        prefix={prefix}
                        className={className}
                        size={size}
                    />
                );
        }
    };

    return (
        <Form.Item className="font-semibold" label={label} name={name} rules={rules}>
            {renderInput()}
        </Form.Item>
    );
};

export default InputComponent;
