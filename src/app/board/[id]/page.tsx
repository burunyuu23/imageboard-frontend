import styles from './page.module.css'
import {getAllBoards} from "@/shared/api/board_paths";
import {Board} from "@/entity/Board";

export const dynamicParams = false;
export const revalidate = 3600

export async function generateStaticParams() { // Create request on reload
    const boards = await fetch(getAllBoards).then((res) => res.json())

    return boards.map((board: Board) => ({
        id: board.id,
    }))
}

export default function Board({params}: {
    params: {
        id: string
    }
}) {
    return (
        <main className={styles.main}>
            hi! {params.id}
        </main>
    )
}
