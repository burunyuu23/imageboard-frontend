import styles from './page.module.css'
import ThemesTable from "@/widget/ThemesTable/ui/ThemesTable";
import RandomInterest from "@/widget/RandomInterest/ui/RandomInterest";
import {Theme} from "@/entity/Theme";
import {getAllThemesPath} from "@/entity/Theme/model/theme_paths";

export const revalidate = 3600 // Every hour
const getStaticProps = async (): Promise<Theme[]> => {
    const res = await fetch(getAllThemesPath);
    return await res.json()
}
export default async function Home() {
    const themes = await getStaticProps();
    return (
        <div className={styles.main}>
            <div className={styles.helloText}>
                <h1>
                    Добро пожаловать на dnl.hk!
                </h1>
                <text>
                    Революционный имиджборд, который
                    ничем не отличается от остальных,
                    а в некоторых аспектах даже хуже.
                </text>
            </div>
            <RandomInterest/>
            <ThemesTable themes={themes}/>
        </div>
    )
}
