import { SearchComponent }  from "../src/components/SearchComponent/SearchComponent";
import { artists, songs } from "../src/data/data";

export function Search() {
    return (
        <>
        <SearchComponent 
            artists={artists}
            songs={songs}
        />
        </>
    );
}
