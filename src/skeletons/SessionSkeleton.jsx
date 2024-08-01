import Skeleton from "react-loading-skeleton";

const SessionSkeleton = () => {
    return (

        <tr>
          <td colSpan = "6"><Skeleton count={2} /></td>
            
        </tr>
    );
};

export default SessionSkeleton;