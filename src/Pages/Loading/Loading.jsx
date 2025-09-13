import loadingImage from '../../Images/load.png';
import '../Loading/Loading.css'
const Loading = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
            }}
        >
            <img
                src={loadingImage}
                alt="Loading..."
                style={{ height: '50px', width: '50px' }}
                className='rotate'
            />
            <span style={{color:"white"}}>Loading</span>
        </div>
    );
};

export default Loading;
