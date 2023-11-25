import React from 'react';
import styles from './Theme.module.scss';
import {Theme} from "@/entity/Theme/model/types";

type ThemeProps = {
    theme: Theme
};

const ThemeInfo = ({ theme }: ThemeProps) => {
    return (
        <div>
            <h3>{theme.name}</h3>
            <div>{theme.description}</div>
        </div>
    );
};

export default ThemeInfo;
