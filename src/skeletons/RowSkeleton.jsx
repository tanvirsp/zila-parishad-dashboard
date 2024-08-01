
import Skeleton from "react-loading-skeleton";

const RowSkeleton = () => {
    return (
        <tr>
            <td colSpan = "8" >  <Skeleton count={1} /></td>
        </tr>
    );
};

export default RowSkeleton;

