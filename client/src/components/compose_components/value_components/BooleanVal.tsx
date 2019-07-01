import React from 'react';
import store from '../../../store';

type Props = {
    value: boolean
}

export const BooleanVal: React.FC<Props> = ({ value }) => {
    return (
        <span style={{ color: store.settings.colors.boolean }}><span>{String(value)}</span></span>
    )
}

