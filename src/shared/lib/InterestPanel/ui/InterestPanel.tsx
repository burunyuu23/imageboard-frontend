import React from 'react';
import styles from './InterestPanel.module.scss';

type InterestPanelProps = {
    headerButtons: React.ReactNode[],
    children: React.ReactNode,
};

const InterestPanel = ({headerButtons, children}: InterestPanelProps) => {
    return (
        <div>
            <header className={styles.header}>
                <div className={[styles.headerButtons].join(" ")}>
                    {headerButtons.map(
                        headerButton => (headerButton)
                    )}
                </div>
            </header>

            <div>
                {children}
            </div>
        </div>
    );
};

export default InterestPanel;
