import React from 'react';
import {getAllThemesPath} from "@/entity/Theme/model/theme_paths";
import {Theme} from "@/entity/Theme/model/types";
import {ThemeInfo} from '@/entity/Theme';
import {BoardInfo} from "@/entity/Board";

type ThemesTableProps = {
    themes: Theme[]
};
const ThemesTable = async ({themes}: ThemesTableProps) => {
    return (
        <>
            {
                themes.map(theme =>
                    (<div key={theme.id}>
                        <ThemeInfo theme={theme}/>
                        <hr/>
                        {theme.boards && theme.boards.map(board => (
                            <div key={board.id}>
                                <BoardInfo board={board}/>
                                <br/>
                            </div>
                        ))}
                        {theme.id < themes.length - 1 - 1 && <hr/>}
                    </div>))
            }
        </>
    );
};

export default ThemesTable;
