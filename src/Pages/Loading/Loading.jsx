import loadingImage from '../../Images/loading-svgrepo-com.svg';
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
                style={{ height: '20px', width: '50px' }}
                className='rotate'
            />
            <span style={{color:"#111620"}}>Loading</span>
        </div>
    );
};

export default Loading;
