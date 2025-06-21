import box from '../assets/images/box.png'
const Empty = ({title}) => {
    return (
        <div className='empty-box'>
            <img width="100px" src={box} alt="Empty Box" />
            <p>No {title} availabe</p>
        </div>
    );
};

export default Empty;