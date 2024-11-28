import { SearchComponent }  from "../src/components/SearchComponent/SearchComponent";
import { artists, songs } from "../src/data/data";

const Search = () => {
    return (
        <div>
            <SearchComponent 
                artists={artists}
                songs={songs}
            />
        </div>
    );
};

export default Search; 
